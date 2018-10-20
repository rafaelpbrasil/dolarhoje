<template>
  <div>
    <h1>Dinheiro Hoje {{ this.date }}</h1>
    <div v-if="coins">
      <h1>{{ coins.USD.codein }} -> {{ coins.USD.name }} / {{ coins.USD.ask }}</h1>
    </div>
    <div v-if="coinsMonth">
      <li v-for="currency in coinsMonth">
        {{ formatDate(currency.create_date) }} / {{ currency.code }} / {{ currency.ask }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      coin: 'USD-BRL',
      days: '30',
      coins: '',
      coinsMonth: '',
      date: this.formatDate()
    }
  },
  created() {
    this.getCurrentCoins();
    this.getCoinsLastMonth();
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
        return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
      }
      return new Date().toJSON().slice(0,10).split('-').reverse().join('/');
    }
  }
}
</script>
