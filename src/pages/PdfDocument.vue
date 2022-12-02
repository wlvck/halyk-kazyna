<template>
  <div>
    <pdf src="https://www.yenglishtube.com/wp-content/uploads/2017/03/Present-Simple-YEnglishtube.pdf" v-for="i in 5" :key="i" :id="i" :page="i"
         :resize="true">
    </pdf>
  </div>
</template>


<script>
import pdf from 'pdfvuer'
import {onMounted} from "vue";
import {ref} from "vue";
import {useStore} from "@/store";
import {useRoute} from "vue-router";

export default {
  name: "PdfDocument",
  components: {
    pdf
  },
  setup() {
    const sourceUrl = ref()
    const store = useStore()
    const route = useRoute()
    onMounted(async () => {
      const response = await store.generateDocument(route.params.documentName)
      sourceUrl.value = window.URL.createObjectURL(new Blob([response]));
      console.log(sourceUrl.value)
    })
    return {
      sourceUrl
    }
  }
}
</script>