app.component('messages', {
  template: `
    <div class="w-full h-6 flex-col justify-center items-center m-2 text-center">
      {{ this.$store.state.gameSettings.message }}
    
      <template v-if="this.$store.state.gameSettings.playAgain">
        <button @click="initializeGame()" class="bg-sky-600 text-white px-2 py-0.5 rounded-md">Play again?</button>
      </template>
    </div>`,
})
