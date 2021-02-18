<template>
  <Movies />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Movies from "../example/Movies.vue";

export default defineComponent({
  name: 'App',
  components: { Movies }
})
</script>