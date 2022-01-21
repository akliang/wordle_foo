  app.component('parent', {
    created: function() {
      this.initializeGame();
    },
    template: `
      <div id=topTitle class="text-4xl font-bold text-slate-800 font-mono flex justify-center items-center pt-10">
        Wordle!
      </div>
      <div class="h-full px-8 pt-6 pb-16">
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