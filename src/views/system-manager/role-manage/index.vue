<template>
  <ContentLayout>
    <template slot="tree">
      <ComTree :data="data" :props="defaultProps" default-expand-all />
    </template>
    <template slot="search">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="12">
          <comFormitem label="角色管理" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入"
              class="col_form_item"
            />
          </comFormitem>
          <comFormitem label="活动名称2" prop="name">
            <el-input v-model="ruleForm.name" class="col_form_item" />
          </comFormitem>
          <comFormitem label="活动名称2" prop="name">
            <el-input v-model="ruleForm.name" class="col_form_item" />
          </comFormitem>
          <comFormitem label="活动名称2" prop="name">
            <el-input v-model="ruleForm.name" class="col_form_item" />
          </comFormitem>
          <comFormitem label="活动区域" prop="region">
            <el-select
              v-model="ruleForm.region"
              class="col_form_item"
              filterable
              clearable
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </comFormitem>
          <comFormitem label-width="0" :len="5" class="form_group_btns">
            <el-button
              icon="el-icon-refresh"
              @click="resetForm('ruleForm')"
            >重置</el-button>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitForm('ruleForm')"
            >查询</el-button>
          </comFormitem>
        </el-row>
      </el-form>
    </template>
    <template slot="table">
      <el-row class="table_top">
        <el-col :span="12">
          <div class="table_title">
            <span>列表数据 </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="table_btns">
            <el-button icon="el-icon-upload2">导出</el-button>
            <el-button type="primary" icon="el-icon-plus">新建</el-button>
          </div>
        </el-col>
      </el-row>
      <com-table
        :data="tableData"
        stripe
        :cur-page.sync="curPage"
        :total="total"
        :page-size.sync="limit"
        @callback="callback"
      >
        <template>
          <el-table-column align="center" type="selection" width="55" />
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="address" label="地址" />
        </template>
      </com-table>
      <!-- <el-table
        :data="tableData"
        stripe
        :header-cell-style="{
          'background-color': '#F9F9F9',
          'border-bottom': '1px RGBA(199, 199, 199, 1) solid'
        }"
        style="width: 100%"
        header-row-class-name="custom-container"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table> -->
    </template>
  </ContentLayout>
</template>
<script>
import ContentLayout from '@/layout/contentLayout'
import ComTree from '@/components/ComTree'
import ComFormitem from '@/components/ComFormitem'
import ComTable from '@/components/ComTable'
export default {
  name: 'MenuAuth',
  components: { ContentLayout, ComTree, ComFormitem, ComTable },
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      ruleForm: {
        name: '',
        region: '',
        desc: ''
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      curPage: 1,
      total: 1205,
      limit: 20
    }
  },
  computed: {},
  created() {},
  methods: {
    callback() {
      console.log(this.curPage)
    },
    handleClick(row) {},
    submitForm(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.table_top {
  margin-bottom: 16px;
}
.table_title {
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  span {
    height: 24px;
    line-height: 24px;
    border-left: 5px solid $comTheme;
    box-sizing: border-box;
    padding-left: 12px;
  }
}
.table_btns {
  display: flex;
  justify-content: flex-end;
}
</style>
