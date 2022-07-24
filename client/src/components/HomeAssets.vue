<template>
  <div class="col s12 m12 l12">
    <h5>Total Invested: ${{totalInvested().toFixed(2)}} in {{assets.length}} tokens | Unrealized Profit: ${{totalProfit().toFixed(2)}} | Realized Income: ${{realizedProfit().toFixed(2)}}</h5>
    <hr style="border-top: 1px solid;">
    <table class="striped">
        <thead>
          <tr>
            <th>Token</th>
            <th>Target Price</th>
            <th>Current Price</th>
            <th>Profit</th>
            <th>Location</th>
            <th>Lock Status</th>
            <!-- <th>Notes</th> -->
            <th>Open</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="asset in assets" :key="asset._id">
            <td>
              <div class="row valign-wrapper">
                <div class="col">
                  <img class="material-icons circle responsive-img" :src="asset.logo" width="64px" />
                </div>
                <div class="col">
                  <p><b>{{asset.name}}</b><br>
                    <img
                      class="circle responsive-img"
                      src="/img/icons/coins.png"
                      width="16px"
                    /> 
                    {{asset.quantity.toFixed(6)}} (${{asset.amount.toFixed(2)}})<br>
                    Avg Trade Price: ${{asset.price.toFixed(6)}}<br>
                  </p>
                </div>
              </div>
            </td>
            <td>${{asset.targetPrice}}</td>
            <td>${{asset.currentPrice}}</td>
            <td v-bind:class="[isProfit(asset) ? 'green-text' : 'red-text', 'text-darken-2']">
              {{profitPercent(asset).toFixed(2)}}%<br>(${{profit(asset).toFixed(2)}})
            <!-- <td>
              <ul>
                <li v-for="(note, index) in asset.notes" :key="index">
                  {{note}}
                </li>
              </ul>
            </td> -->
            <td>{{asset.location}}</td>
            <td v-if="asset.unlock">{{asset.unlock | date('date')}}</td>
            <td v-else>Free</td>
            <td>
              <button
                v-tooltip="'Open details'"
                class="btn-small btn"
                @click="$router.push(`/asset/${asset.name}`)"
              >
                <i class="material-icons circle">open_in_new</i>
              </button>
            </td>
            <!-- <td>{{rates[cur].toFixed(5)}}</td> -->
            <!-- <td>{{date | date('date')}}</td> -->
          </tr>
          </tbody>
      </table>


    <!-- <ul class="collection">
    <li class="collection-item avatar" v-for="asset in assets" :key="asset._id"> -->
      <!-- <img class="material-icons circle" :src="`https://images.coinviewer.io/currencies/64x64/${asset.name}.png`" /> -->
      <!-- <img class="material-icons circle" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" /> -->
      <!-- <i class="material-icons circle green">insert_chart</i>
      <span class="title">{{asset.name}}</span>
      <p>Quantity: {{asset.quantity}} <br>
         Avg Trading Price: ${{asset.price}}
      </p>
      <p class="secondary-content">Amount: <br>${{(asset.quantity * asset.price).toFixed(2)}}</p>
      <p class="secondary-content">Current Price: <br>${{(asset.currentPrice).toFixed(2)}}</p> -->
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
    <!-- </li>
  </ul> -->




    <!-- <div class="card blue darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Tokens</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Token</th>
            <th>Quantity</th>
            <th>Avg Trading Price</th>
            <th>Amount</th>
            <th>Target Price</th>
            <th>Current Price</th>
            <th>Profit, %</th>
            <th>Profit, $</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="asset in assets" :key="asset._id">
            <td>{{asset.name}}</td>
            <td>{{asset.quantity}}</td>
            <td>${{asset.price}}</td>
            <td>${{(asset.quantity * asset.price).toFixed(2)}}</td>
            <td>{{rates[cur].toFixed(5)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ['assets', 'date'],
  data: () => ({
    // currencies: ['PLN', 'USD', 'EUR'],
    // totalInvested: 0,
    // isProfit: true,
    // notes: '',
    // targetPrice: '',
    // totalProfit: 0,
  }),
  // mounted() {
    
  // },
  methods: {
    profitPercent(asset) {
      return (asset.currentPrice - asset.price) / asset.price * 100
    },
    profit(asset) {
      const profit = asset.quantity * asset.currentPrice - asset.amount
      return profit
    },
    isProfit(asset) {
      return asset.price < asset.currentPrice
    },
    getLogoUrl(asset) {
      return require(asset.logo)
    },
    totalInvested() {
      let amount = 0
      this.assets.forEach(asset => {
        amount += asset.amount
      })
      return amount
    },
    totalProfit() {
      let total = 0
      this.assets.forEach(asset => {
        const profit = this.profit(asset)
        total += profit
      })
      return total
    },
    realizedProfit() {
      let total = 0
      this.assets.forEach(asset => {
          total += asset.realizedProfit
      })
      return total
    },
  }
};
</script>
