<template>
  <div
    class="button"
    :class="{ 'disable': disable }"
    @click="click"
  >
    {{ label }}
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: true,
    },
    func: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    async click () {
      if (!this.disable) {
        await this.func();
      }
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
}

.button:hover {
  cursor: pointer;
}

.disable:hover {
  cursor: not-allowed;
}
</style>
