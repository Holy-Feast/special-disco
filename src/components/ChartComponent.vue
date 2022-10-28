<template>

  <div class="chart_card">
    <button class="chart_btn" ref="switcher" :disabled='isDisabled' v-on:click="switchGraph">by {{switcher}}</button>
    <div class="chart-container">
      <canvas id="chart" ref="canvas"></canvas></div>
  </div>
</template>

<script>
import {Chart, registerables} from 'chart.js'
export default {
  name: "ChartComponent",
  props: ['forecastList'],

  data() {
    return {
      switcher: 'days',
      isDisabled: false,
      chart: null
    }
  },
  watch: {
    forecastList: function() { // watch it
      this.getHours(this.forecastList)
    }
  },
  methods: {
    buildChart(labels, datasets) {
      if (this.chart){
        this.chart.destroy()
      }
      Chart.register(...registerables)
      this.chart = new Chart(this.$refs.canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: datasets,
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          },
          ]
        },
        options: {
          title: {
            display: true,
            text: 'World population per region (in millions)'
          }
        }
      });
    },
    getHours(forecastList){
      let date = `${new Date().getDate()+1}.${new Date().getMonth()+1}`
      let labels = []
      let datasets = []
      forecastList.forEach(el => {
        if (el.days == date){
          labels.push(el.time)
          datasets.push(el.temp)
        }
      })
      this.buildChart(labels, datasets)
    },
    getDays(forecastList){
      let labels = []
      let datasets = []
      let tempDay = 0
      let counter = 0
      forecastList.forEach((el, index) => {
        tempDay += el.temp
        counter++
        if (forecastList[index+1] && forecastList[index].days != forecastList[index+1].days){
          labels.push(el.days)
          datasets.push(tempDay/counter)
          tempDay = 0
          counter = 0
        }
      })
      this.buildChart(labels, datasets)
    },
    switchGraph(){
      this.isDisabled = true
      setTimeout(() => this.isDisabled = false, 1100)
      if (this.switcher == 'days'){
        this.getDays(this.forecastList)
      } else {
        this.getHours(this.forecastList)
      }
      this.switcher = this.switcher == 'days' ? 'hours' : 'days'
    }

  }
}
</script>

<style scoped>
.chart_card {
  border-radius: 10px;
  width: 100%;
  padding: 3%;
  box-shadow: -5px 5px 15px 5px rgba(150, 150, 150, 0.2);
}
.chart_btn{
  border: 1px solid #9ca3af;
  border-radius: 10px;
}
</style>