URL = "http://localhost:8080"

Vue.createApp({
    // contains data - variables, arrays, etc.
    data() {
      return {
        page: 1,
        pets: [],
        applications: [],
        //pet key info
        petName: "",
        species: "",
        breed: "",
        age: 0,
        gender: "",
        //application key info
        userName: "",
        phoneNumber: 0,
        email: "",
        petID: 0,




      };
    },

    methods: {
        swapPage: function(pageNum) {
            this.page = pageNum;
      },

      getPetListings: async function() {
        let response = await fetch(`${URL}/pets`);
        let data = await response.json();
        this.pets = data;
        console.log(this.pets);

      },

      createPetListing: async function() {
        const formData = new FormData();
        formData.append("name", this.petName);
        formData.append("species", this.species);
        formData.append("breed", this.breed);
        formData.append("age", this.age);
        formData.append("gender", this.name);


        let requestOptions = {
            method: "POST",
            body: formData,
        };

        let response = await fetch (`${URL}/posts`, requestOptions);
        const data = await response.json();
        this.pets.push(data);


      },
    
      deletePetListing: async function(index = null) {
        let requestOptions = {
            method: "DELETE",
        };

        let petID = this.pets[index]._id;

        let response = await fetch(`${URL}/pets/${petId}`, requestOptions);

        if (response.status === 204) {
            this.pets.splice(index, 1);

        } else {
            alert("Failed to Remove Pet");
        }
      },





      getApplications: async function() {
        let response = await fetch(`${URL}/applications`);
        let data = await response.json();
        this.applications = data;
        console.log(this.applications)

      },

      postApplication: async function() {
        const formData = new FormData();
        formData.append("name", this.userName);
        formData.append("phone_number", this.phoneNumber);
        formData.append("email", this.email);
        formData.append("pet_id", this.petID);

        let requestOptions = {
            method: "POST",
            body: formData,
        };

        let response = await fetch(`${URL}/applications`, requestOptions);
        let data = response.json();
        this.applications.push(data);

      }


    },


    

    created: function() {
        console.log("vue app loaded");
        this.getPetListings();
        this.getApplications();
    }
}).mount("#app");