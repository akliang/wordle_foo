  app.component('parent', {
    created: function() {
      this.initializeGame();
    },
    template: `
      <div class="h-full p-6 pb-16">
        <div id=upperGrid class="h-1/2">
          <play-grid></play-grid>
        </div>
        <div id=lowerGrid class="h-1/2">
          <messages></messages>
          <keyboard></keyboard>
        </div>
      </div>
    `
  })