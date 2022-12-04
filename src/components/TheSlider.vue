<template>
  <div>
    <VueSlider
        v-model="store.intervalValue"
        :disabled="disabled"
        tooltip="none"
        :dotSize="24"
        :min="2" :max="sliderMaxValue"
        :railStyle="railStyle"
        :processStyle="processStyle"
        @change="sliderValueChanged"
    >
      <template v-slot:dot>
        <div class="dot">
          <the-icon icon-name="slider-arrow"/>
        </div>
      </template>
    </VueSlider>
  </div>

</template>

<script>
import {reactive} from "vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import {useStore} from "@/store";

export default {
  name: 'TheSlider',
  components: {
    VueSlider
  },
  props: {
    clientAge: {type: Number, default: null},
    sliderMaxValue: {type: Number, default: null},
    disabled: {type: Boolean, default: null}
  },
  emits: [
      'sliderUsed'
  ],
  setup(props, {emit}) {
    const store = useStore()
    const railStyle = reactive({
          backgroundColor: '#E0E6EF'
        }
    )
    const processStyle = reactive({
          backgroundColor: '#2AA65C',
        }
    )
    const sliderValueChanged = () => {
      emit('sliderUsed')
    }
    return {
      railStyle,
      store,
      processStyle,
      sliderValueChanged,
    }
  },
}
</script>