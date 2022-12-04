<template>
  <div
      @click.self="closeModal()"
      class="settings__page">
    <div class="sheet">
      <div class="header-block">
        <div class="short-line"></div>
        <div
            @click.stop="closeModal()"
            :style="`background-image: url(${require('@/assets/close-round.svg')})`"
            class="close-round"></div>
        <div class="header-title">Настройки</div>
      </div>
      <div class="toggle-block-wrapper">
        <div class="toggle-description">
          Выполнять расчет страховой суммы<br/> в долларах
        </div>
        <div class="toggle-wrapper">
          <toggle-button :isChecked="store.countInDollars" @onToggle="calcHandler"/>
        </div>
      </div>
      <div class="toggle-block-wrapper">
        <div class="toggle-description">
          Добавить email, как дополнительный <br/> канал уведомления
        </div>
        <div class="toggle-wrapper">
          <toggle-button :isChecked="store.showEmailField" @onToggle="emailChangeHandler"/>
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
    const calcHandler = (value) => {
      store.countInDollars = value.calc;
      setTimeout(() => {
        store.openSettings = false;
      }, 500);
    }
    const emailChangeHandler = (value) => {
      console.log(value)
      store.showEmailField = value.email;
      setTimeout(() => {
        store.openSettings = false;
      }, 500);
    }
    return {
      store,
      closeModal,
      emailChangeHandler,
      calcHandler
    }
  }
}
</script>