<template>
  <SearchComponent v-on:onSearch="updateCity" class="w-30"/>

  <h1>
    Weather
    <div class="date">{{today}}</div>
  </h1>
  <div v-for="location in locations" :key="location" class="city-list">
    <CityCard v-on:deleteCity="deleteCity" v-on:delFromFav="delFromFav" v-on:addToFav="addToFav" v-bind:favourites="false" v-bind:location="location"/>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";
import CityCard from "@/components/CityCard";

export default {
  name: "HomePage",
  components: {
    SearchComponent,
    CityCard
  },
  data(){
    return {
      locations: [],
      favLocations: []
    }
  },
  async created() {
    await this.fetchData()
  },
  computed: {
    today() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString("en-US", options);
    },
  },
  methods: {
    updateCity(event) {
      if (this.locations.length < 5){
        this.locations.push(event)
      } else {
        alert('Too much, delete something')
      }
    },
    addToFav(city){
      if (JSON.parse(localStorage.getItem('favlocations')).length < 5){
        this.favLocations.push(city)
        localStorage.setItem('favlocations', JSON.stringify(this.favLocations))
      } else {
        alert('Too much, delete something')
      }
    },
    delFromFav(city){
      this.favLocations.splice(this.favLocations.findIndex(element => element.toLowerCase().replace(/\W/g, '') == city.toLowerCase().replace(/\W/g, '')), 1)
      localStorage.setItem('favlocations', JSON.stringify(this.favLocations))
    },
    deleteCity(value) {
      this.locations.splice(this.locations.findIndex(element => element.toLowerCase().replace(/\W/g, '') == value.toLowerCase().replace(/\W/g, '')), 1)

    },
    async fetchData(){
      await fetch('https://api.ipregistry.co/?key=3vhow340sa37p24c')
          .then(function (response) {
            return response.json();
          })
          .then( (payload) => {
            this.locations.push(`${payload.location.city}, ${payload.location.country.code}`);
          });
    }
  }

}
</script>

<style scoped>
.date {
  font-weight: 300;
  font-size: 12px;
  margin: 5px auto;
}

  .w-30{
    width: 30%;
  }
</style>