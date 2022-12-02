<template>
  <button :disabled="disabled" class="app__button">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {type: String, default: null},
    disabled: {type: Boolean, default: null},
  },
  name: 'TheButton'
}
</script>