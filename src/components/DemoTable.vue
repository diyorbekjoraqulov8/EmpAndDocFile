<template>
  <div>
    <!-- Add your filter UI here, e.g., a v-select dropdown -->
    <v-select v-model="selectedGender" :items="['male', 'female', 'all']" label="Filter by Gender"></v-select>

    <!-- Vuetify data table -->
    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :search="search"
      :loading="loading"
    ></v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: true,
      selectedGender: "all",
      search: "",

      headers: [
        { text: "Name", value: "name" },
        { text: "Gender", value: "gender" },
        // Add more headers for other user attributes as needed
      ],
    };
  },

  computed: {
    filteredUsers() {
      // Filter by gender based on the selected option
      if (this.selectedGender === "all") {
        return this.users;
      } else {
        return this.users.filter((user) => user.gender === this.selectedGender);
      }
    },
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      axios.get("https://json-server-empanddoc-a1b805982825.herokuapp.com/employeesBody").then((response) => {
        this.users = response.data;
        this.loading = false;
      });
    },
  },
};
</script>
