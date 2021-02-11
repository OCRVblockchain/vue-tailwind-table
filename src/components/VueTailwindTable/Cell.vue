<template>
  <td :class="tdClass" class="px-6 py-4 whitespace-nowrap text-gray-500 first:rounded-l-lg last:rounded-r-lg">
    <slot></slot>
  </td>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Table Cell',
  props: {
    tdClass: String
  }
})
</script>

<style scoped>
</style>