<template>
  <component :is="iconName"/>
</template>

<script>
import ArrowLeft from "./base/ArrowLeft.vue";
import DocumentIcon from "./base/DocumentIcon.vue";
import SliderArrow from "./base/SliderArrow.vue";

export default {
  name: "TheIcon",
  components: {
    DocumentIcon,
    ArrowLeft,
    SliderArrow
  },
  props: {
    iconName: String
  },
  setup(){

  }
}
</script>

<style scoped>

</style>