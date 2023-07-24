<script setup>
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
// directives
import { findAvatar } from '@/directives/directive'
// store
import { useProductStore } from "@/stores/index";
const store = useProductStore()

// using $route
const routeId = +useRoute().params.id;

// cerrent document
const document = computed(()=>{
  return store.documents?.body.find(doc => doc.id === routeId)
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
  return store.employees?.body.find(user => user.id === document.value.authorId)
})

</script>

<template>
    <v-container class="pa-0">
      <v-card class="elevation-3">
        <v-card-title class="headline text-capitalize">{{ document.type === 1 ? 'счет-фактура' : 'доверенность' }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <strong>Номер документа:</strong> {{ document.nomer }}
            </v-col>
            <v-col cols="12" md="6" class="text-md-right">
              <strong>Дата документа:</strong> {{ formattedDate(document.date) }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="pb-2">
                {{ document.type === 1 ? "Информация для клиентов" : "Информация агента" }}
              </span>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <strong>
                {{ document.type === 1 ? "Имя Клиента" : "Имя агента" }}:
              </strong>
              {{ document.type === 1 ? document.client.name : document.agent.name }}
            </v-col>
            <v-col cols="12" md="6" class="text-md-right">
              <strong>Электронная почта:</strong> 
              {{ document.type === 1 ? document.client.email : document.agent.email }}
            </v-col>
            <v-col cols="12">
              <span class="pt-4 pb-2">Описание</span>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p>
                {{ document.text }}
              </p>
            </v-col>
            <v-col v-if="document.type === 1" cols="12">
              <strong class="pt-4 pb-2">
                {{ document.serviceType.type === 1 ? "Продукты" : "Услуги" }}
              </strong>
              <v-divider></v-divider>
            </v-col>
            <v-col v-if="document.type === 1" cols="12">
              <p>
                Количество: {{ document.serviceType.amount }}
              </p>
              <p>
                Цена за единицу товара: {{ document.serviceType.unitPrice }}
              </p>
              <v-divider class="my-2"></v-divider>
              <p>
                Общая сумма: {{ +document.serviceType.amount * +document.serviceType.unitPrice }}
              </p>
            </v-col>
            <v-col cols="12">
                <strong>Если у вас есть какие-либо вопросы или предложения по этому документу</strong>
                <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
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
                        {{ findAvatar(isAuthor.name) }}
                      </span>
                    </v-avatar>
                    <span
                    :style="`color: ${store.randomColor};`">
                      {{ isAuthor.name }}
                    </span>
                    <v-icon
                    :style="`color: ${store.randomColor};`"
                    size="20"
                    icon="mdi-arrow-right"
                    ></v-icon>
                </RouterLink>

                <p class="mt-2">Автор: {{ isAuthor.name }}</p>

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