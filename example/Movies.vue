<template>
  <main class="w-full min-h-screen bg-blue-50">
    <div class="w-full p-5">
      <TabsWrapper>
        <Tab title="Tab 1" :isActive="activeTab === 'tab1'" @click="clickTab('tab1')"/>
        <Tab title="Tab 2" :isActive="activeTab === 'tab2'" @click="clickTab('tab2')"/>
        <Tab title="Tab 3" :isActive="activeTab === 'tab3'" @click="clickTab('tab3')"/>
      </TabsWrapper>
      <TabsContent>
        <div v-if="activeTab === 'tab1'">
          <Table
              remote
              :columns="columns"
              :rows="rows"

              sorted
              current-sort="vote_count"
              current-sort-dir="desc"
              @sort="onSort"

              paginated
              :per-page="20"
              :total-count="totalCount"
              @page-changed="currentPage = $event">
            <template v-slot:row="props">
              <Row v-for="(row, index) in props.data" :key="index" :index="index" striped>
                <Cell>{{ row.original_title }}</Cell>
                <Cell>
                  <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                    {{ row.vote_average }}
                  </span>
                </Cell>
                <Cell>{{ row.vote_count }}</Cell>
                <Cell>{{ row.release_date }}</Cell>
                <Cell td-class="whitespace-pre-wrap">{{ truncateString(row.overview, 80) }}</Cell>
              </Row>
            </template>
          </Table>
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
import axios from 'axios'
import {Tab, TabsContent, TabsWrapper} from '@ocrv/vue-tailwind-tabs'
import {Cell, Row, Table} from '../src/components/VueTailwindTable'
import {ApiKey, ApiPath, ApiUrl} from "./network"
import utils from './utils'

export default defineComponent({
  name: 'Table Example',
  mixins: [utils],
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
      columns: [
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Vote Average',
          field: 'vote_average',
        },
        {
          label: 'Vote Count',
          field: 'vote_count',
        },
        {
          label: 'Release Date',
          field: 'release_date',
        },
        {
          label: 'Overview',
          field: 'overview',
        }
      ],
      rows: [],
      currentPage: 1,
      totalCount: 20,
      sortField: 'vote_count',
      sortOrder: 'desc'
    }
  },
  mounted() {
    this.fetchMoviesData()
  },
  watch: {
    currentPage() {
      this.fetchMoviesData()
    }
  },
  methods: {
    clickTab(name) {
      this.activeTab = name
    },
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.fetchMoviesData()
    },
    fetchMoviesData() {
      const params = {
        page: this.currentPage,
        sort_by: `${this.sortField}.${this.sortOrder}`,
        api_key: ApiKey
      }

      return axios.get(ApiUrl + ApiPath, {params})
          .then(response => {
            this.totalCount = response.data.total_results
            this.rows = response.data.results
          })
          .catch(e => console.log)
    }
  }
})
</script>

<style scoped>
</style>