<script setup>

</script>

<template>
    <div 
    class="home
    d-flex flex-column align-center
    pt-16 px-2 px-sm-5">
        <h2 class="d-flex align-center text-h5 text-lg-h4 text-primary font-weight-regular mb-4">
            <v-icon 
            icon="mdi-domain" 
            class="text-h4 mr-3 text-lg-h3"></v-icon>
            IT Company
        </h2>
        <p 
        class="text-center text-body-2 text-lg-h6">Платформа для сотрудников компании. Здесь вы можете найти Персонал и сопутствующие документы</p>

        <div 
        class="homeRouter
        mt-8 text-body-2 text-sm-body-1 text-md-h6"
        color="red">
            <RouterLink to="/employees">
                Сотрудники
            </RouterLink>
            <hr>
            <RouterLink to="/documents">
                Документы
            </RouterLink>
        </div>
    </div>
</template>