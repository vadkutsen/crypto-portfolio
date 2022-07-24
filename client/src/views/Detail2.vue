<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Income' : 'Outcome'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Description: {{record.description}}</p>
              <p>Amount: {{record.amount | currency}}</p>
              <p>Category: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>Record with id {{$route.params.id}} not found</p>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.$title('Detail'),
    };
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    // eslint-disable-next-line prefer-destructuring
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    // eslint-disable-next-line no-unused-expressions
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
