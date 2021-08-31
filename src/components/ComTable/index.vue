<template>
  <div class="table_container">
    <el-table v-bind="$attrs" style="width: 100%" v-on="$listeners">
      <slot />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page="curPage"
      :limit="pageSize"
      @pagination="callPage"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ComTable',
  components: { Pagination },
  props: {
    total: {
      type: Number,
      default: 0
    },
    curPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      page: 1,
      limit: 10
    }
  },
  methods: {
    callPage(val) {
      this.$emit('update:curPage', val.page)
      this.$emit('update:pageSize', val.limit)
      this.$emit('callback', val)
    }
  }
}
</script>
<style lang="scss" scoped></style>
