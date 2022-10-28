<template>
  <div id="nav">
    <router-link class="w-30" to="/">
      <img src="./assets/CloudS.svg"
           width="150"
           height="150" alt="logo" srcset="">
    </router-link>

    <router-link class="marg-left nav__favours" to="/favs">
      <img src="https://cdn-icons-png.flaticon.com/512/263/263417.png"
           width="30"
           height="30" alt="logo" srcset="">
    </router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*{

  background-color: #FFFAFB;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131515;
  max-width: 1200px;
  margin: 0 auto;
}
#nav{
  display: flex;
}
.nav__favours{
  margin-top: 50px;
  padding: 15px;
}

.marg-left{
  margin-left: auto;
  margin-right: 0;
}
a{
  text-decoration: none;
}
</style>
