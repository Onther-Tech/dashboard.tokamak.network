<template>
  <div class="dashboard-staking">
    <dashboard-header :title="'My Staking'" :path="'staking'" />
    <text-viewer :title="'Total Expected Reward'" :content="currencyAmount(userTotalSeigs)" :with-divider="true" />
    <text-viewer :title="'Total Staked'" :content="currencyAmount(userTotalStaked)" :with-divider="false" />
    <text-viewer :title="'Total Not Withdrawable'" :content="currencyAmount(userTotalNotWithdrawable)" :with-divider="false" />
    <text-viewer :title="'Total Withdrawable'" :content="currencyAmount(userTotalWithdrawable)" :with-divider="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');

import DashboardHeader from '@/containers/dashboard/components/DashboardHeader.vue';
import TextViewer from '@/components/TextViewer.vue';

export default {
  components: {
    'dashboard-header': DashboardHeader,
    'text-viewer': TextViewer,
  },
  data () {
    return {
      columns: [],
    };
  },
  computed: {
    ...mapGetters([
      'userTotalSeigs',
      'userTotalStaked',
      'userTotalNotWithdrawable',
      'userTotalWithdrawable',
    ]),
    currencyAmount () {
      return amount => this.$options.filters.currencyAmount(amount);
    },
  },
  created () {
    this.columns = [
      {
        name: 'OPERATOR',
        key: 'name',
      },
      {
        name: 'MY STAKE',
        key: 'userStake',
      },
    ];
  },
  methods: {
    viewOperator (operator) {
      const layer2 = operator.layer2;
      this.$router.push({
        path: `/operators/${layer2.toLowerCase()}`,
        query: { network: this.$route.query.network },
      }).catch(err => {});
    },
  },
};
</script>

<style scoped>
.dashboard-staking {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: solid 1px #ced6d9;
  background-color: #ffffff;
  margin-left: 8px;
}
</style>
