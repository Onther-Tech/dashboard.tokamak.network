<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="checked"
      @click="toggle"
    >
    <span
      class="round slider"
      :class="{ 'disable': disable }"
    />
  </label>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    check: {
      type: Function,
      default: () => {},
    },
    uncheck: {
      type: Function,
      default: () => {},
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle (evt) {
      if (!this.disable)
        if (this.checked) this.uncheck();
        else this.check();

      evt.preventDefault();
    },
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.disable {
  position: absolute;
  cursor: not-allowed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
