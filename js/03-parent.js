app.component('parent', {
  created: function() {
    this.initializeGame();
  },
  template: `
    <div class="px-8 pt-10 pb-16">
      <question-modal v-if="this.$store.state.gameSettings.questionModal"></question-modal>
      <settings-modal v-show="this.$store.state.gameSettings.settingsModal"></settings-modal>

      <div class="h-80 w-80 mx-auto sm:h-96 sm:w-96">
        <play-grid></play-grid>
      </div>
      <div class="h-14 w-full flex justify-center items-center">
        <messages></messages>
      </div>
      <keyboard></keyboard>

    </div>
  `
});
