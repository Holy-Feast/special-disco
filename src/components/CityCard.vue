<template>

<div class="content_container">
  <div class="content_wrapper">
    <div>
      <div class="weather_card">
        <div class="weather_card_img" :style="{backgroundImage: weatherImg}">
          <div class="weather_card_state">
          </div>
        </div>

        <div class="weather_card_infos">
          <div style="display: flex; justify-content: space-around">
            <div class="weather_card_infos_title">
            {{`${infos.city}, ${infos.country}`}}
            </div>
            <div style="display: flex; cursor: pointer">
              <img v-show="favour" v-on:click="delFromFav(`${infos.city}, ${infos.country}`)"
                   src="https://cdn-icons-png.flaticon.com/512/263/263417.png"
                   width="30"
                   height="30" alt="logo" srcset="">
              <img v-show="!favour" v-on:click="addToFav(`${infos.city}, ${infos.country}`)"
                   src="https://cdn-icons-png.flaticon.com/512/73/73814.png"
                   width="30"
                   height="30" alt="logo" srcset="">
              <button class="remove-fromlist" style="margin-left: 10px; cursor: pointer" v-on:click="deleteFromList(`${infos.city}, ${infos.country}`)">x</button>
            </div>
          </div>

          <div class="weather_card_infos_temp">
            {{celsius}}°C / {{fahrenheit}}°F
          </div>
          <div class="bottom">
            <hr>
            <div class="weather_card_infos_bottom">
              humidity: {{infos.humidity}} - pressure: {{infos.pressure}}Pa
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChartComponent v-bind:forecastList="forecastList"/>
</div>

</template>

<script>
import axios from "axios";
import ChartComponent from "@/components/ChartComponent";

export default {
  name: "CityCard",
  components: {
    ChartComponent
  },

  props: ['location', 'favourites'],
  emits: ['deleteCity', 'addToFav', 'delFromFav'],
  data() {
    return {
      favour: this.favourites,
      forecastList: [],
      infos: {
        city: "",
        country: "",
        temp: null,
        humidity: null,
        state: null
      }
    }
  },
  watch: {
    location: async function (event) {
      await this.fetchData(event)
    }
  },
  computed: {
    celsius() {
      return Math.round(this.infos.temp);
    },
    fahrenheit() {
      return Math.round((this.infos.temp * 9) / 5);
    },
    weatherIcon() {
      switch (this.infos.state) {
        case "Sunny":
          return "wb_sunny";
        case "Clear":
          return "wb_sunny";
        case "Rain":
          return "umbrella";
        case "Fog":
          return "stacked_line_chart";
        case "Clouds":
          return "filter_drama";
        default:
          return "error";
      }
    },
    weatherImg() {
      let url = null;
      switch (this.infos.state) {
        case "Clear":
          url =
              "https://media-cdn.tripadvisor.com/media/photo-s/04/b5/0f/ff/alinn-sarigerme-boutique.jpg";
          break;
        case "Sunny":
          url =
              "https://media-cdn.tripadvisor.com/media/photo-s/04/b5/0f/ff/alinn-sarigerme-boutique.jpg";
          break;
        case "Rain":
          url = "umbrella";
          break;
        case "Fog":
          url = "stacked_line_chart";
          break;
        case "Clouds":
          url = "https://i.pinimg.com/736x/44/67/33/4467338524df8802784fbaef4d5c0bb5.jpg";
          break;
        default:
          console.error('cannot find image: state is undefined');
      }
      return "url(" + url + ")";
    }
  },

  async created() {

    let favLocations = JSON.parse(localStorage.getItem('favlocations'));
    if(
        favLocations.findIndex(element => element.toLowerCase().replace(/\W/g, '') == this.location.toLowerCase().replace(/\W/g, '')) != -1
    ){
      this.favour = true
    }
    await this.fetchData(this.location)
  },
  methods: {
    deleteFromList(city) {
      this.$emit('deleteCity', city)
    },
    addToFav(city){
      this.favour = true
      this.$emit('addToFav', city)
    },
    delFromFav(city){
      this.favour = false
      this.$emit('delFromFav', city)
    },
    async fetchData(location){

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f909a48dbf3e04882f4bd18b885d816a&units=metric`;
      const urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f909a48dbf3e04882f4bd18b885d816a&units=metric`;
      const data = await axios
          .get(urlWeather)
          .then(response => (this.info = response.data));
      const dataforecast = await axios
          .get(urlWeatherForecast)
          .then(response => (this.infoForecast = response.data));

      this.forecastList = dataforecast.list;
      this.forecastList = this.forecastList.map(el => {
        let date = new Date(el.dt * 1000)
        return { days: `${date.getDate()}.${date.getMonth()+1}`,time: date.getHours(), temp: el.main.temp}
      })
      this.infos.city = data.name;
      this.infos.country = data.sys.country;
      this.infos.temp = data.main.temp;
      this.infos.humidity = data.main.humidity;
      this.infos.pressure = data.main.pressure;
      this.infos.state = data.weather[0].main;
    }
  }
}
</script>

<style scoped>
.content_container{

  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
}

.weather_card {

  margin-right: auto;
  margin-left: 0;
  width: 400px;
  display: flex;
  border-radius: 10px;
  height: 120px;
  padding: 15px;
  box-shadow: -5px 5px 15px 5px rgba(150, 150, 150, 0.2);
}

.weather_card_img {
  width: calc(120px - 15px);
  display: flex;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
}

.weather_card_state {
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.1);
  color: #fff;
  font-size: 50px;
}

.weather_card_state .material-icons {
  font-size: 50px;
}

.weather_card_infos {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px;
}

.weather_card_infos_title {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 10px;
}

.weather_card_infos_temp {
  font-size: 22px;
  font-weight: 300;
  color: rgb(170,170,170);
}
hr {
  width: 100%;
  height: 1px;
  background: rgba(100,100,100,.2);
  border: none;
}

.bottom {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.weather_card_infos_bottom {
  font-size: 12px;
  font-weight: 300;
}
.remove-fromlist{
  background-color: #86303e;
  color: #FFFAFB;
  width: 20px;
  height: 20px;
  border: none;
}

</style>