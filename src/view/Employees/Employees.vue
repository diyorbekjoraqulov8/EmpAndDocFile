<script setup>
import { ref, computed, watch } from "vue";
import Table from "@/components/Table.vue";
// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// Table values
const employees = computed(()=>{
  return store.employees
})

let genderValueId = ref(3)

const pageObj = ref(null)

let activeValueId = ref(2)

const changePage = (page) => {
  store.filterEmpValue(genderValueId.value,activeValueId.value,page)
  
  pageObj.value = page
}

// gender sort

watch(genderValueId, (newVal, oldVal)=>{
  let obj = {
    page: 1,
    perPage: pageObj.value.perPage || 5,
    search: pageObj.value.search
  }
  store.filterEmpValue(newVal, activeValueId.value, obj)
})
// active sort
watch(activeValueId, (newVal, oldVal)=>{
  let obj = {
    page: 1,
    perPage: pageObj.value.perPage || 5,
    search: pageObj.value.search
  }
  store.filterEmpValue(genderValueId.value, newVal, obj)
})

// Employees Bread CrumbItems
const BreadcrumbItems = ref([
  {
    title: 'Главное',
    disabled: false,
    to: '/',
  },
  {
    title: 'Сотрудники',
    disabled: false,
    to: '/employees',
    color: '#fff'
  },
  {
    title: 'Сотрудник',
    disabled: true,
    to: '/',
  },
])

store.breadcrumbItems = BreadcrumbItems.value

</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-select
          v-model="genderValueId"
          :items="store.empSorting?.genders"
          item-text="title"
          item-value="id"
          label="Пол"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-select
          v-model="activeValueId"
          :items="store.empSorting?.empActive"
          item-text="title"
          item-value="id"
          label="Активность"
        ></v-select>
      </v-col>
    </v-row>
    <Table 
    :headers="employees?.headers"
    :body="employees?.body"
    :pageSize="store.emoloyeesSize"
    @changePage="changePage"/>
  </div>
</template>