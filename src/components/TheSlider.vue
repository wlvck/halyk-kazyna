<template>
  <div>
    <VueSlider v-model="interval" @change="onSliderChange()" :disabled="disabled"
               :contained="true" tooltip="none" :dotSize="24" :min="1" :max="sliderMaxValue" :railStyle="railStyle"
               :processStyle="processStyle" :adsorb="true">
      <template v-slot:dot>
        <div class="dot">
          <icon icon-name="slider-arrow"/>
        </div>
      </template>
    </VueSlider>
  </div>

</template>

<script>
import {reactive, ref} from "vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  emits: ['interval'],
  name: 'TheSlider',
  components: {
    VueSlider
  },
  props: {
    clientAge: {type: Number, default: null},
    sliderMaxValue: {type: Number, default: null},
    disabled: {type: Boolean, default: null}
  },
  setup(props, {emit}) {
    const interval = ref(2)

    const railStyle = reactive({
          backgroundColor: '#E0E6EF'
        }
    )
    const processStyle = reactive({
          backgroundColor: '#2AA65C',
        }
    )
    const onSliderChange = () => {
      emit('interval', interval.value)
    }
    return {
      railStyle,
      processStyle,
      onSliderChange
    }
  },
  data() {
    return {
      interval: '',
    }
  },
}
</script>