import Layout from '@/layout'

export default {
  path: '/system-manager',
  component: Layout,
  name: 'SystemManager',
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-help'
  },
  children: [
    {
      path: 'api-open',
      component: () => import('@/views/system-manager/api-open'),
      name: 'ApiOpen',
      meta: { title: 'API开放账号', icon: 'el-icon-s-tools' }
    },
    {
      path: 'menu-auth',
      component: () => import('@/views/system-manager/menu-auth'),
      name: 'MenuAuth',
      meta: { title: '菜单管理', icon: 'el-icon-s-tools' }
    },
    {
      path: 'role-manage',
      component: () => import('@/views/system-manager/role-manage'),
      name: 'RoleManage',
      meta: { title: '角色管理', icon: 'el-icon-s-tools' }
    },
    {
      path: 'organ-manage',
      component: () => import('@/views/system-manager/organ-manage'),
      name: 'OrganManage',
      meta: { title: '组织机构', icon: 'el-icon-s-tools' }
    },
    {
      path: 'user-manage',
      component: () => import('@/views/system-manager/user-manage'),
      name: 'UserManage',
      meta: { title: '用户管理', icon: 'el-icon-s-tools' }
    },
    {
      path: 'operator-manage',
      component: () => import('@/views/system-manager/operator-manage'),
      name: 'OperatorManage',
      meta: { title: '运营商账户管理', icon: 'el-icon-s-tools' }
    }
  ]
}

