<template>
  <main class="min-w-min min-h-screen bg-blue-50">
    <div class="p-5">
      <TabsWrapper>
        <Tab title="Tab 1" :isActive="activeTab === 'tab1'" @click="clickTab('tab1')"/>
        <Tab title="Tab 2" :isActive="activeTab === 'tab2'" @click="clickTab('tab2')"/>
        <Tab title="Tab 3" :isActive="activeTab === 'tab3'" @click="clickTab('tab3')"/>
      </TabsWrapper>
      <TabsContent>
        <div v-if="activeTab === 'tab1'">
          <section class="p-3 rounded-lg border border-gray-200">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input v-model="search" class="pl-2 w-full outline-none text-gray-500" type="text" placeholder="Поиск">
            </div>
          </section>
          <section class="mt-3">
            <Table :data="data" :headers="headers" :filter="search" sorted paginated :per-page="2">
              <template v-slot:row="props">
                <Row v-for="(row, index) in props.data" :key="index" :index="index" striped>
                  <Cell>{{ row.name }}</Cell>
                  <Cell>{{ row.email }}</Cell>
                  <Cell>
                    <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                      {{ row.status }}
                    </span>
                  </Cell>
                  <Cell>{{ row.sales }}</Cell>
                </Row>
              </template>
            </Table>
          </section>
        </div>
        <div v-if="activeTab === 'tab2'">
          Aspernatur cupiditate, dolorum earum eius ex facilis!
        </div>
        <div v-if="activeTab === 'tab3'">
          Deserunt ducimus explicabo facere ipsam.
        </div>
      </TabsContent>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Cell, Row, Table} from './VueTailwindTable/index.ts'
import {Tab, TabsContent, TabsWrapper} from '@ocrv/vue-tailwind-tabs'

export default defineComponent({
  name: 'Table Example',
  components: {
    TabsWrapper,
    TabsContent,
    Tab,
    Table,
    Row,
    Cell
  },
  data() {
    return {
      activeTab: 'tab1',
      search: '',
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
  methods: {
    clickTab(name) {
      this.activeTab = name
    }
  }
})
</script>

<style scoped>
</style>