<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
// directives
import { findAvatar } from '@/directives/directive'
// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// using $route
const router = useRoute();

onMounted(() => {
  store.documentFind(+router.params.id)
})

const formattedDate = (date)=>{
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// find Author
const isAuthor = computed(()=>{
  return store.docSorting.documentsAuthors?.find(user => user.id === store.document.authorId)
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
    disabled: false,
    to: router.path,
  }
])

store.breadcrumbItems = BreadcrumbItems.value

</script>

<template>
    <v-container v-if="store.document" class="pa-0">
      <v-card class="elevation-3">
        <v-card-title class="headline text-capitalize">{{ store.document?.type === 1 ? 'счет-фактура' : 'доверенность' }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <strong>Номер документа:</strong> {{ store.document.nomer }}
            </v-col>
            <v-col cols="12" md="6" class="text-md-right">
              <strong>Дата документа:</strong> {{ formattedDate(store.document.date) }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="pb-2">
                {{ store.document.type === 1 ? "Информация для клиентов" : "Информация агента" }}
              </span>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <strong>
                {{ store.document.type === 1 ? "Имя Клиента" : "Имя агента" }}:
              </strong>
              {{ store.document.type === 1 ? store.document.client.name : store.document.agent.name }}
            </v-col>
            <v-col cols="12" md="6" class="text-md-right">
              <strong>Электронная почта:</strong> 
              {{ store.document.type === 1 ? store.document.client.email : store.document.agent.email }}
            </v-col>
            <v-col cols="12">
              <span class="pt-4 pb-2">Описание</span>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p>
                {{ store.document.text }}
              </p>
            </v-col>
            <v-col v-if="store.document.type === 1" cols="12">
              <strong class="pt-4 pb-2">
                {{ store.document.serviceType.type === 1 ? "Продукты" : "Услуги" }}
              </strong>
              <v-divider></v-divider>
            </v-col>
            <v-col v-if="store.document.type === 1" cols="12">
              <p>
                Количество: {{ store.document.serviceType.amount }}
              </p>
              <p>
                Цена за единицу товара: {{ store.document.serviceType.unitPrice }}
              </p>
              <v-divider class="my-2"></v-divider>
              <p>
                Общая сумма: {{ +store.document.serviceType.amount * +store.document.serviceType.unitPrice }}
              </p>
            </v-col>
            <v-col cols="12">
                <strong>Если у вас есть какие-либо вопросы или предложения по этому документу</strong>
                <v-divider></v-divider>
            </v-col>
            <v-col v-if="isAuthor" cols="12">
                <RouterLink 
                :style="`border-color: ${store.randomColor};`"
                class="tableName docAuthorCard
                px-3 py-2" 
                :to="`/employees/${isAuthor.id}`">
                    <v-avatar
                    :color="store.randomColor"
                    class="mr-1"
                    size="34"
                    >
                      <span class="text-subtitle-2 text-uppercase">
                        {{ findAvatar(isAuthor.title) }}
                      </span>
                    </v-avatar>
                    <span
                    :style="`color: ${store.randomColor};`">
                      {{ isAuthor.title }}
                    </span>
                    <v-icon
                    :style="`color: ${store.randomColor};`"
                    size="20"
                    icon="mdi-arrow-right"
                    ></v-icon>
                </RouterLink>

                <p class="mt-2">Автор: {{ isAuthor.title }}</p>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
</template>
  
<style>
.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.subheader {
  font-size: 18px;
  font-weight: bold;
}
v-divider {
  margin-top: 12px;
  margin-bottom: 12px;
}
v-data-table {
  font-size: 14px;
}
</style>