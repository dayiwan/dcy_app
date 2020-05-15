<template>
  <div class="main font-style">
    <el-divider></el-divider>
    <el-row>
      <el-tabs type="border-card" @tab-click="changeTab" v-model="activeName">
        <el-tab-pane
          v-for="(item, index) in themeList"
          :key="index"
          :label="item.name"
          :name="item.name"
        >
          <el-row>
            <el-table :data="dataList" style="width: 100%">
              <el-table-column align="left">
                <template slot-scope="scope" width="180">
                  <el-row class="h1">{{ scope.row._source.title }}</el-row>
                  <el-row>{{
                    scope.row._source.body.length > 300
                      ? scope.row._source.body.substring(0, 290) + '...'
                      : scope.row._source.body
                  }}</el-row>
                </template>
              </el-table-column>
              <el-table-column align="left" width="200">
                <template slot-scope="scope">
                  <el-row>发布时间：{{ scope.row._source.create_time }}</el-row>
                  <el-row
                    >采集时间：{{
                      formatdata(scope.row._source.collect_date)
                    }}</el-row
                  >
                  <el-row>来源：{{ scope.row._source.source }}</el-row>
                </template>
              </el-table-column>
              <el-table-column align="left" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="queryOrigin(scope.row._source.url)"
                    >查看原文</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-bottom:20px"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pagesize"
              :current-page="currentPage"
              @current-change="currentChange"
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Divider,
  Tabs,
  TabPane,
  Image,
  Table,
  TableColumn,
  Link
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import { Report } from '@/actions'
const { getList } = Report
Vue.use(Button)
Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Link)
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      pagesize: 5,
      dataList: [],
      activeName: '贵阳',
      themeList: [
        {
          name: '贵阳'
        },
        {
          name: '遵义'
        },
        {
          name: '六盘水'
        },
        {
          name: '铜仁'
        },
        {
          name: '毕节'
        },
        {
          name: '黔西南'
        },
        {
          name: '黔东南'
        },
        {
          name: '黔南'
        },
        {
          name: '贵安新区'
        }
      ]
    }
  },
  mounted() {
    console.log(moment())
    this.initList()
  },
  methods: {
    formatdata(data) {
      return moment(data).format('YYYY-MM-DD')
    },
    async initList() {
      let params = {
        query: {
          bool: {
            must: {
              match_phrase: {
                subject: '地区新闻-' + this.activeName
              }
            }
          }
        },
        from: this.from_a,
        size: this.pagesize
      }
      let result = await getList(params)
      console.log(result)
      this.dataList = result.hits.hits
      this.total = result.hits.total
      this.dataShow = true
    },
    async queryOrigin(url) {
      window.open(url)
    },
    async currentChange(v) {
      console.log(v)
      this.currentPage = v
      if (v === 1) {
        this.from_a = 0
        this.initList()
      } else {
        this.from_a = v * 5 - 5
        this.initList()
      }
    },
    async changeTab() {
      console.log(this.activeName)
      this.currentPage = 1
      this.from_a = 0
      this.initList()
      // this.updateTable(this.currentTheme);
    }
  }
}
</script>

<style lang="scss">
.h1 {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font: 20px Extra large;
  font-weight: 700; //加粗
}
.h2 {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font: 18px large;
}
.font-style {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font: 14px Base;
}
</style>
