var store = Vuex.createStore({
  modules: {
    gameSettings: gameSettings,
    wordList: wordList,
  }
})

app.use(store);