<template>
  <div
    v-if="shouldRender"
    :class="{ 'toolbar': true, 'toolbar--hidden': hidden }"
  >
    <button
      type="button"
      class="toolbar__toggler"
      @click="toggle"
    >{{ hidden ? 'Show' : 'Hide' }}</button>
    <button
      v-for="(button, index) in iterableButtons"
      :key="index"
      type="button"
      class="toolbar__button"
      @click="button.callback"
    >{{ button.label }}</button>
  </div>
</template>

<script>
/* eslint-env node */
export default {
  props: {
    buttons: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      hidden: false
    };
  },
  computed: {
    shouldRender() {
      return Object.keys(this.buttons).length > 0 && process.env.NODE_ENV === "development";
    },
    iterableButtons() {
      return Object.keys(this.buttons).map(label => ({ label, callback: this.buttons[label] }));
    }
  },
  methods: {
    toggle() {
      this.hidden = !this.hidden;
    }
  }
};
</script>

<style scoped>
.toolbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.5em;
  background-color: white;
  box-shadow: 0 0 10px black;
}

.toolbar--hidden {
  visibility: hidden;
}

.toolbar__toggler {
  position: absolute;
  top: 0;
  right: 0;
  visibility: visible;
  background-color: lightgray;
  border: none;
}

.toolbar__toggler,
.toolbar__button {
  cursor: pointer;
}

.toolbar__button + .toolbar__button {
  margin-left: 0.5em;
}
</style>
