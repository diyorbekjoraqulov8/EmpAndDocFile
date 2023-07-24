import { createRouter, createWebHistory } from "vue-router";

import Home from '@/view/Home.vue';
import Employees from '@/view/Employees/Employees.vue';
import Documents from '@/view/Documents/Documents.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    },
    {
      path: '/employees/:id',
      name: 'employee',
      component: () => import('@/view/Employees/Employee.vue')
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    },
    {
      path: '/documents/:id',
      name: 'document',
      component: () => import('@/view/Documents/Document.vue')
    }
  ],
});

export default router;
