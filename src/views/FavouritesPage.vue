<template>
<h1>Favourites</h1>
    <div  v-for="location in favLocations" :key="location" class="city-list">
      <CityCard v-if="location" v-on:deleteCity="deleteCity" v-on:delFromFav="delFromFav" v-on:addToFav="addToFav" v-bind:favourites="true" v-bind:location="location"/>
    </div>
</template>

<script>
import CityCard from "@/components/CityCard";

export default {
  name: "FavouritesPage",
  data(){
    return {
      favLocations: []
    }
  },
  components: {
    CityCard
  },
  created() {
    this.favLocations = JSON.parse(localStorage.getItem('favlocations'));
  },
  methods: {
    addToFav(city){
      this.favLocations.push(city)
      localStorage.setItem('favlocations', JSON.stringify(this.favLocations))
    },
    delFromFav(city){
      this.favLocations.splice(this.favLocations.findIndex(element => element.toLowerCase().replace(/\W/g, '') == city.toLowerCase().replace(/\W/g, '')), 1)
      localStorage.setItem('favlocations', JSON.stringify(this.favLocations))
    },
  }
}
</script>

<style scoped>

</style>