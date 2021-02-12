<template>
  <tr :class="striped && (index+1) % 2 === 0 ? 'bg-gray-50' : trClass" class="divide-x divide-gray-200">
    <slot/>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Table Row',
  props: {
    index: Number,
    trClass: String,
    striped: Boolean
  }
})
</script>

<style scoped>
</style>