import Vue from 'vue'
import Vuex from 'vuex'
import { createApi } from 'unsplash-js'

const key = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
console.log("key: ", key)
const unsplash = createApi({
  accessKey: key
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    landingBackground: '',
    modalPhoto: '',
    searchResults: [],
    lastSearchKeyword: '',
    isLoading: true,
    isLoadingModal: true
  },
  mutations: {
    assignBg(state, image) {
      state.landingBackground = image
    },
    lastSearchKeyword(state, keyword) {
      state.lastSearchKeyword = keyword
    },
    searchResults(state, results) {
      state.searchResults = results
    },
    modalPhoto(state, results) {
      state.modalPhoto = results
    },
    loading(state) {
      state.isLoading = true
    },
    loaded(state) {
      state.isLoading = false
    },
    loadingModal(state) {
      state.isLoadingModal = true
    },
    loadedModal(state) {
      state.isLoadingModal = false
    }
  },
  actions: {
    fetchBackgroundImage(context) {
      unsplash.photos
        .getRandom({ orientation: 'landscape' })
        .then((result) => {
          const bg = result.response.urls.regular
          context.commit('assignBg', bg)
        })
        .catch((e) => {
          throw e
        })
    },
    searchImages(context, payload) {
      context.commit('loading')
      const query = payload.searchQuery
      context.commit('lastSearchKeyword', query)

      unsplash.search
        .getPhotos({ query: query })
        .then((result) => {
          context.commit('searchResults', result.response.results)
          context.commit('loaded')
        })
        .catch((e) => {
          throw (e)
        })
    },
    getImageForModal(context, payload) {
      context.commit('loadingModal')

      const picId = payload.picId

      unsplash.photos
        .get({ photoId: picId })
        .then(result => {
          context.commit('modalPhoto', result.response)
          context.commit('loadedModal')
        })
        .catch((e) => {
          throw (e)
        });
    }
  },
  modules: {
  },
  getters: {
    landingBackground: state => state.landingBackground,
    isLoading: state => state.isLoading,
    isLoadingModal: state => state.isLoadingModal,
    searchResults: state => state.searchResults,
    modalPhoto: state => state.modalPhoto
  }
})
