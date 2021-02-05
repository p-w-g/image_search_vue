<template>
  <div
    class="home"
    v-bind:style="{
      'background-image': 'url(' + landingBackgroundImage + ')'
    }"
  >
    <article class="md-layout md-alignment-center-center">
      <search-bar />
    </article>
  </div>
</template>

<script>
import SearchBar from '../components/Search'
export default {
  name: 'Home',
  data: () => ({}),
  components: { SearchBar },
  computed: {
    landingBackgroundImage() {
      return this.$store.getters.landingBackground
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch('fetchBackgroundImage')
  }
}
</script>
