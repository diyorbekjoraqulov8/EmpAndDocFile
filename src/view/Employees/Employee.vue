<script setup>
import { computed } from 'vue'
import Table from '@/components/Table.vue';
import { useRoute } from 'vue-router'
// directives
import { findAvatar,avatarBgColor } from '@/directives/directive'
// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// using $route
const routeId = +useRoute().params.id;

// Current employee
const employee = computed(()=>{
  return store.employees?.body.find(employee => employee.id === routeId)
})

// Birth date Format
const formatDate = (date) =>{
  return new Date(date).toLocaleDateString();
}

// Document table for the current employee
const employeeDoc = (id) => {
    let value = []
    store.documents?.body.forEach(item => {
        if (item.authorId === id) {
            value.push(item)
        }
    });
    return value
}

</script>

<template>
    <v-container class="pa-0">
      <v-card>
        <v-card-title class="text-h6 text-sm-h5 headline">Профиль сотрудника</v-card-title>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" class="text-center">
                <v-avatar
                  :color="store.randomColor"
                  size="120"
                >
                    <span class="text-h3 text-uppercase">{{ findAvatar(employee.name) }}</span>
                </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                    <p class="text-subtitle-1">Имя Фамилия:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ employee.name }} </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Дата рождения:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ formatDate(employee.date) }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Серия и номер паспорта:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ employee.passport }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Пол:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ employee.gender === 1 ? "	Мужской" : "Женский" }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Активность:</p>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="text-subtitle-1">{{ employee.active === 0 ? "		Не активен" : "Активный" }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
            <v-card-title class="text-h6 text-sm-h5 headline">Документы сотрудника</v-card-title>
            <Table 
            :headers="store.documents?.headers"
            :body="employeeDoc(+$route.params.id)"/>
        </v-card-text>
      </v-card>
    </v-container>
</template>