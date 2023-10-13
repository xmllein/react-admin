import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Result
      status={403}
      title='403'
      subTitle='抱歉，您无权访问该页面。'
      extra={
        <Button type='primary' onClick={handleClick}>
          回首页
        </Button>
      }
    />
  )
}

export default NotFound
