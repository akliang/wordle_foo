  app.component('parent', {
    created: function() {
      this.initializeGame();
    },
    template: `
      <div class="h-full">
        <div id=upperGrid class="h-4/6">
          <play-grid></play-grid>
        </div>
        <div id=lowerGrid class="h-2/6">
          <messages></messages>
          <keyboard></keyboard>
        </div>
      </div>
    `
  })