<template>
  <div class="d-flex align-items-center justify-content-start">
    <the-icon icon-name="arrow-left" @click.prevent="redirect"/>
    <div class="w-100 d-flex justify-content-center header py-3">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default {
  props: {
    title: {type: String, default: null},
    routeName: {type: String, default: 'Home'},
  },
  name: 'TheHeader',
  setup(props){
    const router = useRouter()
    const redirect = () => {
      router.push({name: props.routeName})
    }
    return {
      redirect
    }
  }
}
</script>