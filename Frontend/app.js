URL = "http://localhost:8080"

Vue.createApp({
    // contains data - variables, arrays, etc.
    data() {
      return {
        page: 1,
        pets: [],
        name: "",
        species: "",
        breed: "",
        age: 0,
        gender: "",



      };
    },

    methods: {
        swapPage: function(pageNum) {
            this.page = pageNum;
      },

      getPets: async function() {
        let response = await fetch(`${URL}/pets`);
        let data = await response.json();
        this.pets = data;
        console.log(this.pets);

      },

      postPets: async function() {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("species", this.species);
        formData.append("breed", this.breed);
        formData.append("age", this.age);
        formData.append("gender", this.name);


        let requestOption = {
            method: "POST",
            body: formData,
        }

        let respsone = await fetch (`${URL}/posts`, requestOption);
        const data = await response.json();
        this.pets.push(data);


      },
      


    },

    

    created: function() {
        console.log("vue app loaded");
        this.getPets();
    }
}).mount("#app");