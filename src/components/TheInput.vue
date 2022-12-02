<template>
  <div class="input">
    <div class="d-flex align-items-center justify-content-between">
      <div class=" align-items-center justify-content-between flex-column">
        <div class="input__title">
          {{ inputTitle }}
        </div>
        <div class="input__value">
          <input type="tel" :value="inputValue" :disabled="disabled"
                 @input.prevent="$emit('inputHandler', $event.target.value)">
        </div>
      </div>
      <slot name="onTheRight"></slot>
    </div>
    <slot name="onTheBottom"></slot>
  </div>
</template>

<script>
export default {
  props: {
    inputTitle: {type: String, default: null},
    inputValue: {type: String, default: null},
    disabled: {type: Boolean, default: true},
  },
  name: 'TheInput',
  setup(){

  }
}
</script>