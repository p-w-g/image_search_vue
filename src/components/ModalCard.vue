<template>
  <div class="modal">
    <!-- TODO: implement custom modal, instead on toggleshow use vuex prop -->
    <md-dialog
      :md-active.sync="toggleShow"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    >
      <md-dialog-title>
        {{ item.user.name }} <br />
        {{
          modalPhoto.location.city &&
          !isLoadingModal &&
          modalPhoto != undefined &&
          modalPhoto !== ''
            ? modalPhoto.location.city
            : 'City N/A'
        }},
        {{
          modalPhoto.location.country &&
          !isLoadingModal &&
          modalPhoto != undefined &&
          modalPhoto !== ''
            ? modalPhoto.location.country
            : 'Country N/A'
        }}
      </md-dialog-title>
      <div v-if="isLoadingModal">
        <md-progress-bar md-mode="query" class="loader"></md-progress-bar>
      </div>
      <md-card>
        <div v-if="!isLoadingModal">
          <md-card-media-cover>
            <md-card-media md-medium>
              <img class="height-override" :src="modalPhoto.urls.full" />
            </md-card-media>
            <md-card-area>
              <md-card-actions>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="modalInnerHide"
                    >Close</md-button
                  >
                </md-dialog-actions>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </div>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    toggleShow: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    modalInnerHide() {
      // TODO: pass action to vuex instead, and remove the event listener in parent
      this.$emit('shutdown-the-modal')
    }
  },
  // TODO: implement custom modal on separate prop based on vuex
  // mounted() {
  //   console.log('is modalPhoto loaded?', this.modalPhoto)
  // },
  computed: {
    isLoadingModal() {
      return this.$store.getters.isLoadingModal
    },
    modalPhoto() {
      return this.$store.getters.modalPhoto
    }
  }
}
</script>
