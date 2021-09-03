<template>
    <div>
        <div class="page-title">
            <h3>Planning</h3>
            <h4>{{ info.bill | currency('PLN') }}</h4>
        </div>
        <Loader v-if="loading"/>
        <p v-else-if="!categories.length" class="center">No Categories yet.
          <router-link to="/categories">Please add a category here.</router-link>
        </p>
        <section v-else>
            <div v-for="cat in categories" :key="cat.id">
            <p>
                <strong>{{ cat.title }}</strong>
                {{ cat.spent | currency }} from {{ cat.limit | currency }}
            </p>
            <div class="progress" v-tooltip="cat.tooltip">
                <div
                    class="determinate"
                    :class="[cat.progressColor]"
                    :style="{width: cat.progressPercent + '%'}"
                ></div>
            </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Planning'),
    };
  },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  // eslint-disable-next-line arrow-body-style
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = categories.map((cat) => {
      const spent = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        // eslint-disable-next-line arrow-body-style
        .reduce((total, record) => {
          /* eslint-disable-next-line */
          return total += +record.amount;
        }, 0);
      const percent = (100 * spent) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';
      const tooltipValue = cat.limit - spent;
      const tooltip = `${tooltipValue < 0 ? 'Overspent' : 'Left'} ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip,
      };
    });
    this.loading = false;
    console.log(records, categories);
  },
};
</script>
