<template>
  <table class="staked-operator-table">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="text-center pointer" @click="orderBy('name')">{{ withArrow('name', 'Operator Name') }}</th>
        <th class="text-center pointer" @click="orderBy('userStaked')">{{ withArrow('userStaked', 'My Staked') }}</th>
        <th class="text-center pointer" @click="orderBy('userReward')">{{ withArrow('userReward', 'My Reward') }}</th>
        <th class="text-center pointer" @click="orderBy('userSeigs')">{{ withArrow('userSeigs', 'Expected Reward Amount') }}</th>
        <th class="text-center pointer" @click="orderBy('userSeigsRate')">{{ withArrow('userSeigsRate', 'Expected Reward Rate') }}</th>
        <th class="text-center pointer" @click="orderBy('commissionRate')">{{ withArrow('commissionRate', 'Commission Rate') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(operator, index) in orderedOperators" :key="operator.layer2">
        <td class="text-center">{{ index }}</td>
        <td class="clickable text-center name" @click="viewDetailedOperator(operator)"><span class="pointer">{{ operator.name }}</span></td>
        <td class="text-center">{{ operator.userStaked | currencyAmount }} </td>
        <td class="text-center">{{ operator.userReward | currencyAmount }} </td>
        <td class="text-center">{{ operator.userSeigs | currencyAmount }} </td>
        <td class="text-center">{{ userSeigsRate(operator.userStaked, operator.userSeigs) }} </td>
        <td class="text-center">{{ operator.isCommissionRateNegative ? '-' : '' }}{{ operator.commissionRate | rateOf }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { orderBy } from 'lodash';

import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      from: 'userStaked',
      order: 'desc',
    };
  },
  computed: {
    ...mapGetters([
      'operatorsStaked',
    ]),
    orderedOperators () {
      switch (this.from) {
      case 'name':
        return orderBy(this.operatorsStaked, (operator) => operator.name, [this.order]);

      case 'userStaked':
        return orderBy(this.operatorsStaked, (operator) => operator.userStaked.toFixed('ray'), [this.order]);

      case 'userReward':
        return orderBy(this.operatorsStaked, (operator) => operator.userReward.toFixed('ray'), [this.order]);

      case 'userSeigs':
        return orderBy(this.operatorsStaked, (operator) => operator.userSeigs.toFixed('ray'), [this.order]);

      case 'userSeigsRate':
        return orderBy(this.operatorsStaked, (operator) => this.userSeigsRate(operator.userStaked, operator.userSeigs), [this.order]);

      case 'commissionRate':
        return orderBy(this.operatorsStaked, (operator) => operator.commissionRate, [this.order]);

      default:
        return [];
      }
    },
    withArrow () {
      return (from, label) => {
        if (this.from === from) {
          return this.order === 'desc' ? `${label} ↑` : `${label} ↓`;
        }
        return label;
      };
    },
    userSeigsRate () {
      return (userStaked, userSeigs) => this.$options.filters.userSeigsRate(userStaked, userSeigs);
    },
  },
  methods: {
    orderBy (from) {
      if (this.from === from) {
        this.order = this.changedOrder();
      } else {
        this.from = from;
        this.order = 'desc';
      }
    },
    changedOrder () {
      return this.order === 'desc' ? 'asc' : 'desc';
    },
    viewDetailedOperator (operator) {
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
.staked-operator-table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  border-spacing: 0;
  background: #ffffff;
}

.staked-operator-table td, .staked-operator-table th {
  border-top: solid 0.5px #dce2e5;
  /* border: 1px solid #555561; */
  /* padding: 8px; */
}

tbody tr:hover {
  background-color: #f8f8f8;
}

.pointer {
  cursor: pointer;
}

tbody .clickable {
  font-weight: bolder;
  text-decoration: underline;
}

.staked-operator-table th {
  text-align: left;
}

.staked-operator-table td {
  text-align: left;
}

.staked-operator-table .text-center {
  text-align: center;
}

.staked-operator-table .text-right {
  text-align: right;
}

th {
  padding: 6px;
  background-color: #f6f8f9;
  font-family: Roboto;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #7e8d93;
}

td {
  padding: 12px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #161819;
}

.name {
  width: 140px;
  word-break: break-all;
}
</style>
