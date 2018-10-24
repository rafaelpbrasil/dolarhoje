<template>
  <div id="app">
    <div v-if="coins" class="row">
      <h2>{{ formatDate() }}</h2>
      <h2>1 {{ coins.USD.code }} => {{ coins.USD.ask }} {{ coins.USD.codein }}</h2>
    </div>
    <br>
    <chart></chart>
    <div v-if="!coins">
      <img :src="getGifPath()" alt="...Loading">
    </div>
  </div>
</template>

<script>
import mixins from './mixins';
import chart from './components/Chart';

export default {
  name: 'app',
  mixins: [mixins],
  components: {
    chart
  },
  data() {
    return {
      coin: 'USD-BRL',
      days: '15',
      coins: '',
      update: ''
    }
  },
  mounted() {
    this.getCurrentCoins();
  },
  methods: {
    getCurrentCoins() {
      this.$http.get('all/')
                .then((res) => {
                  this.coins = res.data;
                })
    }
  }
}
</script>

<style>
  #app {
    font-family: Helvatica, Arial, sans-serif;
    -webkit-font-smoothing: antialised;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .row {
    background-color: #f9f9f9;
    margin-left: 150px;
    margin-right: 150px;
  }
</style>
