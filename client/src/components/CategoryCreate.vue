<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Category Name</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
          Enter a category name
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Limit</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
          Min amount should be greater than {{ $v.limit.$params.minValue.min  }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

const defailtLimit = 10;
export default {
  data: () => ({
    title: '',
    limit: defailtLimit,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(defailtLimit) },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        console.log(category);
        // Reset form
        this.title = '';
        this.limit = defailtLimit;
        this.$v.$reset();
        // eslint-disable-next-line no-undef
        M.toast({ html: 'Category successfully created' });
        this.$emit('created', category);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
