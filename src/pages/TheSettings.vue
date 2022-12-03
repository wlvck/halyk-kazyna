<template>
  <div class="settings__page">
    <div @click.self="closeModal()" class="wrapper">

      <transition
          enter-active-class="animate__animated animate__slideInUp animate__faster"
          leave-active-class="animate__animated animate__slideOutDown animate__faster"
      >
        <div class="sheet">
          <div class="header-block">
            <div class="short-line"></div>
            <div @click.stop="closeModal()" :style="`background-image: url(${require('@/assets/close-round.svg')})`"
                 class="close-round"></div>
            <div class="header-title">Настройки</div>
          </div>


          <div class="toggle-block-wrapper">

            <div class="toggle-description">
              Выполнять расчет страховой суммы<br/> в долларах
            </div>

            <div class="toggle-wrapper">
              <toggle-button/>
            </div>

          </div>


          <div class="toggle-block-wrapper">

            <div class="toggle-description">
              Добавить email, как дополнительный <br/> канал уведомления
            </div>

            <div class="toggle-wrapper">
              <toggle-button/>
            </div>

          </div>

        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useStore} from "@/store";

export default {
  name: "TheSettings",
  setup() {
    const toggle = ref()
    const store = useStore()
    const router = useRouter()
    const closeModal = () => {
      toggle.value = true;
      setTimeout(() => {
        router.replace({name: 'Home'})
      }, 500);
    }

    const emailChangeHandler = () => {
      // this.$store.commit('SET_ADD_EMAIL', {value: event.value});

      setTimeout(() => {
        toggle.value = false;
        setTimeout(() => {
          router.replace({name: 'Home'})
        }, 500);
      }, 250);
    }
    return {
      toggle,
      store,
      closeModal,
      emailChangeHandler
    }
  }
}
</script>