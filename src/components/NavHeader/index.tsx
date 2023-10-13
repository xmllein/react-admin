import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'

interface Props {}

export default function ({}: Props) {
  // 解构store
  const { userInfo, collapsed, updateCollapsed } = useStore()

  // 路由跳转
  const navigate = useNavigate()

  const breadList = [
    {
      title: '首页',
    },
    {
      title: '工作台',
    },
  ]

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail,
    },
    {
      key: 'logout',
      label: '退出',
    },
  ]

  // 切换菜单
  const toggleCollapsed = () => {
    updateCollapsed()
  }

  // 下拉菜单点击
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.clearItem('token')
      // location.href = '/login?callback=' + encodeURIComponent(location.href)
      navigate('/login')
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div className={styles.collapsed} onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className={styles.right}>
        <Switch
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}
