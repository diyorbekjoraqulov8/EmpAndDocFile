<template>
  <v-app>
    <!-- <DemoTable /> -->
    <Main id="listApp"/>
  </v-app>
</template>

<script setup>
// import DemoTable from './components/DemoTable.vue';
import Main from '@/components/Main.vue'
import { useProductStore } from "@/stores/index"; 

// store
const store = useProductStore()
</script>