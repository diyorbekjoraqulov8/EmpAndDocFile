import { defineStore } from 'pinia'
import axios from "axios";
export const useProductStore = defineStore('index', {
    state: () => ({
        apiPath:"https://json-server-empanddoc-d08aaeb3978f.herokuapp.com",
        employees: null,
        documents: null,
        randomColor: ''
    }),
    actions: {
      async getEmployees(){
        let res = await axios.get(`${this.apiPath}/employees`)

        this.employees = res.data
      },
      async getDocuments(){
        let res = await axios.get(`${this.apiPath}/documents`)

        this.documents = res.data
      },
      init(){
        // get Api Json Server
        this.getEmployees()
        this.getDocuments()

        let color = sessionStorage.getItem('randomColor')
        
        this.randomColor = color !== null ? color : 'primary'
      }
    }
})