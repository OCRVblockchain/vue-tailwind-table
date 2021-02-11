<template>
  <table class="w-full">
    <thead :class="theadClass" class="bg-gray-100">
    <slot name="head" :data="headers">
      <Row>
        <Cell @click="sorted && sort(value)" td-class="text-left text-xs font-medium uppercase tracking-wider" v-for="(value, key) in headers" :key="key">{{ value }}</Cell>
      </Row>
    </slot>
    </thead>
    <tbody :class="tbodyClass" class="bg-white">
    <slot name="row" :data="sorted ? sortedData : data">
      <Row v-for="(row, index) in sortedData" :key="index" :index="index" :tr-class="trClass" :striped="striped">
        <Cell :td-class="tdClass" v-for="(value, key) in row" :value="value" :key="key">{{ value }}</Cell>
      </Row>
    </slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Row from './Row.vue'
import Cell from './Cell.vue'

export default defineComponent({
  name: 'Table',
  components: { Row, Cell },
  props: {
    data: Array,
    headers: Array,
    theadClass: String,
    tbodyClass: String,
    trClass: String,
    tdClass: String,
    striped: Boolean,
    sorted: Boolean
  },
  data() {
    return {
      currentSort: '',
      currentSortDir: 'asc'
    }
  },
  methods: {
    sort:function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    sortedData: function() {
      return this.data.sort((a,b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  }
})
</script>

<style scoped>
</style>