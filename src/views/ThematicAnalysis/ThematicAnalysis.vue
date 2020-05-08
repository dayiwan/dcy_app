<template>
  <div class="main font-style">
    <el-divider></el-divider>
    <el-row>
      <el-tabs type="border-card" @tab-click="changeTab" v-model="currentTheme">
        <el-tab-pane
          v-for="(item,index) in themeList"
          :key="index"
          :label="item.name"
          :name="item.name"
        >
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
        </el-tab-pane>
      </el-tabs>
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
      currentTheme: "",
      themeList: [
        {
          name: "复工复产"
        },
        {
          name: "新基建"
        },
        {
          name: "脱贫攻坚"
        },
        {
          name: "全国人民代表大会"
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
  mounted() {},
  methods: {
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
    },
    async changeTab() {
      this.updateTable(this.currentTheme);
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
</style>