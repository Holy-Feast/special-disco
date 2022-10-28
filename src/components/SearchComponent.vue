<template>
  <div class="search">
    <input type="text"
           id="search"
           v-model="searchTerm"
           placeholder="Type here..." class="searchTerm">

    <button type="submit" class="searchButton">
      <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g class="search-path" fill="none" stroke="#fff"><path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/><circle cx="8" cy="8" r="7"/></g></svg>
    </button>

  </div>
  <ul
      v-if="searchCity.length"
      class="search-list"
  >
    <li
        v-for="city in searchCity"
        :key="city.name"
        @click="selectCity(city)"
        class="search-item"
    >
      {{ `${city.name}, ${city.country}` }}
    </li>
  </ul>
</template>

<script>
import cities from 'cities.json'
import {ref, computed} from 'vue'
export default {
  name: "SearchComponent",
  emits: ["onSearch"],
  setup(_,{ emit }) {
    let searchTerm = ref('')
    const searchCity = computed(() => {
      if (searchTerm.value === '') {
        return []
      }
      let matches = 0
      return cities.filter(city => {
        if (city.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
          matches++
          return city
        }
      })
    });
    const selectCity = (city) => {
      selectedCity.value = city.name
      searchTerm.value = ''
      emit('onSearch', `${city.name}, ${city.country}`)
    }
    let selectedCity = ref('')
    return {
      cities,
      searchTerm,
      searchCity,
      selectCity,
      selectedCity
    }
  }
}
</script>

<style scoped>

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #2B2C28;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 10px 0 0 10px;
  outline: none;
  color: #2B2C28;
}

.searchTerm:focus{
  color: #2B2C28;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 3px solid #2B2C28;
  background: #2B2C28;
  text-align: center;
  color: #fff;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  font-size: 20px;
  background-color: #2B2C28;
}
.searchButton svg{
  background-color: #2B2C28;
}
.search-list{
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  width: 20%;
  list-style: none;
}
.search-item{
  padding: 10px;
  background: rgb(255,250,251);
  background: linear-gradient(90deg, rgba(255,250,251,1) 0%, rgba(229,231,235,1) 54%, rgba(255,250,251,1) 100%);

  cursor: pointer;
  border-bottom: 1px solid #131515;
}
</style>