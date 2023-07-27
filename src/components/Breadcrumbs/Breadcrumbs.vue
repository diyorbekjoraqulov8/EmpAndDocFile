<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  items:Array
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

</script>

<template>
    <v-breadcrumbs 
    :items="props.items" 
    class="breadpp text-caption text-sm-subtitle-2">
      <template v-slot:title="{ item }" style="border: 1px solid red;">
        <p 
        class="tableName"
        :style="`color: ${themeColor.tableName};`">
            {{ item.title.toUpperCase() }}
        </p>
      </template>
    </v-breadcrumbs>
</template>