<script setup>
import { ref, computed } from "vue";
import Table from "@/components/Table.vue";

// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// Table values
const employees = computed(()=>{
  return store.employees
})

// Is Gender sort

const isGender = computed(()=>{
  const gender = [3]
  employees.value?.body.forEach(item => {
    if (!gender.includes(item.gender)) {
      gender.push(item.gender)
    }
  })
  gender.sort()

  const titleMap = {
    1: "Мужской",
    2: "Женский",
    3: "Все",
  };

  let result = gender.map(num => ({
    id: num,
    title: titleMap[num]
  }));

  return result
})

let genderValueId = ref(3)

// Is Active sort
const isActive = computed(()=>{
  const active = [2]
  employees.value?.body.forEach(item => {
    if (!active.includes(item.active)) {
      active.push(item.active)
    }
  })
  active.sort()

  const titleMap = {
    0: "Не активен",
    1: "Активный",
    2: "Все",
  };

  let result = active.map(num => ({
    id: num,
    title: titleMap[num]
  }));

  return result
})

let activeValueId = ref(2)

// Sorting dates

const filterValue = computed(()=>{
  let value;
  if (genderValueId.value !== 3) {
    if (activeValueId.value === 2) {
      value = employees.value?.body.filter(item => item.gender === genderValueId.value);
    }else {
      const activeSort = computed(()=>{
        return employees.value?.body.filter(item => item.active === activeValueId.value);
      })
      value = activeSort.value.filter(item => item.gender === genderValueId.value);
    }
  }else {
    if (activeValueId.value !== 2) {
      value = employees.value?.body.filter(item => item.active === activeValueId.value);
    }else{
      value = employees.value?.body
    }
  }
  return value
})

</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-select
          v-model="genderValueId"
          :items="isGender"
          item-text="title"
          item-value="id"
          label="Пол"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-select
          v-model="activeValueId"
          :items="isActive"
          item-text="title"
          item-value="id"
          label="Активность"
        ></v-select>
      </v-col>
    </v-row>
    <Table 
    :headers="employees?.headers"
    :body="filterValue"/>
  </div>
</template>