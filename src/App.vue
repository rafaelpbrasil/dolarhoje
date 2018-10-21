<template>
  <div id="app" class="flex">
    <div v-if="coins">
      <h1>Dinheiro Hoje {{ this.date }}</h1>
      <h1>{{ coins.USD.codein }} -> {{ coins.USD.name }} / {{ coins.USD.ask }}</h1>
    </div>
    <div v-if="coinsMonth">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div v-if="!coins && !coinsMonth">
      <img src="@/assets/loading.gif" alt="...Loading" class="loading">
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
    async getCurrentCoins() {
      this.$http.get('all/')
                .then((res) => {
                  this.coins = res.data;
                })
    },
    async getCoinsLastMonth() {
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
  }
}
</script>
