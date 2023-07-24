<script setup>
import { ref, computed } from "vue";
import { useTheme } from 'vuetify'

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

// Change theme color
const toggleTheme = () => {
  theme.global.name.value = currentTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
    <div 
    class="header 
    d-flex justify-space-between align-center 
    px-3 px-lg-5 py-4"
    :style="`border-bottom: 1px solid ${themeColor.lightGray}`">
        <span class="header__logo d-flex align-center">
            <v-icon color="primary" icon="mdi-widgets" class="text-sm-h4"></v-icon>
            <p class="text-md-h6 ml-3 text-body-1 text-sm-h6">IT Company</p>
        </span>
        <ul class="header__list d-none d-flex text-body-1">
            <li class="header__list-item mr-3">
                <v-btn icon @click="toggleTheme">
                  <v-icon>{{ currentTheme !== 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
                </v-btn>
            </li>
        </ul>
    </div>
</template>