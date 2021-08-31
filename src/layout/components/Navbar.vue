<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="nav_system">大明技术有限公司</div>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template> -->
      <div class="nav_system">
        <span class="origin_name">当前机构：大明公司 欢迎您：</span>
        <span class="user_name">
          {{ userInfo.username || 'vvmily' }}
          <!-- <i class="el-icon-caret-bottom" /> -->
        </span>
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <div class="avatar_image">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <span>vv</span>
          </div>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              <i class="el-icon-edit" />
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <i class="el-icon-switch-button" />
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import Cookies from 'js-cookie'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const userInfo = Cookies.get('userInfo')
      this.userInfo = userInfo ? JSON.parse(userInfo) : {}
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      const res = await this.$store.dispatch('user/logout')
      if (res.code !== 200) {
        return this.$message.error(res.msg || '退出失败')
      }
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: $navBarBg;
  border-bottom: $comBorder;
  box-sizing: border-box;
  .nav_system {
    float: left;
    line-height: 50px;
    margin-right: 24px;
    font-size: 16px;
    font-weight: bold;
    .origin_name {
      color: #5a5e66;
    }
    .user_name {
      color: $comTheme;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .avatar_image {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          overflow: hidden;
          background-color: $comTheme;
          line-height: 40px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
