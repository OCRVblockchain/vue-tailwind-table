<template>
  <main>
    <section v-if="filtered" class="mb-3 p-3 rounded-lg border border-gray-200">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input v-model="search" class="pl-2 w-full outline-none text-gray-500" type="text" placeholder="Поиск">
      </div>
    </section>
    <section class="border border-gray-200 rounded-lg overflow-auto">
      <table class="w-full divide-y divide-gray-200">
        <thead :class="theadClass" class="bg-gray-100">
        <slot name="head" :data="columns">
          <Row>
            <Cell @click="sorted && sort(value)" td-class="text-left text-xs font-medium uppercase tracking-wider"
                  v-for="(value, key) in columns" :key="key">{{ value }}
            </Cell>
          </Row>
        </slot>
        </thead>
        <tbody :class="tbodyClass" class="bg-white divide-y divide-gray-200">
        <slot name="row" :data="computedData">
          <Row v-if="computedData.length > 0" v-for="(row, index) in computedData" :key="index" :index="index"
               :tr-class="trClass" :striped="striped">
            <Cell :td-class="tdClass" v-for="(col, index) in columns" :value="row[col]" :key="index">
              {{ row[col] }}
            </Cell>
          </Row>
        </slot>
        <tr v-if="computedData.length === 0">
          <td colspan="100%">
            <div class="w-full px-6 py-4 flex justify-center whitespace-nowrap text-gray-500">
              Data not found
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section v-if="paginated" class="mt-3 overflow-auto">
      <VueTailwindPagination :current="_currentPage" :total="remote ? totalCount : filteredData.length"
                             :per-page="perPage" @page-changed="changePage($event)"/>
    </section>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
import Row from './Row.vue'
import Cell from './Cell.vue'
import { Data } from './types'

export default defineComponent({
  name: 'VueTailwindTable__Table',
  components: {Row, Cell, VueTailwindPagination},
  props: {
    remote: Boolean,

    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },

    theadClass: String,
    tbodyClass: String,
    trClass: String,
    tdClass: String,

    striped: Boolean,
    filtered: Boolean,

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
    totalCount: {
      type: Number,
      default: 20
    },
    perPage: {
      type: Number,
      default: 5
    }
  },
  data(): Data {
    return {
      _currentPage: this.currentPage,
      _currentSort: this.currentSort,
      _currentSortDir: this.currentSortDir,
      search: ''
    }
  },
  methods: {
    sort(s: string): void {
      if (s === this._currentSort) {
        this._currentSortDir = this._currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this._currentSort = s;
      this.$emit('sort', this._currentSort, this._currentSortDir)
    },
    changePage($event: any): void {
      this._currentPage = $event
      this.$emit('page-changed', $event)
    }
  },
  computed: {
    sortedData(): object[] {
      return this.sorted ? this.data.sort((a, b) => {
        let modifier = 1
        if (this._currentSortDir === 'desc') modifier = -1
        if (a[this._currentSort] < b[this._currentSort]) return -1 * modifier
        if (a[this._currentSort] > b[this._currentSort]) return 1 * modifier
        return 0
      }) : this.data
    },
    filteredData(): object[] {
      return this.sortedData.filter(row => Object.values(row).filter(value => value.toString().toLowerCase().includes(this.search.toLowerCase())).length > 0)
    },
    paginatedData(): object[] {
      return this.paginated ? this.filteredData.filter((row, index) => {
        let start = (this._currentPage - 1) * this.perPage
        let end = this._currentPage * this.perPage
        if (index >= start && index < end) return true
      }) : this.filteredData
    },
    computedData(): object[] {
      return this.remote ? this.data : this.paginatedData
    }
  }
})
</script>

<style scoped>
</style>