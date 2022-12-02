<template>
  <div class="document__block d-flex align-items-center">
    <div class="icon__block">
      <the-icon icon-name="document-icon"/>
    </div>
    <div class="document__title">
      {{ documentTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheDocument',
  props: {
    documentTitle: {type: String, default: null},
  },
  setup(){

  }
}
</script>

<style scoped>

</style>