<template>
  <div class="stake-info-layout">
    <div class="row">
      <stake-info-container style="flex: 1; margin-right: 4px;" />
      <expected-reward-container style="flex: 1; margin-left: 4px;" />
    </div>
    <staked-operator-container style="flex: 1; margin-top: 8px;" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StakeInfoContainer from '@/containers/StakeInfoContainer.vue';
import ExpectedRewardContainer from '@/containers/ExpectedRewardContainer.vue';
import StakedOperatorContainer from '@/containers/StakedOperatorContainer.vue';

export default {
  components: {
    'stake-info-container': StakeInfoContainer,
    'expected-reward-container': ExpectedRewardContainer,
    'staked-operator-container': StakedOperatorContainer,
  },
  data () {
    return {
      columns: [],
      searching: false,
      operatorsBySearching: [],
    };
  },
  computed: {
    ...mapGetters([
      'operatorsStaked',
    ]),
  },
  created () {
    this.columns = [
      {
        name: 'OPERATOR',
        key: 'name',
      },
      {
        name: 'MY STAKE',
        key: 'userStaked',
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
    searchOperatorByName (name) {
      if (name === '') {
        this.searching = false;
      } else {
        this.searching = true;
        this.operatorsByName =
          this.operators.filter(operator => operator.name.toLowerCase().includes(name.toLowerCase()));
      }
    },
  },
};
</script>

<style scoped>
.stake-info-layout {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
