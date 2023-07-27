<script setup>
import { ref, computed, watch } from "vue";
import Table from "@/components/Table.vue";

// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// Table values
const documents = computed(()=>{
  return store.documents
})

let typeValueId = ref(3)

const pageObj = ref({})

let authorValueId = ref(0)

const changePage = (page) => {
  store.filterDocValue(typeValueId.value,authorValueId.value,page)
  
  pageObj.value = page
}

// type sort
watch(typeValueId, (newVal, oldVal)=>{
  let obj = {
    page: 1,
    perPage: pageObj.value.perPage || 5,
    search: pageObj.value.search
  }
  store.filterDocValue(typeValueId.value,authorValueId.value,obj)
})
// author sort
watch(authorValueId, (newVal, oldVal)=>{
  let obj = {
    page: 1,
    perPage: pageObj.value.perPage || 5,
    search: pageObj.value.search
  }
  store.filterDocValue(typeValueId.value,authorValueId.value,obj)
})

// Documents Bread CrumbItems
const BreadcrumbItems = ref([
  {
    title: 'Главное',
    disabled: false,
    to: '/',
  },
  {
    title: 'Документы',
    disabled: false,
    to: '/documents',
  },
  {
    title: 'Документ',
    disabled: true,
    to: '/',
  }
])

store.breadcrumbItems = BreadcrumbItems.value

</script>

<template>
    <div>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-select
            v-model="typeValueId"
            :items="store.docSorting.documentsType"
            item-text="title"
            item-value="id"
            label="Document type"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-select
            v-model="authorValueId"
            :items="store.docSorting.documentsAuthors"
            item-text="title"
            item-value="id"
            label="Author"
          ></v-select>
        </v-col>
      </v-row>
      <Table 
      :headers="documents?.headers"
      :body="documents?.body"
      :pageSize="store.documentsSize"
      @changePage="changePage"/>
    </div>
</template>