<template>
  <div id="app">
    <div v-if="coins" class="row">
      <h2>{{ formatDate(this.coins.date) }}</h2>
      <h2>
        {{ Object.keys(this.coins.rates)[1] }}
        <input autofocus type="number" min="0" max="99999999999999999999999" v-model="valueUSD">

        <font-awesome-icon icon="exchange-alt" /> &nbsp;

        {{ Object.keys(this.coins.rates)[0] }}
        <label>{{parseFloat(valueBRL).toFixed(2)}}</label>
      </h2>
    </div>
    <br>
    <chart></chart>
    <div v-if="!coins">
      <img :src="getGifPath()" alt="...Loading">
    </div>
    <div class="source">
      <small>
        Source: <a href="https://exchangerate.host" target="_blank">Exchange Rates API</a>
        |
        <a href="https://github.com/Daimioo/dolarhoje">github.com/Daimioo/dolarhoje</a>
      </small>
    </div>
  </div>
</template>

<script>
import mixins from './mixins';
import chart from './components/Chart';

export default {
  name: 'App',
  mixins: [mixins],
  components: {
    chart
  },
  data() {
    return {
      valueUSD: 1,
      valueBRL: null,
      coins: '',
    }
  },
  watch: {
    valueBRL() {
      this.getBadge();
    },
    valueUSD(oldVal, newVal) {
      this.valueBRL =  oldVal * this.coins.rates.BRL;
    }
  },
  mounted() {
    this.getCurrentCoins();
  },
  methods: {
    getCurrentCoins() {
      this.$http.get('latest?symbols=USD,BRL&base=USD')
        .then((res) => {
          this.coins = res.data;
          this.valueBRL = parseFloat(res.data.rates.BRL).toFixed(2);
        })
    },
    getBadge(){
      if (window.chrome.browserAction) {
        window.chrome.browserAction.setBadgeText({text: this.valueBRL});
        window.chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0, 255]});
      }
    }
  }
}
</script>

<style>
  body {
    max-width: 800px;
    max-height: 600px;
  }

  #app {
    font-family: Helvatica, Arial, sans-serif;
    -webkit-font-smoothing: antialised;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .row {
    background-color: #eee;
    padding: 2px;
  }

  .row input {
    font-family: Helvatica, Arial, sans-serif;
    font-size: 1.0em;
    font-weight: bold;
    max-width: 100px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    outline: none;
  }
</style>
