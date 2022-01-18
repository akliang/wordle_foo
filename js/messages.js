app.component('messages', {
  template: '<div class="message-wrapper" v-bind:class="this.$store.state.gameSettings.messageColor">{{ this.$store.state.gameSettings.message }}</div>',
})