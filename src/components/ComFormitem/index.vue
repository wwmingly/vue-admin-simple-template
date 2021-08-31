<template>
  <el-col :xs="colOption.xs" :sm="colOption.sm" :lg="colOption.lg">
    <el-form-item v-bind="$attrs" col="8">
      <slot />
    </el-form-item>
  </el-col>
</template>
<script>
import { debounce } from '@/utils'
export default {
  name: 'ComFormItem',
  props: {},
  data() {
    return {
      colOption: {
        xs: 24,
        sm: 8,
        lg: 4
      },
      changeWindow: null
    }
  },
  computed: {},
  mounted() {
    this.changeWindow = debounce(() => {
      this.initOption()
    }, 100)
    this.resizeWindow()
    this.initOption()
  },
  methods: {
    initOption() {
      const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
      console.log(clientWidth)
      let colOption = {}
      if (clientWidth >= 2000) {
        colOption = { xs: 24, sm: 8, lg: 4 }
      } else if (clientWidth < 2000 && clientWidth >= 1500) {
        colOption = { xs: 24, sm: 12, lg: 6 }
      } else {
        colOption = { xs: 24, sm: 12, lg: 8 }
      }

      this.colOption = colOption
    },
    resizeWindow() {
      window.addEventListener('resize', this.changeWindow)
    }
  }
}
</script>
<style lang="scss" scoped></style>
