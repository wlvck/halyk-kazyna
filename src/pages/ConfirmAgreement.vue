<template>
  <div class="page__header">
    <the-header title="Подтвердите согласие"/>
  </div>
  <div class="page__content">
    <div class="requirement__list">
      <div class="requirement__item d-flex align-items-center justify-content-between">
        <div class="item__text">Подтверждаю, что отсутствуют
          <span>заболевания</span> и не являюсь инвалидом
        </div>
        <div class="item__rounded">
          <input id="requirement1" type="checkbox">
          <label for="requirement1"></label>
        </div>
      </div>
      <div class="requirement__item d-flex align-items-center justify-content-between">
        <div class="item__text">Подтверждаю, что заболевания
          из перечня отсутствуют и
          не являюсь инвалидом
        </div>
        <div class="item__rounded">
          <input id="requirement2" type="checkbox">
          <label for="requirement2"></label>
        </div>
      </div>
      <div class="requirement__item d-flex align-items-center justify-content-between">
        <div class="item__text">Не являюсь
          <span>публичным должностным лицом</span>
        </div>
        <div class="item__rounded">
          <input id="requirement3" type="checkbox">
          <label for="requirement3"></label>
        </div>
      </div>
    </div>
    <the-document v-for="document in documentList" :document-title="document.typeName" :key="document.type"
                  @click.prevent="$router.push({name: 'PdfDocument', params: {documentName: document.type}})"/>
  </div>
  <div class="page__footer">
    <the-button text="Подписать"/>
  </div>
</template>

<script>
import {useStore} from "@/store";
import {onMounted, computed} from "vue";

export default {
  name: 'ConfirmAgreement',
  setup() {
    const store = useStore()
    onMounted(async () => {
      if (store.documentsList.length) return store.documentsList
      else {
        await store.getDocuments(store.product_code)
      }
    })
    const documentList = computed(() => store.documentsList)
    return {
      documentList,
      store,
    }
  }
}
</script>