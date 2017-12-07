export default {
  methods: {
    getNodeByRefTree(refs) {
      let node = this.$parent;

      for (const index in refs) {
        node = node.$refs[refs[index]];
      }

      return node;
    }
  }
};
