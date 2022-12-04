<template>
  <div class="page__header">
    <the-header title="Халык Казына"/>
  </div>
  <div class="page__content">
    <the-input
        input-title="Владелец"
        :input-value="store.userData.firstName"
        :isLoading="store.loading.userName"
    >
      <template #onLoading>
        <div class="userName-skeleton"></div>
      </template>
    </the-input>
    <the-input
        input-title="Срок действия, лет"
        :input-value="intervalValue">
      <template #onTheBottom>
        <the-slider
            :clientAge="clientAge"
            :sliderMaxValue="sliderMaxValue"
            :disabled="disableSlider"
            class="pt-4"
            @sliderUsed="sliderValueChanged"
        />
      </template>
    </the-input>
    <the-input
        input-title="Страховая премия для оплаты"
        :input-value="store.prize"
        :disabled="disableInput || disableSlider"
        @inputHandler="prizeFormatter($event); prizeHandler($event); calcSum()">
      <template #currencySign>
        <div v-if="store.prize" class="input-dollar-sign">{{ store.prize }}
          {{ store.countInDollars ? '$' : '₸' }}
        </div>
      </template>
    </the-input>
    <the-input
        v-show="store.prize && store.period"
        input-title="Страховая сумма к выплате"
        :input-value="`${store.calcSum}`"
        :isLoading="store.loading.insuredSum"
    >
      <template #onLoading>
        <div class="calc-sum-skeleton"></div>
      </template>
    </the-input>
    <the-input
        v-show="store.annualRate"
        input-title="Ставка вознаграждения"
        :input-value="`${store.annualRate} %`"
        :isLoading="store.loading.annualRate"
        class="input_">
      <template #onLoading>
        <div class="annual-rate-skeleton"></div>
      </template>
    </the-input>
    <the-input
        v-show="store.usd_exchange_rate"
        input-title="Курс доллара НБ РК"
        :input-value="`${store.usd_exchange_rate}`"
        :isLoading="store.loading.usdExchangeRate"
        class="input_">
      <template #onLoading>
        <div class="dollar-rate-skeleton"></div>
      </template>
    </the-input>
    <the-input
        input-title="ФИО менеджера"
        :disabled="false"
        @inputHandler="getManagerName">
      <template #onTheRight>
        <div
            class="px-3 py-2"
            @click.prevent="searchManager">
          <img src="../assets/search.svg" alt="">
        </div>
      </template>
    </the-input>
    <the-input
        v-if="store.showEmailField"
        input-title="Ваш email"
        :disabled="false"
        @inputHandler="getUserEmail"/>
    <div
        v-if="store.showEmailField"
        class="base-description">
      {{ emailMessage }}
    </div>

  </div>
  <div class="page__footer">
    <the-button
        :disabled="!store.formatCalcSum"
        text="Продолжить оформление"
        @click="$router.push({name: 'ConfirmAgreement'})"/>
  </div>
  <div v-if="store.openSettings" class="settings__overlay"></div>
  <transition
      enter-active-class="animate__animated animate__slideInUp animate__faster"
      leave-active-class="animate__animated animate__slideOutDown animate__faster"
  >
    <TheSettings v-if="store.openSettings"/>
  </transition>
</template>
<script>
import {computed, reactive, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from "@/store/index.js";
import {debounce} from "@/utils/handlers.js";
import TheHeader from "@/components/TheHeader";
import TheSettings from "@/pages/TheSettings";

export default {
  components: {TheHeader, TheSettings},
  setup() {
    const intervalValue = ref()
    const route = useRoute()
    const managerValue = ref('')
    const userEmail = ref()
    const emailMessage = reactive({
      invalid: 'Email должен быть валидным',
      empty: 'Поле email не должно быть пустым'
    })
    const clientAge = ref(19)
    const disableSlider = ref(true)
    const disableInput = ref(false)
    const sliderMaxValue = computed(() => {
      if (clientAge.value > 65) {
        return 5;
      }

      return Math.min(15, 70 - clientAge.value);
    })
    const store = useStore()

    watch(() => store.intervalValue,
        () => {
          if (store.intervalValue === 1) {
            intervalValue.value = store.intervalValue + ' год';
          } else if (store.intervalValue === 2 || store.intervalValue === 3 || store.intervalValue === 4) {
            intervalValue.value = store.intervalValue + ' года';
          } else {
            intervalValue.value = store.intervalValue + ' лет';
          }
        }, {immediate: true})

    const auth = async () => {
      if (route.query && route.query.Hb_token) {
        disableSlider.value = false
        await store.getCasKey(route.query.Hb_token)
        await store.getUserData()
      }
    }
    auth()

    const prizeFormatter = debounce(async function (value) {
      let clearPrevFormatting = value.replace(/\s/g, '');
      if (store.countInDollars && clearPrevFormatting < 1000 && store.userData.phone !== '77052580825' && store.userData.phone !== '77077591010' && store.userData.phone !== '77073231203') {
        clearPrevFormatting = "1000";
      } else if (!store.countInDollars && clearPrevFormatting < (store.dollarRate * 1000) && store.userData.phone !== '77052580825' && store.userData.phone !== '77077591010' && store.userData.phone !== '77073231203') {
        // если вносят в тенге
        clearPrevFormatting = store.dollarRate * 1000;
      }
      store.prize = clearPrevFormatting.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }, 900)
    const prizeHandler = (value) => {
      let clearPrevFormatting = value.replace(/\s/g, '');
      store.prize = clearPrevFormatting.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    const calcSum = debounce(async function () {
      if (store.intervalValue && store.prize) {
        store.period = String(store.intervalValue)
        let data;
        if (store.countInDollars) {
          data = {
            product_code: 1104,
            validity: store.intervalValue,
            premium_sum_usd: String(store.prize.replace(/\s/g, ''))
          };
        } else {
          data = {
            product_code: 1104,
            validity: store.intervalValue,
            premium_sum_kzt: String(store.prize.replace(/\s/g, ''))
          };
        }
        disableInput.value = true;
        await store.calculateSum(data)
        disableInput.value = false;
      }

    }, 1800)

    const searchManager = async () => {
      await store.searchManager(managerValue.value)
    }
    const getManagerName = (value) => {
      managerValue.value = value
    }
    const sliderValueChanged = () => {
      calcSum()
    }
    const getUserEmail = (value) => {
      userEmail.value = value
    }
    return {
      sliderMaxValue,
      clientAge,
      intervalValue,
      disableSlider,
      calcSum,
      getUserEmail,
      prizeFormatter,
      store,
      disableInput,
      emailMessage,
      prizeHandler,
      getManagerName,
      searchManager,
      sliderValueChanged,
    }
  }
}
</script>