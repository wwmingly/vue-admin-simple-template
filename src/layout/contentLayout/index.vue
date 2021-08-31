<template>
  <div class="container">
    <el-row :gutter="12">
      <el-col
        v-if="$slots.tree"
        :xs="24"
        :sm="8"
        :lg="4"
        class="scrollbar left_container"
      >
        <slot name="tree" />
      </el-col>
      <el-col :xs="24" :sm="$slots.tree ? 16 : 24" :lg="$slots.tree ? 20 : 24">
        <div class="main_container">
          <div v-if="$slots.search" class="search_container">
            <slot name="search" />
          </div>
          <div v-if="$slots.table" class="table_container">
            <slot name="table" />
          </div>
        </div>
        <el-footer class="footer_content">
          <div class="pull-right">
            Copyright © 2020 深圳市新国都末微技术服务有限公司
            <a target="_blank" href="http://www.beian.miit.gov.cn/">
              粤ICP备18023502号-1
            </a>
            2021
            <a href="javascript:void(0);">新微物联管理平台</a>
          </div>
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ContentLayout',
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    console.log(this.$slots)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/scrollbar.scss';
.container {
  height: 100%;
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    height: 100%;
    .el-col {
      height: 100%;
      overflow: auto;
      padding: 0 !important;
    //   position: relative;
      &.left_container {
        border-right: 1px solid $comBorder;
        padding: 16px !important;
      }
    }
  }
  .search_container,
  .table_container {
    box-sizing: border-box;
    padding: 16px;
  }
  .search_container {
    min-height: 100px;
    border-bottom: 1px solid $comBorder;
  }
  .main_container{
      height: calc(100% - 61px);
      overflow-y: auto;
      overflow-x: hidden;
  }
  .footer_content {
    height: 60px !important;
    line-height: 60px;
    z-index: 1001;
    background: #fff;
    border-top: 1px solid $comBorder;
    box-sizing: border-box;
    color: #676a6c;
    font-size: 12px;
    .pull-right {
      float: right;
      a {
        color: #337ab7;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
