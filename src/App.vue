<template>
  <div id="app">
    <div v-if="coins" class="row">
      <h1 class="start">&nbsp;{{ this.date }}</h1>
      <h1>{{ coins.USD.ask }} {{ coins.USD.codein }}&nbsp;</h1>
    </div>
    <br>
    <div v-if="coinsMonth" class="graph">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div v-if="!coins && !coinsMonth">
<<<<<<< HEAD
      <img src="./assets/loading.gif" alt="...Loading">
=======
      <img src="@/assets/loading.gif" alt="...Loading">
>>>>>>> 699a702e22367743d2753e1ebe9ebe659917c989
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      coin: 'USD-BRL',
      days: '15',
      coins: '',
      coinsMonth: '',
      date: this.formatDate(),
      update: ''
    }
  },
  mounted() {
    this.getCurrentCoins();
    this.getCoinsLastMonth();
  },
  computed: {
    chartOptions() {
      return {
        style: {
          fontFamily: "'Montserrat', Helvatica, Arial, sansSerif"
        },
        colors: [
          '#6af9c4'
        ],
        title: {
          text: 'Dólar nos ultimos 15 dias'
        },
        xAxis: {
          categories: this.formatDate(
            this.coinsMonth.map( function(value) {
              return value.create_date;
            })
          )
        },
        yAxis: {
          title: {
            text: 'Valor do dólar'
          }
        },
        series: [{
          name: 'Dólar',
          data: this.coinsMonth.map((value) => {
            return parseFloat(value.ask);
          })
        }],
        credits: {
          enabled: false
        }
      }
    }
  },
  methods: {
<<<<<<< HEAD
    getCurrentCoins() {
=======
    async getCurrentCoins() {
>>>>>>> 699a702e22367743d2753e1ebe9ebe659917c989
      this.$http.get('all/')
                .then((res) => {
                  this.coins = res.data;
                })
    },
<<<<<<< HEAD
    getCoinsLastMonth() {
=======
    async getCoinsLastMonth() {
>>>>>>> 699a702e22367743d2753e1ebe9ebe659917c989
      this.$http.get('list/'+this.coin+'/'+this.days)
                .then((res) => {
                  this.coinsMonth = res.data;
                })
    },
    formatDate(date) {
      if (date) {
        if (Array.isArray(date)) {
          return date.map((value) => {
            return new Date(value).toJSON().slice(0,10).split('-').reverse().join('/');
          });
        }
        return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
      }
      return new Date().toJSON().slice(0,10).split('-').reverse().join('/');
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 699a702e22367743d2753e1ebe9ebe659917c989
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
    display: flex;
    flex-direction: row;
    margin-left: 150px;
    margin-right: 150px;
  }

  .start {
    margin-right: auto;
  }

  .graph {
    display: flex;
    justify-content: center;
  }
</style>
