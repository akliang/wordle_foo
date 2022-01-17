var app = Vue.createApp({
  data() {
    return {
      letterParams: [
        { letterVal: 'a', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'b', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'c', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'd', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'e', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'f', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'g', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'h', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'i', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'j', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'k', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'l', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'm', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'n', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'o', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'p', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'q', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'r', letterState: 'active', letterPos: [0,0] },
        { letterVal: 's', letterState: 'active', letterPos: [0,0] },
        { letterVal: 't', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'u', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'v', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'w', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'x', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'y', letterState: 'active', letterPos: [0,0] },
        { letterVal: 'z', letterState: 'active', letterPos: [0,0] },
      ],
    }
  },
});

var store = Vuex.createStore({
  state() {
    return { 
      currRow: 1,
      currCol: 2,
    }
  },
  // mutations: {
  //   incrementRow (currRow) {
  //     currRow.position++;
  //   },
  //   incrementCol (currCol) {
  //     currCol.position++;
  //   },
  // }
})

app.use(store);