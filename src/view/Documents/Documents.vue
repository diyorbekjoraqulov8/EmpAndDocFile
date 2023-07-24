<template>
    <div>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-select
            v-model="typeValueId"
            :items="isType"
            item-text="title"
            item-value="id"
            label="Document type"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-select
            v-model="authorValueId"
            :items="isAuthor"
            item-text="title"
            item-value="id"
            label="Author"
          ></v-select>
        </v-col>
      </v-row>
      <Table 
      :headers="documents?.headers"
      :body="filterValue"/>
    </div>
</template>
  
<script setup>
import { ref, computed } from "vue";
import Table from "@/components/Table.vue";

// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// Table values

const documents = computed(()=>{
  return store.documents
})
// documents body

// Type sorting
const isType = computed(()=>{
  const type = [3]
  documents.value?.body.forEach(item => {
    if (!type.includes(item.type)) {
      type.push(item.type)
    }
  })
  type.sort()

  const titleMap = {
    1: "Счет-фактура",
    2: "Доверенность",
    3: "Все",
  };

  let result = type.map(num => ({
    id: num,
    title: titleMap[num]
  }));

  return result
})
let typeValueId = ref(3)
// <M>/<M>
const isAuthor = computed(()=>{
  const authorId = []
  const author = [
    {
      id:0,
      title:"Все"
    }
  ]
  documents.value?.body.forEach(item => {
    if (!authorId.includes(item.authorId)) {
      authorId.push(item.authorId)
    }
  })
  authorId.forEach(item => {
    const findAuthor = (id) =>{
      return store.employees?.body.find(user => user.id == id).name
    }
    let obj = {
      id: item,
      title: findAuthor(item)
    }
    author.push(obj)
  });
  author.sort()

  return author
})
let authorValueId = ref(0)

// filter Value body

const filterValue = computed(()=>{
  let value;
  if (typeValueId.value !== 3) {
    if (authorValueId.value === 0) {
      value = documents.value?.body.filter(item => item.type === typeValueId.value);
    }else {
      const authorValue = computed(()=>{
        return documents.value?.body.filter(item => item.authorId === authorValueId.value);
      })
      value = authorValue.value.filter(item => item.type === typeValueId.value);
    }
  }else {
    if (authorValueId.value !== 0) {
      value = documents.value?.body.filter(item => item.authorId === authorValueId.value);
    }else{
      value = documents.value?.body
    }
  }
  return value
})

</script>