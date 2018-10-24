<template>
  <div>
    <div v-if="coinsMonth" class="graph">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import mixins from '../mixins.js';

export default {
  name: 'app',
  mixins: [mixins],
  data() {
    return {
      coin: 'USD-BRL',
      days: '15',
      coinsMonth: '',
      update: ''
    }
  },
  mounted() {
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
    getCoinsLastMonth() {
      this.$http.get('list/'+this.coin+'/'+this.days)
                .then((res) => {
                  this.coinsMonth = res.data;
                })
    }
  }
}
</script>

<style scoped>
  .graph {
    display: flex;
    justify-content: center;
  }
</style>
