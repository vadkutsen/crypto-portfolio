<template>
    <div>
  <div class="page-title">
    <h3>Categories</h3>
  </div>
  <section>
    <Loader v-if="loading" />
    <div v-else class="row">
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
      />
      <p v-else class="center">No Categories yet</p>
    </div>
  </section>
    </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    };
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      // eslint-disable-next-line no-plusplus
      this.updateCount++;
    },
  },
};
</script>
