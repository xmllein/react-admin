import { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import styles from './index.module.scss'
import NavHeader from '@/components/NavHeader'
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from 'react-router-dom'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import api from '@/api'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'

const { Sider, Content } = Layout
export default function LayoutFC() {
  // 解构store
  const { collapsed, updateUserInfo } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    getUserInfo()
  }, [])

  // 获取用户信息
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    storage.setItem('userInfo', data)
    updateUserInfo(data)
  }

  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    // 权限判断
    const data = useRouteLoaderData('layout') as IAuthLoader

    // 不用权限也可以访问
    const staticPath = ['/welcome', '/403', '/404']
    if (
      !data.menuPathList.includes(pathname) &&
      !staticPath.includes(pathname)
    ) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Watermark content='我是水印'>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
}
