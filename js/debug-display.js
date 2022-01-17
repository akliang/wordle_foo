app.component('debug-display', {
  template: '<div>{{ pos }}</div>',
  computed: {
    pos() {
      return this.$store.state.currRow;
    }
  }
})