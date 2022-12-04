<template>
  <div class="toggle__button">
    <label class="switch">
      <input type="checkbox" :checked="isChecked" @change.prevent="onToggle">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
import {useStore} from "@/store";

export default {
  name: "ToggleButton",
  props: {
    isChecked: {type: Boolean, default: false}
  },
  emit: "onToggle",
  setup(props, {emit}) {
    const store = useStore()
    const onToggle = () => {
      emit("onToggle", {email: !store.showEmailField, calc: !store.countInDollars});
    }
    return {onToggle}
  }
}
</script>