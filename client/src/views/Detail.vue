<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="asset">
      <div class="breadcrumb-wrap">
        <router-link to="/" class="breadcrumb">Assets</router-link>
        <a @click.prevent class="breadcrumb">
          {{$route.params.id}}
        </a>
      </div>
      <div class="col s12 m12 l12">
        <table class="striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Target Price</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in asset" :key="item._id">
              <td>{{item.date | date('date')}}</td>
              <td
                v-bind:class="[item.type === 'sell' ? 'red-text' : 'green-text', 'text-darken-2']"
              >
                {{item.type}}
              </td>
              <td>{{item.quantity}}</td>
              <td>${{item.price}}</td>
              <td>${{item.targetPrice}}</td>
              <td>${{(item.quantity * item.price)}}</td>
              <td>{{item.notes}}</td>
              <td>
                <button
                v-tooltip="'Edit'"
                class="btn-small btn"
                @click="$router.push(`/asset/${item._id}/edit`, item)"
              >
                <i class="material-icons circle">edit</i>
              </button>
              <br>
              <button
                v-tooltip="'Delete'"
                class="btn-small btn"
                @click="$router.push(`/asset/${item._id}`)"
              >
                <i class="material-icons circle">delete</i>
              </button>
              </td>
            </tr>
          </tbody>
        </table>
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
    // record: null,
    asset: null,
    loading: true,
  }),
  async mounted() {
    // eslint-disable-next-line prefer-destructuring
    const id = this.$route.params.id;
    this.asset = await this.$store.dispatch('fetchAssetById', id);
    // const record = await this.$store.dispatch('fetchRecordById', id);
    // const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    // eslint-disable-next-line no-unused-expressions
    // this.record = {
    //   ...record,
    //   categoryName: category.title,
    // };
    this.loading = false;
  },
};
</script>
