<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/Table.vue';
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue";
import { useRoute } from 'vue-router'
// directives
import { findAvatar } from '@/directives/directive'

// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

const pageObj = ref(null)

// Current Route
const router = useRoute()

// using $route
const routeId = +useRoute().params.id;

onMounted(() => {
  store.employeeFind(routeId)
})

// Birth date Format
const formatDate = (date) =>{
  return new Date(date).toLocaleDateString();
}

// Employee docs change page
const changePage = (page) =>{
  pageObj.value = page

  let obj = {
    page: page.page,
    perPage: page.perPage || 5,
    search: page.search
  }
  store.employeeDocsFind(routeId,obj)
}

// Employee Bread CrumbItems
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
  },
  {
    title: 'Сотрудник',
    disabled: false,
    to: router.path,
  },
])

store.breadcrumbItems = BreadcrumbItems.value
</script>

<template>
  <div>
    <v-container v-if="store.employee && store.employeeDocs" class="pa-0">
      <v-card>
        <v-card-title class="text-h6 text-sm-h5 headline">Профиль сотрудника</v-card-title>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" class="text-center">
                <v-avatar
                  :color="store.randomColor"
                  size="120"
                >
                    <span class="text-h3 text-uppercase">{{ findAvatar(store.employee.name) }}</span>
                </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                    <p class="text-subtitle-1">Имя Фамилия:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ store.employee?.name }} </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Дата рождения:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ formatDate(store.employee?.date) }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Серия и номер паспорта:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ store.employee?.passport }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Пол:</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="text-subtitle-1">{{ store.employee?.gender === 1 ? "	Мужской" : "Женский" }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"
                class="pb-0 pb-sm-2">
                  <p class="text-subtitle-1">Активность:</p>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="text-subtitle-1">{{ store.employee?.active === 0 ? "		Не активен" : "Активный" }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
            <v-card-title class="text-h6 text-sm-h5 headline">Документы сотрудника</v-card-title>
            <Table 
            :headers="store.documents?.headers"
            :body="store.employeeDocs?.docs"
            :pageSize="store.employeeDocs.docsSize"
            @changePage="changePage"/>
        </v-card-text>
      </v-card>
    </v-container>
  </div>

</template>