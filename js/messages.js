app.component('messages', {
  template: `
    <div class="message-wrapper" v-bind:class="this.$store.state.gameSettings.messageColor">
      {{ this.$store.state.gameSettings.message }}
      <span v-if="this.$store.state.gameSettings.gameWon"><a href="#" @click="initializeGame()">Play again?</a></span>
    </div>`,
})