import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'
import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import React from 'react'
import * as Icons from '@ant-design/icons'
import { Menu as IMenu } from '@/types/api'
import styles from './index.module.scss'
interface Props {}

export default function ({}: Props) {
  // 惨淡是否展开
  const { collapsed, updateCollapsed } = useStore()
  // 获取路由拦截数据
  const data: any = useRouteLoaderData('layout')
  // 菜单选中
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 菜单列表
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  // 当前路由path
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // 菜单项类型
  type MenuItem = Required<MenuProps>['items'][number]
  // 生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem
  }
  // 根据名称生成图标
  function createIcon(name?: string) {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (
    menuList: IMenu.MenuItem[],
    treeList: MenuItem[] = []
  ) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons)
          return treeList.push(
            getItem(item.menuName, item.path || index, createIcon(item.icon))
          )
        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            getTreeMenu(item.children || [])
          )
        )
      }
    })
    return treeList
  }

  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  // logo点击事件
  const handleClickLogo = () => {
    navigate('/welcome')
  }
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />,
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined rev={undefined} />,
        },
        {
          label: '菜单管理',
          key: '5',
          icon: <TeamOutlined rev={undefined} />,
        },
      ],
    },
  ]
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='logo' className={styles.logo} />
        {collapsed ? '' : <span>后台管理</span>}
      </div>
      <Menu
        selectedKeys={selectedKeys}
        mode='inline'
        theme='dark'
        items={menuList}
        onClick={handleClickMenu}
        style={{
          width: collapsed ? 80 : 'auto',
        }}
      />
    </div>
  )
}
