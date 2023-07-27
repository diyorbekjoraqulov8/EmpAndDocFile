import { defineStore } from 'pinia'
import axios from "axios";
export const useProductStore = defineStore('index', {
    state: () => ({
        // apiPath: "http://localhost:3000",
        apiPath:"https://json-server-empanddoc-a1b805982825.herokuapp.com",
        // employees
        employee:null,
        employeeDocs:null,
        employees: {},
        emoloyeesSize: null,
        empSorting: {},
        // documents
        document:null,
        documents: {},
        documentsSize:null,
        docSorting: {},
        randomColor: '',
        tableLoader: false,
        progresLoader: false,
        // Bread Crumbs
        breadcrumbItems:[]

    }),
    actions: {
      async init(){
        this.tableLoader = true
        // get Api Json Server
        await this.getEmployees()
        await this.getDocuments()
        await this.apiValue()

        let color = sessionStorage.getItem('randomColor')
        
        this.randomColor = color !== null ? color : 'primary'
        this.tableLoader = false
      },
      async apiValue() {
        // employees count
        let emp = await axios.get(`${this.apiPath}/employeesBody`)
        this.emoloyeesSize = emp.data.length
        let doc = await axios.get(`${this.apiPath}/documentsBody`)
        this.documentsSize = doc.data.length
        // employees genders
        await this.sortGender(emp.data)
        await this.isActive(emp.data)
        await this.isType(doc.data)
        await this.isAuthor(doc.data,emp.data)
      },

      // Employees
      async filterEmpValue(gender, active, obj){
        this.tableLoader = true
        if (gender !== 3) {
          if (active === 2) {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/employeesBody?gender=${gender}&q=${obj.search || ''}`).then(item => this.emoloyeesSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/employeesBody?gender=${gender}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.employees.body = res.data
          }else {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/employeesBody?active=${active}&gender=${gender}&q=${obj.search || ''}`).then(item => this.emoloyeesSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/employeesBody?active=${active}&gender=${gender}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.employees.body = res.data
          }
        }else {
          if (active !== 2) {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/employeesBody?active=${active}&q=${obj.search || ''}`).then(item => this.emoloyeesSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/employeesBody?active=${active}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.employees.body = res.data

            console.log('3 active');
          }else{
            // Emoloyees Size
            await axios.get(`${this.apiPath}/employeesBody?q=${obj.search || ''}`).then(item => this.emoloyeesSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/employeesBody?q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            
            this.employees.body = res.data
          }
        }

        this.tableLoader = false
      },
      async getEmployees(){
        // get Employees Headers
        let headers = await axios.get(`${this.apiPath}/employeesHeaders`)
        // get Employees Body
        let body = await axios.get(`${this.apiPath}/employeesBody?_page=1&_limit=5`)

        this.employees = {
          headers: headers.data,
          body: body.data
        }
      },
      // Employees genders
      async sortGender(data) {
        const gender = [3]
        data?.forEach(item => {
          if (!gender.includes(item.gender)) {
            gender.push(item.gender)
          }
        })
        gender.sort()

        const titleMap = {
          1: "Мужской",
          2: "Женский",
          3: "Все",
        };

        let result = gender.map(num => ({
          id: num,
          title: titleMap[num]
        }));
        this.empSorting.genders = result
      },
      // Employees active
      async isActive(data) {
        const active = [2]
        data?.forEach(item => {
          if (!active.includes(item.active)) {
            active.push(item.active)
          }
        })
        active.sort()

        const titleMap = {
          0: "Не активен",
          1: "Активный",
          2: "Все",
        };

        let result = active.map(num => ({
          id: num,
          title: titleMap[num]
        }));

        this.empSorting.empActive = result
      },

      // Employee
      // Find employee
      async employeeFind(id){
        this.progresLoader = true

        let res = await axios.get(`${this.apiPath}/employeesBody/${id}`)
        this.employee = res.data

        // find employee docs
        let obj = {
          page: 1,
          perPage: 5,
          search: ''
        }
        await this.employeeDocsFind(id,obj)
      },
      // Find employee docs
      async employeeDocsFind(id,obj){
        let docsSize;
        await axios.get(`${this.apiPath}/documentsBody?authorId=${id}&q=${obj.search}`).then(item => docsSize = item.data.length)
        await axios.get(`${this.apiPath}/documentsBody?authorId=${id}&q=${obj.search}&_page=${obj.page}&_limit=${obj.perPage}`).then(res => this.employeeDocs = {
          docs: res.data,
          docsSize
        }).then(()=>this.progresLoader = false)
      },

      // Documents
      async filterDocValue(type, author, obj){
        this.tableLoader = true
        if (type !== 3) {
          if (author === 0) {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/documentsBody?type=${type}&q=${obj.search || ''}`).then(item => this.documentsSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/documentsBody?type=${type}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.documents.body = res.data
          }else {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/documentsBody?authorId=${type}&type=${type}&q=${obj.search || ''}`).then(item => this.documentsSize = item.data.length)
            
            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/documentsBody?authorId=${author}&type=${type}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.documents.body = res.data
          }
        }else {
          if (author !== 0) {
            // Emoloyees Size
            await axios.get(`${this.apiPath}/documentsBody?authorId=${author}&q=${obj.search || ''}`).then(item => this.documentsSize = item.data.length)
            
            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/documentsBody?authorId=${author}&q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.documents.body = res.data
          }else{
            // Emoloyees Size
            await axios.get(`${this.apiPath}/documentsBody?q=${obj.search || ''}`).then(item => this.documentsSize = item.data.length)

            // Emoloyees sortind data
            let res = await axios.get(`${this.apiPath}/documentsBody?q=${obj.search || ''}&_page=${obj.page}&_limit=${obj.perPage || 5}`)
            this.documents.body = res.data
          }
        }
        this.tableLoader = false
      },
      async getDocuments(){
        // get Documents Headers
        let headers = await axios.get(`${this.apiPath}/documentsHeaders`)
        // get Documents Body
        let body = await axios.get(`${this.apiPath}/documentsBody?_page=1&_limit=5`)

        this.documents = {
          headers: headers.data,
          body: body.data
        }
      },
      // Documents type
      async isType(data){
        const type = [3]
        data?.forEach(item => {
          if (!type.includes(item.type)) {
            type.push(item.type)
          }
        })
        type.sort()

        const titleMap = {
          1: "Счет-фактура",
          2: "Доверенность",
          3: "Все",
        };

        let result = type.map(num => ({
          id: num,
          title: titleMap[num]
        }));

        // return result
        this.docSorting.documentsType = result
      },
      // Documents Author
      async isAuthor(data,emp){
        const authorId = []
        const author = [
          {
            id:0,
            title:"Все"
          }
        ]
        data?.forEach(item => {
          if (!authorId.includes(item.authorId)) {
            authorId.push(item.authorId)
          }
        })
        authorId.forEach(item => {
          const findAuthor = (id) =>{
            return emp?.find(user => user.id == id)?.name
          }
          let obj = {
            id: item,
            title: findAuthor(item)
          }
          author.push(obj)
        });
        author.sort()

        this.docSorting.documentsAuthors = author
      },

      // Document
      // Find document
      async documentFind(id){
        this.progresLoader = true
        let res = await axios.get(`${this.apiPath}/documentsBody/${id}`)
        this.document = res.data
        this.progresLoader = false
      }
    }
})