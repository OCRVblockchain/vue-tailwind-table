<template>
  <div class="px-5 py-5">
    <Table :data="data" :headers="headers" striped sorted>
      <template v-slot:row="props">
        <Row v-for="(row, index) in props.data" :key="index" :index="index" striped>
          <Cell>{{ row.name }}</Cell>
          <Cell>{{ row.email }}</Cell>
          <Cell>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ row.status }}
            </span>
          </Cell>
          <Cell>{{ row.sales }}</Cell>
        </Row>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { Table, Row, Cell } from './VueTailwindTable/index.ts'

export default defineComponent({
  name: 'Table Example',
  components: {
    Table,
    Row,
    Cell
  },
  data() {
    return {
      headers: ['name', 'email', 'status', 'sales'],
      data: [
        {
          name: 'Alfonso Bribiesca',
          email: 'alfonso@vexilo.com',
          status: 'active',
          sales: 9999
        },
        {
          name: 'Saida Redondo',
          email: 'saida@gmail.com',
          status: 'active',
          sales: 1500
        },
        {
          name: 'Regina Bribiesca',
          email: 'regina@gmail.com',
          status: 'active',
          sales: -200.50
        },
        {
          name: 'Ricardo Martinez',
          email: 'rickyrickky@gmail.com',
          status: 'active',
          sales: 0.0
        }
      ]
    }
  },
  methods: {}
})
</script>

<style scoped>
</style>