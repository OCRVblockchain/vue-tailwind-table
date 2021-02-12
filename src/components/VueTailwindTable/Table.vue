<template>
  <main>
    <section class="border border-gray-200 rounded-lg overflow-auto">
      <table class="w-full divide-y divide-gray-200">
        <thead :class="theadClass" class="bg-gray-100">
        <slot name="head" :data="headers">
          <Row>
            <Cell @click="sorted && sort(value)" td-class="text-left text-xs font-medium uppercase tracking-wider"
                  v-for="(value, key) in headers" :key="key">{{ value }}
            </Cell>
          </Row>
        </slot>
        </thead>
        <tbody :class="tbodyClass" class="bg-white divide-y divide-gray-200">
        <slot name="row" :data="paginatedData">
          <Row v-if="paginatedData.length > 0" v-for="(row, index) in paginatedData" :key="index" :index="index"
               :tr-class="trClass" :striped="striped">
            <Cell :td-class="tdClass" v-for="(value, key) in row" :value="value" :key="key">{{ value }}</Cell>
          </Row>
        </slot>
        <tr v-if="paginatedData.length === 0">
          <td colspan="100%">
            <div class="w-full px-6 py-4 flex justify-center whitespace-nowrap text-gray-500">
              Data not found
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section v-if="paginated" class="mt-3">
      <VueTailwindPagination :current="_currentPage" :total="filteredData.length" :per-page="perPage" @page-changed="_currentPage = $event"/>
    </section>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Row from './Row.vue'
import Cell from './Cell.vue'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'

export default defineComponent({
  name: 'Table',
  components: {Row, Cell, VueTailwindPagination},
  props: {
    data: Array,
    headers: Array,
    theadClass: String,
    tbodyClass: String,
    trClass: String,
    tdClass: String,
    striped: Boolean,
    sorted: Boolean,
    currentSort: String,
    currentSortDir: {
      type: String,
      default: 'asc'
    },
    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 5
    },
    filter: String
  },
  data() {
    return {
      _currentPage: this.currentPage,
      _currentSort: this.currentSort,
      _currentSortDir: this.currentSortDir
    }
  },
  methods: {
    sort(s) {
      if (s === this._currentSort) {
        this._currentSortDir = this._currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this._currentSort = s;
    }
  },
  computed: {
    sortedData() {
      return this.sorted ? this.data.sort((a, b) => {
        let modifier = 1
        if (this._currentSortDir === 'desc') modifier = -1
        if (a[this._currentSort] < b[this._currentSort]) return -1 * modifier
        if (a[this._currentSort] > b[this._currentSort]) return 1 * modifier
        return 0
      }) : this.data
    },
    filteredData() {
      return this.sortedData.filter(row => Object.values(row).filter(value => value.toString().toLowerCase().includes(this.filter.toLowerCase())).length > 0)
    },
    paginatedData() {
      return this.paginated ? this.filteredData.filter((row, index) => {
        let start = (this._currentPage - 1) * this.perPage
        let end = this._currentPage * this.perPage
        if (index >= start && index < end) return true
      }) : this.filteredData
    }
  }
})
</script>

<style scoped>
</style>