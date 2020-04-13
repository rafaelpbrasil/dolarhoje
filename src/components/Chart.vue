<template>
  <div>
    <p>
      Dólar nos últimos
      <select v-model="days">
        <option v-for="day in arrDays" v-bind:value="day">
          {{ day }}
        </option>
      </select>
      dias
    </p>
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
      days: '30',
      coinsMonth: '',
      arrDays: [7, 15, 30, 60, 90, 180, 365]
    }
  },
  watch: {
    days() {
      this.getCoinsLastMonth();
    }
  },
  mounted() {
    this.getCoinsLastMonth();
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'spline'
        },
        style: {
          fontFamily: "'Montserrat', Helvatica, Arial, sansSerif"
        },
        colors: [
          '#f44242'
        ],
        title: null,
        tooltip: {
          formatter: function() {
            return this.x + '<br>$1 => R$' + this.y.toFixed(2);
          }
        },
        xAxis: {
          categories: this.formatDate(
            this.coinsMonth.map(function (value) {
              return value[0];
            })
          )
        },
        yAxis: {
          title: {
            text: 'BRL'
          },
          labels: {
            formatter: function() {
              return 'R$' + this.value.toFixed(2);
            }
          }
        },
        series: [{
          name: 'Valor do Dólar em Real',
          data: this.coinsMonth.map(function(value) {
            return parseFloat(value[1].BRL);
          })
        }],
        credits: { enabled: false }
      }
    }
  },
  methods: {
    getCoinsLastMonth() {
      var endDate = moment().format('YYYY-MM-DD');
      var startDate = moment().subtract(this.days, "days").format('YYYY-MM-DD');

      this.$http.get('/history?start_at='+startDate+'&end_at='+endDate+'&symbols=USD,BRL&base=USD')
        .then((res) => {
          this.coinsMonth = Object.entries(res.data.rates).sort().reverse().reverse();
        });
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
