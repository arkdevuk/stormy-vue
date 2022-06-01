<template>
  <div class="search-location">
    <!-- form -->
    <div class="search-wrapper px-2">
      <div class="input-group mb-3">
        <select id="inputGroupSelect01"
                v-model="type"
                class="custom-select">
          <option value="housenumber">Numéro maison</option>
          <option selected value="street">Rue</option>
          <option value="locality">Lieu-dit</option>
          <option value="municipality">Commune</option>
        </select>
        <input v-model="query" :aria-label="defaultPlaceholder"
               :disabled="loading"
               :placeholder="defaultPlaceholder"
               class="form-control"
               type="text"
               @keyup.enter="search">
        <div class="input-group-append">
          <button :disabled="loading"
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="search">Button
          </button>
        </div>
      </div>
    </div>
    <!-- loader -->
    <div v-if="loading"
         class="is-loading-wrapper">
      <div class="progress">
        <div class="circle-loader wobble"></div>
      </div>
    </div>
    <!-- results -->
    <div v-if="results !== undefined"
         class="results-wrapper">
      <div class="list-group">
        <a v-for="opt in results"
           :key="opt.properties.id"
           class="list-group-item list-group-item-action flex-column align-items-start active"
           href="#">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ opt.properties.label }}</h5>
            <small>{{ opt.properties.type }}</small>
          </div>
          <p class="mb-1">{{ opt.properties.context }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import GeocodingService from "@/services/GeocodingService";
import {ToastService} from "@/mixins/ToastService";

export default {
  name: "search-location",
  mixins: [ToastService],
  props: {},
  data() {
    return {
      geocoding: GeocodingService,
      query: '',
      lastQuery: '',
      type: 'street',
      // states
      loading: false,
      // placeholders
      defaultPlaceholder: 'ex : rue des crocodiles bleu',
      // results
      results: undefined,
    }
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    checkQuery() {
      // query > 3 chars
      // query !== lastQuery
      this.query = this.query.trim();
      if (this.query.length < 3) {
        return false;
      }
      if (this.query === this.lastQuery) {
        return false;
      }
      return true;
    },
    search() {
      if (!this.checkQuery()) {
        this.AppToast.error('Impossible d\'éxecuter la recherche 🐒');
        return;
      }
      this.results = undefined;
      this.loading = true;
      this.geocoding.searchLocation(this.query, this.type)
          .then(response => {
            console.log('response', response)
            let data_ = response?.data?.features;
            if (data_ === undefined || data_ === null || data_.length <= 0) {
              throw new Error('no results');
            }
            this.results = data_;
            this.lastQuery = this.query;
          })
          .catch(err => {
            console.error('error', err);
            this.AppToast.error('Une erreur est survenue, cheh !');
          })
          .finally(() => {
            this.loading = false;
          })
      ;
    }
  },
  components: {},
  beforeUnmount() {
  }
}
</script>

<style scoped>

</style>