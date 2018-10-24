<template>
  <div id="app">
    <div v-if="coins" class="row">
      <h2>{{ this.date }}</h2>
      <h2>1 {{ coins.USD.code }} => {{ coins.USD.ask }} {{ coins.USD.codein }}</h2>
    </div>
    <br>
    <div v-if="coinsMonth" class="graph">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div v-if="!coins && !coinsMonth">
      <img :src="getGifPath()" alt="...Loading">
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
    getCurrentCoins() {
      this.$http.get('all/')
                .then((res) => {
                  this.coins = res.data;
                })
    },
    getCoinsLastMonth() {
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
    },
    getGifPath() {
      let gifUrl = '';
      if (process.env.NODE_ENV === 'production') {
        gifUrl =  'images/loading.gif';
      } else {
        gifUrl = './src/static/images/loading.gif'
      }
      return gifUrl;
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

  .start {
    margin-right: auto;
  }

  .graph {
    display: flex;
    justify-content: center;
  }
</style>
