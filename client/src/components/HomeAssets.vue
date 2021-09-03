<template>
  <div class="col s12 m12 l12">
    <table class="striped">
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
            <!-- <th>Date</th> -->
          </tr>
          </thead>

          <tbody>
          <tr v-for="asset in assets" :key="asset._id">
            <td>{{asset.name}}</td>
            <td>{{asset.quantity}}</td>
            <td>${{asset.price}}</td>
            <td>${{(asset.quantity * asset.price).toFixed(2)}}</td>
            <td></td>
            <td>{{asset.currentPrice}}</td>
            <td></td>
            <td></td>
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
  props: ['assets', 'prices', 'date'],
  data: () => ({
    // currencies: ['PLN', 'USD', 'EUR'],
    // totalInvested: 0,
  }),
};
</script>
