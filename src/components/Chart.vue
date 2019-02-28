<template>
  <div>
    <div v-if="coinsMonth" class="graph">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import mixins from '../mixins.js';
import moment from 'moment';

export default {
  name: 'app',
  mixins: [mixins],
  data() {
    return {
      days: '20',
      coinsMonth: ''
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
          '#f44242'
        ],
        title: {
          text: 'Dólar nos ultimos 15 dias'
        },
        tooltip: {
          formatter: function() {
            return 'R$ ' + this.y.toFixed(2);
          }
        },
        xAxis: {
          categories: this.formatDate(
              this.coinsMonth.map( function(value) {
              return value[0];
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
          data:  this.coinsMonth.map( function(value) {
              return parseFloat(value[1].BRL);
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
      var endDate = moment().format('YYYY-MM-DD');
      var startDate = moment().subtract(this.days, "days").format('YYYY-MM-DD');

      this.$http.get('https://api.exchangeratesapi.io/history?start_at='+startDate+'&end_at='+endDate+'&symbols=USD,BRL&base=USD')
                .then((res) => {
                  this.coinsMonth = Object.entries(res.data.rates).sort().reverse();
                })
    },
  }
}
</script>

<style scoped>
  .graph {
    display: flex;
    justify-content: center;
  }
</style>
