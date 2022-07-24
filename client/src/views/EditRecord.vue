<template>
    <div>
        <div class="page-title">
            <h3>Edit Record</h3>
        </div>
        <Loader v-if="loading"/>
        <form v-else class="form" @submit.prevent="submitHandler">
            <p>
            <label>
                <input
                    class="with-gap"
                    name="type"
                    type="radio"
                    value="buy"
                    v-model="type"
                />
                <span>Buy</span>
            </label>
            </p>

            <p>
            <label>
                <input
                    class="with-gap"
                    name="type"
                    type="radio"
                    value="sell"
                    v-model="type"
                />
                <span>Sell</span>
            </label>
            </p>

            <div class="input-field">
              <input
                  required
                  id="name"
                  type="text"
                  v-model="name"
              >
              <label for="name">Asset Name</label>
            </div>

            <div class="input-field">
              <input
                  required
                  id="quantity"
                  type="number"
                  step="0.00000001"
                  min="0"
                  v-model.number="quantity"
              >
              <label for="quantity">Quantity</label>
            </div>

            <div class="input-field">
              <input
                  required
                  id="price"
                  type="number"
                  step="0.00000001"
                  min="0"
                  v-model.number="price"
              >
              <label for="price">Price</label>
            </div>

            <div class="input-field">
              <input
                  id="targetPrice"
                  type="number"
                  step="0.00000001"
                  min="0"
                  v-model.number="targetPrice"
              >
              <label for="targetPrice">Target Price</label>
            </div>

            <div class="input-field">
              <input
                  id="notes"
                  type="text"
                  v-model="notes"
              >
              <label for="notes">Notes</label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            Update
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  // props: ['item'],
  metaInfo() {
    return {
      title: this.$title('Menu_EditRecord'),
    };
  },
  name: 'edit',
  data: () => ({
    loading: true,
    name: '',
    quantity: '',
    price: '',
    targetPrice: '',
    type: 'buy',
    notes: ''
  }),
  async mounted() {
    this.loading = false;
    const id = this.$route.params.id;
    this.asset = await this.$store.dispatch('fetchAssetById', id);
    // const asset = await this.$store.dispatch('fetchAssetById', this.$route.params.id)
    console.log(this.asset)
    this.name = this.asset.name
    this.quantity = this.asset.quantity
    this.price = this.asset.price
    this.targetPrice = this.asset.targetPrice
    this.type = this.asset.type
    this.notes = this.asset.notes
  },
  computed: {
    ...mapGetters(['info']),
    // canCreateRecord() {
    //   if (this.type === 'income') {
    //     return true;
    //   }
    //   return this.info.bill >= this.amount;
    // },
  },
  methods: {
    // async submitHandler() {
    //     try {
    //       await this.$store.dispatch('createRecord', {
    //         name: this.name.toUpperCase(),
    //         quantity: this.quantity,
    //         price: this.price,
    //         type: this.type,
    //         targetPrice: this.targetPrice,
    //       });
    //       M.toast({ html: 'Record successfully created' });
    //       // Reset form
    //       this.name = '';
    //       this.quantity = null;
    //       this.price = null;
    //       this.targetPrice = null;
    //       this.type = 'buy'
    //     } catch (e) {
    //       console.log(e.message);
    //     }
      // } else {
        // eslint-disable-next-line no-undef
        // M.toast({ html: `Not enough account balance (${this.amount - this.info.bill})` });
      // }
    // },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
