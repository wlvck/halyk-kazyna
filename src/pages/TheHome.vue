<template>
  <div class="page__header">
    <the-header title="Оформление продукта"/>
  </div>
  <div class="page__content">
    <the-input input-title="Владелец" input-value="Арынгазы Д. Ш."/>
    <the-input input-title="Срок действия, лет" :input-value="interval">
      <template #onTheBottom>
        <the-slider :clientAge="clientAge" :sliderMaxValue="sliderMaxValue" :disabled="disableSlider" class="pt-4"
                @interval="getIntervalValue($event)"/>
      </template>
    </the-input>
    <the-input input-title="Страховая премия для оплаты" :input-value="store.prize"
           :disabled="disableInput || disableSlider"
           @inputHandler="prizeFormatter($event); prizeHandler($event); calcSum()"/>
    <the-input input-title="Страховая сумма к выплате" :input-value="`${store.calcSum}`"/>
    <the-input input-title="Ставка вознаграждения" :input-value="`${store.annualRate} %`" class="input_"/>
    <the-input input-title="Курс доллара НБ РК" :input-value="`${store.usd_exchange_rate}`" class="input_"/>
    <the-input input-title="ФИО менеджера" :input-value="`${store.usd_exchange_rate}`" :disabled="false"
           @inputHandler="getManagerName">
      <template #onTheRight>
        <div class="px-3 py-2" @click.prevent="searchManager">
          <img src="../assets/search.svg" alt="">
        </div>
      </template>
    </the-input>
  </div>
  <div class="page__footer">
    <the-button :disabled="!store.formatCalcSum" text="Продолжить оформление" @click="$router.push({name: 'ConfirmAgreement'})"/>
  </div>
</template>
<script>
import {computed, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from "@/store/index.js";
import {debounce} from "@/utils/handlers.js";
import TheHeader from "@/components/TheHeader";
export default {
  components: {TheHeader},
  setup(){
    const result = ref('2')
    const interval = ref('2')
    const route = useRoute()
    const managerValue = ref('')
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

    const getIntervalValue = (intervalValue) => {
      result.value = String(intervalValue)
    }

    watch(() => result.value,
        () => {
          if (result.value === '1') {
            interval.value = result.value + ' год';
          } else if (result.value === '2' || result.value === '3' || result.value === '4') {
            interval.value = result.value + ' года';
          } else {
            interval.value = result.value + ' лет';
          }
        }, {immediate: true})

    const auth = async () => {
      if (route.query && route.query.Hb_token) {
        disableSlider.value = false
        await store.getCasKey(route.query.Hb_token)
      }
    }
    auth()

    const prizeFormatter = debounce(async function (value) {
      let clearPrevFormatting = value.replace(/\s/g, '');
      if (store.countInDollars && clearPrevFormatting < 1000 && store.phone !== '77052580825' && store.phone !== '77077591010' && store.phone !== '77073231203') {
        clearPrevFormatting = "1000";
      } else if (!store.countInDollars && clearPrevFormatting < (store.dollarRate * 1000) && store.phone !== '77052580825' && store.phone !== '77077591010' && store.phone !== '77073231203') {
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
      if (interval.value && store.prize) {

        // эта проверка должна быть здесь перед отправкой на сервер вместо restrictPeriod, потому что
        // иначе нельзя ввести '10'
        if (interval.value === '1' || interval.value === '0' || interval.value < 0) {
          interval.value = '2'
        }
        store.period = interval.value

        let data;

        if (store.countInDollars) {
          data = {
            product_code: 1104,
            validity: Number(result.value),
            premium_sum_usd: String(store.prize.replace(/\s/g, ''))
          };
        } else {
          data = {
            product_code: 1104,
            validity: Number(result.value),
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
    return{
      sliderMaxValue,
      clientAge,
      interval,
      disableSlider,
      calcSum,
      prizeFormatter,
      store,
      disableInput,
      getIntervalValue,
      prizeHandler,
      getManagerName,
      searchManager,
    }
  }
}
</script>