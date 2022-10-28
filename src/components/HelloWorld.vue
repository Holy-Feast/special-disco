<template>
  <div class="hello">

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      info: null
    };
  },
  mounted() {
    axios
        .get('http://api.openweathermap.org/data/2.5/forecast?q=Toronto,CA&appid=f909a48dbf3e04882f4bd18b885d816a')
        .then(response => (this.info = response.data));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
