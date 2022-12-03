<template>
  <div @click.self="closeModal()" class="settings__page">
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
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "@/store";

export default {
  name: "TheSettings",
  setup() {
    const store = useStore()
    const router = useRouter()
    const closeModal = () => {
      store.openSettings = false;
      setTimeout(() => {
        router.replace({name: 'Home'})
      }, 500);
    }

    const emailChangeHandler = () => {
      // this.$store.commit('SET_ADD_EMAIL', {value: event.value});

      setTimeout(() => {
        store.openSettings = false;
        setTimeout(() => {
          router.replace({name: 'Home'})
        }, 500);
      }, 250);
    }
    return {
      store,
      closeModal,
      emailChangeHandler
    }
  }
}
</script>