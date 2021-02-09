<template>
  <div class="results">
    <article class="md-layout md-alignment-center-center">
      <search-bar :route-to-results="false" />
    </article>
    <div v-if="isLoading">
      <md-progress-bar md-mode="query" class="loader"></md-progress-bar>
    </div>
    <div class="masonry-container">
      <img
        v-for="(item, index) in searchResults"
        :key="index"
        :src="item.urls.small"
        alt=""
        srcset=""
        class="brick"
        @click="openModal(item)"
      />
    </div>
    <div v-if="isModalVisible">
      <!-- TODO: when implementing custom modal, rely on vuex prop instead of event listener (@shutdownTheModal) -->
      <modal-card
        :toggle-show="isModalVisible"
        :item="item"
        @shutdown-the-modal="hideModal"
      />
    </div>
  </div>
</template>
<script>
import SearchBar from '../components/Search'

export default {
  name: 'Results',
  components: { SearchBar, ModalCard: () => import('../components/ModalCard') },
  data() {
    return {
      isModalVisible: false,
      item: {}
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    },

    searchResults() {
      return this.$store.getters.searchResults
    }
  },
  methods: {
    openModal(obj) {
      this.item = obj
      this.isModalVisible = true

      const picId = obj.id
      this.$store.dispatch('getImageForModal', { picId })
    },
    hideModal() {
      this.isModalVisible = false
    }
  }
}
</script>
