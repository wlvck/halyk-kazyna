<template>
  <div class="input">
    <div class="d-flex align-items-center justify-content-between">
      <div class=" align-items-center justify-content-between flex-column">
        <div class="input__title">
          {{ inputTitle }}
        </div>
        <div class="input__value">
          <div  v-if="!isLoading" class="position-relative">
            <input type="tel" :value="inputValue" :disabled="disabled"
                   @input.prevent="$emit('inputHandler', $event.target.value)">
            <slot name="currencySign"></slot>
          </div>
          <slot v-else name="onLoading"></slot>
        </div>
      </div>
      <slot name="onTheRight"></slot>
    </div>
    <slot name="onTheBottom"></slot>
  </div>
</template>

<script>
import {useStore} from  "@/store"
export default {
  props: {
    inputTitle: {type: String, default: null},
    inputValue: {type: String, default: null},
    disabled: {type: Boolean, default: true},
    isLoading: {type: Boolean, default: false},
  },
  name: 'TheInput',
  setup(){
    const store = useStore()
    return {
      store
    }
  }
}
</script>