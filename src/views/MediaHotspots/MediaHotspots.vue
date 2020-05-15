<template>
  <div class="main font-style">
    <el-divider></el-divider>
    <el-row>
      <el-image style="width: 500px;" src="https://tse1-mm.cn.bing.net/th/id/OIP.NZOFjT7KkMwPEB9cOmmmrAHaEr"></el-image>
    </el-row>

    <el-row>
      <el-col v-for="(item,index) in hotspotList" :key="index" :span="2" align="left">
        <template>
          <el-link type="primary" @click="updateTable(item.name)">{{item.name}}</el-link>
          <i class="el-icon-top" v-if="item.trend=='up'"></i>
          <i class="el-icon-bottom" v-if="item.trend=='down'"></i>
        </template>
        <el-divider direction="vertical"></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="dataList" style="width: 100%">
        <el-table-column align="left">
          <template slot-scope="scope" width="180">
            <el-row class="h1">{{scope.row.title}}</el-row>
            <el-row>{{scope.row.content.length>300?scope.row.content.substring(0,290)+"...":scope.row.content}}</el-row>
          </template>
        </el-table-column>
        <el-table-column align="left" width="200">
          <template slot-scope="scope">
            <el-row>发布时间：{{scope.row.publicTime}}</el-row>
            <el-row>采集时间：{{scope.row.collectTime}}</el-row>
            <el-row>来源：{{scope.row.source}}</el-row>
          </template>
        </el-table-column>
        <el-table-column align="left" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="queryOrigin(scope.row.url)">查看原文</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
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
} from "element-ui";
import xijinpingImg from "@/assets/leaders/xijinping.jpg";
import likeqiangImg from "@/assets/leaders/likeqiang.jpg";
import lizhanshuImg from "@/assets/leaders/lizhanshu.jpg";
import wangyangImg from "@/assets/leaders/wangyang.jpg";
import wanghuningImg from "@/assets/leaders/wanghuning.jpg";
import zhaolejiImg from "@/assets/leaders/zhaoleji.jpg";
import hanzhengImg from "@/assets/leaders/hanzheng.jpg";
import sunzhigangImg from "@/assets/leaders/sunzhigang.jpg";
import chenyiqinImg from "@/assets/leaders/chenyiqin.jpg";
import xiahongminImg from "@/assets/leaders/xiahongmin.jpg";
import liyifeiImg from "@/assets/leaders/liyifei.jpg";
import shiguanghuiImg from "@/assets/leaders/shiguanghui.jpg";
import luyongzhengImg from "@/assets/leaders/luyongzheng.jpg";
import zhaodemingImg from "@/assets/leaders/zhaodeming.jpg";
import liujieImg from "@/assets/leaders/liujie.jpg";
import lizaiyongImg from "@/assets/leaders/lizaiyong.jpg";
import longchangchunImg from "@/assets/leaders/longchangchun.jpg";
import yanchaojunImg from "@/assets/leaders/yanchaojun.jpg";
import wangyanyongImg from "@/assets/leaders/wangyanyong.jpg";
import { Report } from '@/actions'
const { getList } = Report
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Button);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Image);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
export default {
  data() {
    return {
      dataList: [],
      subject_a:'',
      hotspotList: [
        {
          name: "新冠肺炎",
          trend: "up"
        },
        {
          name: "复工复产",
          trend: "up"
        },
        {
          name: "贸易战",
          trend: "down"
        },
        {
          name: "新基建",
          trend: "up"
        },
        {
          name: "新冠肺炎",
          trend: "up"
        },
        {
          name: "复工复产",
          trend: "up"
        },
        {
          name: "贸易战",
          trend: "down"
        },
        {
          name: "新基建",
          trend: "up"
        },
        {
          name: "贸易战",
          trend: "down"
        },
        {
          name: "新基建",
          trend: "up"
        }
      ],

      mockData: [
        {
          title: "习近平同葡萄牙总统德索萨通电话",
          content:
            "新华社北京5月7日电  国家主席习近平5月7日晚同葡萄牙总统德索萨通电话。习近平强调，新冠肺炎疫情发生后，你来函向中国人民表达慰问，我对此表示感谢。中葡同心共济，中方坚定支持葡方抗击疫情的努力，愿继续提供力所能及的帮助，积极协助葡方在华采购运输医疗物资。希望疫情过后，双方深化各领域合作，推进共建“一带一路”，探索公共卫生等领域三方合作，推动中葡全面战略伙伴关系得到更大发展。我珍视同你的友谊，愿同你...",
          publicTime: "2020年5月7日",
          collectTime: "2020年5月7日",
          source: "人民网",
          url: "http://www.baidu.com"
        },
        {
          title: "习近平同葡萄牙总统德索萨通电话",
          content:
            "新华社北京5月7日电  国家主席习近平5月7日晚同葡萄牙总统德索萨通电话。习近平强调，新冠肺炎疫情发生后，你来函向中国人民表达慰问，我对此表示感谢。中葡同心共济，中方坚定支持葡方抗击疫情的努力，愿继续提供力所能及的帮助，积极协助葡方在华采购运输医疗物资。希望疫情过后，双方深化各领域合作，推进共建“一带一路”，探索公共卫生等领域三方合作，推动中葡全面战略伙伴关系得到更大发展。我珍视同你的友谊，愿同你...",
          publicTime: "2020年5月7日",
          collectTime: "2020年5月7日",
          source: "人民网",
          url: "http://www.baidu.com"
        },
        {
          title: "习近平同葡萄牙总统德索萨通电话",
          content:
            "新华社北京5月7日电  国家主席习近平5月7日晚同葡萄牙总统德索萨通电话。习近平强调，新冠肺炎疫情发生后，你来函向中国人民表达慰问，我对此表示感谢。中葡同心共济，中方坚定支持葡方抗击疫情的努力，愿继续提供力所能及的帮助，积极协助葡方在华采购运输医疗物资。希望疫情过后，双方深化各领域合作，推进共建“一带一路”，探索公共卫生等领域三方合作，推动中葡全面战略伙伴关系得到更大发展。我珍视同你的友谊，愿同你...",
          publicTime: "2020年12月30日",
          collectTime: "2020年5月7日",
          source: "人民网",
          url: "http://www.baidu.com"
        },
        {
          title: "习近平同葡萄牙总统德索萨通电话",
          content:
            "新华社北京5月7日电  国家主席习近平5月7日晚同葡萄牙总统德索萨通电话。习近平强调，新冠肺炎疫情发生后，你来函向中国人民表达慰问，我对此表示感谢。中葡同心共济，中方坚定支持葡方抗击疫情的努力，愿继续提供力所能及的帮助，积极协助葡方在华采购运输医疗物资。希望疫情过后，双方深化各领域合作，推进共建“一带一路”，探索公共卫生等领域三方合作，推动中葡全面战略伙伴关系得到更大发展。我珍视同你的友谊，愿同你...",
          publicTime: "2020年5月7日",
          collectTime: "2020年5月7日",
          source: "人民网",
          url: "http://www.baidu.com"
        }
      ]
    };
  },
  mounted() {
    this.initList()
    // this.dataList = this.mockData;
    this.dataShow = true;
  },
  methods: {
     async initList() {
      let params = {
        query: {
          bool: {
            must: {
              match_phrase: {
                subject: this.subject_a
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
    async updateTable(value) {
      this.dataLoading = true;
      this.dataList = [];
      console.log(value);
      this.dataList = this.mockData;
      this.dataShow = true;
      this.dataLoading = false;
    },
    async queryOrigin(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss">
.h1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: 20px Extra large;
  font-weight: 700; //加粗
}
.h2 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: 18px large;
}
.font-style {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: 14px Base;
}
.el-col-2{
  display: flex;
  align-items: center
}
</style>
