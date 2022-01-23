app.component('messages', {
  template: `
    <span class="touch-manipulation select-none">
      {{ this.$store.state.gameSettings.message }}
    
      <template v-if="this.$store.state.gameSettings.playAgain">
        <button @click="initializeGame()" class="bg-sky-600 text-white px-2 py-0.5 rounded-md">Play again?</button>
      </template>
    </span>`,
})
