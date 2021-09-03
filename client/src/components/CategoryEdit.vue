<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >
            {{c.title}}
            </option>
          </select>
          <label>Select a Category</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Edit Category Name</label>
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
          <label for="limit">Edit Limit</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
          Min amount should be greater than {{ $v.limit.$params.minValue.min  }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

const defaultLimit = 10;
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    title: '',
    limit: defaultLimit,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(defaultLimit) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        // eslint-disable-next-line no-undef
        M.toast({ html: 'Category successfully updated' });
        this.$emit('updated', categoryData);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
