<template>
    <v-card class="main">
        <v-layout class="main__layout">
            <!-- Left menu -->
            <v-navigation-drawer
            v-model="drawer"
            :rail="Number(windowSize.width.value) > 1000 ? false : true"
            permanent
            >
                <v-list-item
                prepend-icon="mdi-domain"
                title="IT Company"
                class="py-3 text-h5 text-primary"
                nav
                >
                </v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item
                        to="/"
                        prepend-icon="mdi-home-city"
                        title="Главное"
                        value="home"
                        class="d-flex flex-row"
                    >
                    </v-list-item>

                    <v-list-item
                        to="/employees"
                        prepend-icon="mdi-account-group-outline"
                        title="Сотрудники"
                        value="employees"
                        class="d-flex flex-row"
                    >
                    </v-list-item>

                    <v-list-item
                        to="/documents"
                        prepend-icon="mdi-folder"
                        title="Документы"
                        value="documents"
                        class="d-flex flex-row"
                    >
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <!-- Main content -->
            <v-main 
            class="main__layout-main
            d-flex flex-column">
                <!-- Header part -->
                <Header class="main__layout-main__header"/>

                <!-- Router View part -->
                <div class="main__layout-main__router px-3 py-2">
                    <RouterView/>
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>
  
<script setup>
// import plugins
import { ref } from 'vue';
import { useProductStore } from "@/stores/index";
// import components
import Header from './Header.vue';

// window size directive
import { useWindowSize } from '@/directives/directive';
const windowSize = useWindowSize()

const drawer = ref(true)

// store
const store = useProductStore()

store.init()
</script>