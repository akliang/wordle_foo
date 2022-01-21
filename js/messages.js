app.component('messages', {
  template: `
    <div class="w-full h-6 flex-col justify-center items-center m-2 text-center">
      {{ this.$store.state.gameSettings.message }}
    
      <template v-if="this.$store.state.gameSettings.playAgain">
        <button @click="initializeGame()">Play again?</button>
      </template>
    </div>`,
})
