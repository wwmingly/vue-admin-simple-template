<template>
  <div class="com_tree">
    <el-input v-model="filterText" placeholder="请输入" />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="data"
      :props="props"
      v-bind="$attrs"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
export default {
  name: 'ComTree',
  props: {
    props: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(node) {
      this.$emit('node-click', node)
    }
  }
}
</script>
<style lang="scss" scoped>
// .com_tree::v-deep {
//   .el-tree > .el-tree-node:after {
//     border-top: none;
//   }
//   .el-tree-node {
//     position: relative;
//     padding-left: 16px;
//   }
//   //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
//   .el-tree-node__expand-icon.is-leaf {
//     display: none;
//   }
//   .el-tree-node__children {
//     padding-left: 16px;
//   }

//   .el-tree-node :last-child:before {
//     height: 38px;
//   }

//   .el-tree > .el-tree-node:before {
//     border-left: none;
//   }

//   .el-tree > .el-tree-node:after {
//     border-top: none;
//   }

//   .el-tree-node:before {
//     content: '';
//     left: -4px;
//     position: absolute;
//     right: auto;
//     border-width: 1px;
//   }

//   .el-tree-node:after {
//     content: '';
//     left: -4px;
//     position: absolute;
//     right: auto;
//     border-width: 1px;
//   }

//   .el-tree-node:before {
//     border-left: 1px dashed #4386c6;
//     bottom: 0px;
//     height: 100%;
//     top: -26px;
//     width: 1px;
//   }

//   .el-tree-node:after {
//     border-top: 1px dashed #4386c6;
//     height: 20px;
//     top: 12px;
//     width: 24px;
//   }
// }
</style>
