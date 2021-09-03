<template>
    <div>
        <div class="page-title">
            <h3>New Trade</h3>
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
                  id="name"
                  type="text"
                  v-model="name"
                  :class="{invalid: $v.name.$dirty && !$v.name.required}"
              >
              <label for="name">Asset Name</label>
              <span
                v-if="$v.name.$dirty && !$v.name.required"
                class="helper-text invalid"
              >
              Name is required {{ $v.name.$dirty && !$v.name.required  }}
              </span>
            </div>

            <div class="input-field">
              <input
                  id="quantity"
                  type="number"
                  step="0.00000001"
                  min="0"
                  v-model.number="quantity"
                  :class="{invalid: $v.quantity.$dirty && !$v.quantity.minValue}"
              >
              <label for="quantity">Quantity</label>
              <span
                v-if="$v.quantity.$dirty && !$v.quantity.minValue"
                class="helper-text invalid"
              >
              Min quantity should be greater than {{ $v.quantity.$params.minValue.min  }}
              </span>
            </div>

            <div class="input-field">
              <input
                  id="price"
                  type="number"
                  step="0.00000001"
                  min="0"
                  v-model.number="price"
                  :class="{invalid: $v.price.$dirty && !$v.price.minValue}"
              >
              <label for="price">Price</label>
              <span
                v-if="$v.price.$dirty && !$v.price.minValue"
                class="helper-text invalid"
              >
              Min price should be greater than {{ $v.price.$params.minValue.min  }}
              </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            Create
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

const defaultMinValue = 0;
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord'),
    };
  },
  name: 'record',
  data: () => ({
    loading: true,
    name: '',
    quantity: '',
    price: '',
    // categories: [],
    // select: null,
    // category: null,
    type: 'buy',
    // amount: 1,
    // description: '',
  }),
  validations: {
    quantity: { minValue: minValue(defaultMinValue) },
    price: { minValue: minValue(defaultMinValue) },
    name: { required },
  },
  async mounted() {
    // this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    // if (this.categories.length) {
    //   this.category = this.categories[0].id;
    // }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
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
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }
      // if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            // categoryId: this.category,
            // amount: this.amount,
            // description: this.description,
            // type: this.type,
            name: this.name,
            quantity: this.quantity,
            price: this.price
            // date: new Date().toJSON(),
          });
          // const bill = this.type === 'income'
          //   ? this.info.bill + this.amount
          //   : this.info.bill - this.amount;
          // await this.$store.dispatch('updateInfo', { bill });
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Record successfully created' });
          // Reset form
          this.$v.$reset();
          // this.amount = defaultAmount;
          // this.description = '';
          this.name = '';
          this.quantity = null;
          this.price = null;
        } catch (e) {
          console.log(e.message);
        }
      // } else {
        // eslint-disable-next-line no-undef
        // M.toast({ html: `Not enough account balance (${this.amount - this.info.bill})` });
      // }
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
