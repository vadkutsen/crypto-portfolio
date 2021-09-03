<template>
  <div>
  <div class="page-title">
    <h3>Assets</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <Loader v-if="loading"/>
  <div v-else class="row">
    <!-- <HomeBill /> -->
    <HomeAssets
      :assets="assets"
      :prices="prices"
    />
    <!-- <HomeBill
      :rates="currency.conversion_rates"
    />
    <HomeCurrency
      :rates="currency.conversion_rates"
      :date="currency.time_last_update_utc"
    /> -->
  </div>
</div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeAssets from '@/components/HomeAssets.vue';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Assets'),
    };
  },
  name: 'home',
  data: () => ({
    loading: true,
    currency: null,
    assets: [],
    prices: []
  }),
  async mounted() {
    this.assets = await this.$store.dispatch('fetchAssets');
    // this.prices = await this.$store.dispatch('fetchPrices');
    // this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.assets = await this.$store.dispatch('fetchAssets');
      // this.prices = await this.$store.dispatch('fetchPrices');
      // this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: {
    // HomeBill,
    HomeAssets,
  },
};
</script>
