<template>
  <form
    class="md-layout-item md-size-40 backdrop"
    @submit.prevent="queryPictures"
    name="search-form"
  >
    <md-field>
      <label>Search Images</label>
      <md-input v-model="searchQuery"></md-input>
    </md-field>
    <div class="suggestions-wrapper" v-if="searchQuery.length > 2">
      <md-list>
        <md-list-item
          v-for="(suggestion, index) in filteredDict"
          :key="index"
          @click="select(suggestion)"
        >
          {{ suggestion }}
        </md-list-item>
        <md-list-item v-if="filteredDict.length < 1">
          No suggestions available
        </md-list-item>
      </md-list>
    </div>
  </form>
</template>

<script>
import { dictionary } from '../dictionary'
export default {
  name: 'SearchBar',
  data: () => ({
    searchQuery: '',
    dict: dictionary
  }),
  props: {
    routeToResults: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    filteredDict: function() {
      return this.dict.filter(
        (el) => el.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
      )
    }
  },
  methods: {
    queryPictures() {
      const searchQuery = this.searchQuery
      this.$store.dispatch('searchImages', { searchQuery })
      if (!!this.routeToResults) this.$router.push({ path: `/Results` })
    },
    select(val) {
      this.searchQuery = val
      this.queryPictures()
    }
  }
}
</script>
