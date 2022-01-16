Vue.component('letter-square', {
  template: '<div class="letter-square">hi</div>'
})

Vue.component('letter-row', {
  template: `
  <span class="letter-row">
    <div v-for="n in 5">
      <letter-square></letter-square>
    </div>
  </span>
  `
})

Vue.component('play-grid', {
  template: `
  <span>
    <template v-for="n in 6">
      <letter-row></letter-row>
    </template>
  </span>
  `
})