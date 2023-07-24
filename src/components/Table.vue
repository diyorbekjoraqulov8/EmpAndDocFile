<script setup>
import { ref, computed } from "vue";
import { useTheme } from 'vuetify'
// directives
import { avatarBgColor } from '@/directives/directive'
import { useRoute } from "vue-router";
// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

const search = ref('')

const currentRoute = useRoute()

const props = defineProps({
  headers:Array,
  body:Array
})
const theme = useTheme()

// Current topic of the page
const currentTheme = computed(()=>{
  return theme.global.name.value
})

// Theme colors
const themeColor = computed(()=>{
  if (currentTheme.value === 'light') {
    return theme.themes.value.light.colors
  }else {
    return theme.themes.value.dark.colors
  }
})

// functions

  // Date Format
  const formatDate = (date) =>{
    return new Date(date).toLocaleDateString();
  }

  // Finds the author of the document
  const findAuthor = (id) =>{
    return store.employees?.body.find(user => user.id == id).name
  }

  // Random color saves to sessionStorage
  const tableNameClick = () => {
    if (currentRoute.fullPath === '/employees' || currentRoute.fullPath === '/documents') {
      let color = avatarBgColor()

      store.randomColor = color 
      sessionStorage.setItem('randomColor', color)
    }
  }

</script>

<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="body"
      :search="search"
      class="text-caption text-sm-body-2 text-lg-body-1"
    >
    <!-- Employee template -->
      <template v-slot:item.name="{ item }">
        <RouterLink 
        @click="tableNameClick()"
        class="tableName
        d-flex align-center
        h-100"
        :to="`/employees/${item.selectable.id}`"
        :style="`color: ${themeColor.tableName};`">
          {{ item.selectable.name }}
        </RouterLink>
      </template>
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.selectable.date) }}
      </template>
      <template v-slot:item.gender="{ item }">
        {{ item.selectable.gender === 1 ? "Мужской" : "Женский" }}
      </template>
      <template v-slot:item.active="{ item }">
        {{  item.selectable.active === 0 ? "Не активен" : "Активный" }}
      </template>
    <!-- Documents template -->

      <!-- Type document -->
      <template v-slot:item.type="{ item }">
        <RouterLink 
        @click="tableNameClick()"
        class="tableName
        d-flex align-center
        h-100"
        :to="`/documents/${item.selectable.id}`"
        :style="`color: ${themeColor.tableName};`">
          {{ item.selectable.type === 1 ? "счет-фактура" : "доверенность" }}
        </RouterLink>
      </template>

      <!-- Text opisaniya -->
      <template 
      v-slot:item.text="{ item }">
        <p class="documentsText">
          {{ item.selectable.text }}
        </p>
      </template>

      <!-- The author of the document -->
      <template 
      v-slot:item.authorId="{ item }"
      style="border: 1px solid red;">
        {{ findAuthor(item.selectable.authorId) }}
      </template>
    </v-data-table>
  </v-card>
</template>