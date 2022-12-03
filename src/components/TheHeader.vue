<template>
  <div class="d-flex align-items-center justify-content-between position-relative">
    <the-icon icon-name="arrow-left" class="arrow-left" @click.prevent="redirect"/>
    <div class="w-100 d-flex justify-content-center header py-3">
      <h3>{{ title }}</h3>
    </div>
    <div class="settings" @click.prevent="store.openSettings=true">
      Настройки
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "@/store";

export default {
  props: {
    title: {type: String, default: null},
    routeName: {type: String, default: 'Home'},
  },
  name: 'TheHeader',
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const redirect = () => {
      router.push({name: props.routeName})
    }
    return {
      redirect,
      store
    }
  }
}
</script>