<template>
  <div class="main font-style">
    <el-divider></el-divider>
    <el-row>
      <el-tabs
        v-model="activeName"
        value="first"
        type="card"
        @tab-click="changeTab"
      >
        <el-tab-pane label="中央领导" name="first">
          <el-row>
            <el-col :span="12">
              <el-col
                :span="3"
                v-for="(leader, index) in centerLeadersList"
                :key="index"
              >
                <div>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="leader.img"
                    fit="contain"
                  ></el-image>
                </div>
                <div>
                  <el-link
                    type="primary"
                    class="title1"
                    @click="updateTable(leader.name)"
                    >{{ leader.name }}</el-link
                  >
                </div>
              </el-col>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="贵州省领导" name="second">
          <el-row>
            <el-col :span="9">
              <el-col
                :span="4"
                v-for="(leader, index) in guizhouLeadersList"
                :key="index"
              >
                <div>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="leader.img"
                    fit="contain"
                  ></el-image>
                </div>
                <div>
                  <el-link
                    type="primary"
                    class="title1"
                    @click="updateTable(leader.name)"
                    >{{ leader.name }}</el-link
                  >
                </div>
              </el-col>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="地州市领导" name="third">
          <el-row>
            <el-col :span="8">
              <el-table :data="cityLeadersList" style="width: 100%">
                <el-table-column
                  prop="city"
                  label="地名"
                  align="center"
                ></el-table-column>
                <el-table-column prop="secretary" label="书记" align="center">
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      class="title1"
                      @click="updateTable(scope.row.secretary, scope.row.city)"
                      >{{ scope.row.secretary }}</el-link
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mayor"
                  label="市（区、州）长行署专员"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      class="title1"
                      @click="updateTable(scope.row.mayor, scope.row.city)"
                      >{{ scope.row.mayor }}</el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="区县领导" name="fourth">暂无</el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <el-table
        :data="dataList"
        style="width: 100%"
        v-show="dataShow"
        v-loading="dataLoading"
      >
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
import xijinpingImg from '@/assets/leaders/xijinping.jpg'
import likeqiangImg from '@/assets/leaders/likeqiang.jpg'
import lizhanshuImg from '@/assets/leaders/lizhanshu.jpg'
import wangyangImg from '@/assets/leaders/wangyang.jpg'
import wanghuningImg from '@/assets/leaders/wanghuning.jpg'
import zhaolejiImg from '@/assets/leaders/zhaoleji.jpg'
import hanzhengImg from '@/assets/leaders/hanzheng.jpg'
import sunzhigangImg from '@/assets/leaders/sunzhigang.jpg'
import chenyiqinImg from '@/assets/leaders/chenyiqin.jpg'
import xiahongminImg from '@/assets/leaders/xiahongmin.jpg'
import liyifeiImg from '@/assets/leaders/liyifei.jpg'
import shiguanghuiImg from '@/assets/leaders/shiguanghui.jpg'
import luyongzhengImg from '@/assets/leaders/luyongzheng.jpg'
import zhaodemingImg from '@/assets/leaders/zhaodeming.jpg'
import liujieImg from '@/assets/leaders/liujie.jpg'
import lizaiyongImg from '@/assets/leaders/lizaiyong.jpg'
import longchangchunImg from '@/assets/leaders/longchangchun.jpg'
import yanchaojunImg from '@/assets/leaders/yanchaojun.jpg'
import wangyanyongImg from '@/assets/leaders/wangyanyong.jpg'
import moment from 'moment'
import { Report } from '@/actions'
const { getList } = Report
import 'element-ui/lib/theme-chalk/index.css'

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
      from_a: 0,
      activeName: 'first',
      dataList: [],
      dataShow: false,
      dataLoading: false,
      main_a: '中央领导',
      name_a: '习近平',
      centerLeadersList: [
        {
          name: '习近平',
          img: xijinpingImg
        },
        {
          name: '李克强',
          img: likeqiangImg
        },
        {
          name: '栗战书',
          img: lizhanshuImg
        },
        {
          name: '汪洋',
          img: wangyangImg
        },
        {
          name: '王沪宁',
          img: wanghuningImg
        },
        {
          name: '赵乐际',
          img: zhaolejiImg
        },
        {
          name: '韩正',
          img: hanzhengImg
        }
      ],
      guizhouLeadersList: [
        {
          name: '孙志刚',
          img: sunzhigangImg
        },
        {
          name: '谌贻琴',
          img: chenyiqinImg
        },
        {
          name: '夏红民',
          img: xiahongminImg
        },
        {
          name: '李邑飞',
          img: liyifeiImg
        },
        {
          name: '时光辉',
          img: shiguanghuiImg
        },
        {
          name: '卢雍政',
          img: luyongzhengImg
        },
        {
          name: '赵德明',
          img: zhaodemingImg
        },
        {
          name: '刘捷',
          img: liujieImg
        },
        {
          name: '李再勇',
          img: lizaiyongImg
        },
        {
          name: '龙长春',
          img: longchangchunImg
        },
        {
          name: '严朝君',
          img: yanchaojunImg
        },
        {
          name: '王艳勇',
          img: wangyanyongImg
        }
      ],
      cityLeadersList: [
        {
          city: '贵阳',
          secretary: '赵德明',
          mayor: '陈晏'
        },
        {
          city: '遵义',
          secretary: '魏树旺',
          mayor: '黄伟'
        },
        {
          city: '六盘水',
          secretary: '王忠',
          mayor: '李刚'
        },
        {
          city: '安顺',
          secretary: '陈训华',
          mayor: '宋晓路'
        },
        {
          city: '铜仁',
          secretary: '陈昌旭',
          mayor: '陈少荣'
        },
        {
          city: '毕节',
          secretary: '周建琨',
          mayor: '张集智'
        },
        {
          city: '黔西南',
          secretary: '刘文新',
          mayor: '杨永英'
        },
        {
          city: '黔东南',
          secretary: '桑维亮',
          mayor: '罗强'
        },
        {
          city: '黔南',
          secretary: '唐德智',
          mayor: '吴胜华'
        },
        {
          city: '贵安新区',
          secretary: '赵德明',
          mayor: '陈晏'
        }
      ]
    }
  },
  mounted() {
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
                subject: this.main_a + '-' + this.name_a
              }
            }
          }
        },
        from: this.from_a,
        size: this.pagesize
      }
      let result = await getList(params)
      this.dataList = result.hits.hits
      this.total = result.hits.total
      this.dataShow = true
    },
    // 点击名称更新mock数据
    async updateTable(name, city) {
      if (city === '' || city === undefined) {
        this.currentPage = 1
        this.from_a = 0
        this.name_a = name
        this.initList()
      } else {
        this.currentPage = 1
        this.from_a = 0
        this.name_a = city + '-' + name
        this.initList()
      }
    },
    //点击查看原文
    async queryOrigin(url) {
      window.open(url)
    },
    async currentChange(v) {
      this.currentPage = v
      if (v === 1) {
        this.from_a = 0
        this.initList()
      } else {
        this.from_a = v * 5 - 5
        this.initList()
      }
    },
    // 点击tab
    async changeTab() {
      this.currentPage = 1
      this.from_a = 0
      //判断不同的tab拉出初始化的列表
      if (this.activeName === 'first') {
        this.main_a = '中央领导'
        this.name_a = '习近平'
        this.initList()
        this.dataShow = true
      } else if (this.activeName === 'second') {
        this.main_a = '贵州省领导'
        this.name_a = '孙志刚'
        this.initList()
        this.dataShow = true
      } else if (this.activeName === 'third') {
        this.main_a = '地州市领导'
        this.name_a = '贵阳-赵德明'
        this.initList()
        this.dataShow = true
      } else {
        this.main_a = '区县领导'
        this.dataList = []
      }
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
