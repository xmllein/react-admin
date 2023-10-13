import React, { useState } from 'react'
import styles from './login.module.scss'
import { Button, Form, Input, message } from 'antd'
import { Login } from '@/types/api'
import api from '@/api'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'

const LoginFC: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // 提交表单
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.setItem('token', data)
      message.success('登录成功')
      // 获取参数
      // const params = new URLSearchParams(window.location.search)
      // setTimeout(() => {
      //   location.href = params.get('callback') || '/welcome'
      // })
      navigate('/welcome')
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>React后台管理系统</div>
        <Form
          name='basic'
          initialValues={{
            remember: true,
            userName: 'admin',
            userPwd: 'admin',
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name='userName'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='userPwd'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFC
