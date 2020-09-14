<template>
  <v-app>
    <AppBar />
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Home from './views/Home';


export default {
  name: 'App',

  components: {
    Home,
    AppBar
  }
};
</script>
