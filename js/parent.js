  app.component('parent', {
    created: function() {
      this.initializeGame();
    },
    template: `
      <div class="px-8 pt-10 pb-16">
        <question-modal v-if="this.$store.state.gameSettings.questionModal"></question-modal>
        <settings-modal v-show="this.$store.state.gameSettings.settingsModal"></settings-modal>

        <div class="h-96 md:w-96 md:mx-auto">
          <play-grid></play-grid>
        </div>
        <div class="h-14 w-full flex justify-center items-center">
          <messages></messages>
        </div>
        <keyboard></keyboard>

      </div>
    `
  })