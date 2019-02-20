<template>
  <div id="app">
    <div v-if="coins" class="row">
      <h2>{{ formatDate() }}</h2>
      <h2>
        {{ coins.USD.code }} &nbsp; <input type="number" v-model="valueUSD">
        <font-awesome-icon icon="exchange-alt" /> &nbsp;
        {{ coins.USD.codein }} &nbsp; <label>{{parseFloat(valueBRL).toFixed(2)}}</label>
      </h2>
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
      valueUSD: 1,
      coin: 'USD-BRL',
      valueBRL: null,
      days: '15',
      coins: '',
      update: ''
    }
  },
  watch: {
    valueUSD(oldVal, newVal) {
      this.valueBRL =  oldVal * this.coins.USD.ask;
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
                  this.valueBRL = res.data.USD.ask;
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
   
  .row input {
    font-family: Helvatica, Arial, sans-serif;
    font-size: 1.0em;
    font-weight: bold;
    width: 120px;
    border: none;
    background-color: #f9f9f9;
    outline: none;
  }
</style>
