<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <div class="card-panel">
            <div class="card-count">
              当前物联卡总数:<count-to
                :start-val="0"
                :end-val="102400"
                :duration="2600"
                class="card-panel-num"
              />
              张
            </div>
            <div class="shop-btn">
              <el-button
                icon="el-icon-shopping-cart-full"
                type="primary"
              >购卡</el-button>
            </div>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="title_wrapper">物联卡状态统计</div>
          <line-chart :height="'300px'" :chart-data="lineChartData" />
        </div>
        <div class="chart-wrapper">
          <div class="title_wrapper">预警信息统计</div>
          <bar-chart :height="'280px'" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div class="title_wrapper">公告栏</div>
          <pie-chart :height="'412px'" />
        </div>
        <div class="chart-wrapper">
          <div class="title_wrapper">物联卡计费状态统计</div>
          <raddar-chart :height="'280px'" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import CountTo from 'vue-count-to'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    CountTo
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    // padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .title_wrapper {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 16px;
    color: #333;
    font-weight: bold;
  }
  .card-panel {
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #333;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 16px;
    .shop-btn {
      .el-button {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
