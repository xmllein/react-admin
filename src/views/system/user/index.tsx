import api from '@/api'
import { User } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'

import { message } from '@/utils/AntdGlobal'

import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton'

export default function UserFC() {
  const [form] = Form.useForm()

  // 表格选中的用户ID
  const [userIds, setUserIds] = useState<number[]>([])

  // 获取表格数据
  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: User.SearchParams
  ) => {
    return api
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then((data) => {
        return {
          total: data.page.total,
          list: data.list,
        }
      })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  })

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户',
        }[role]
      },
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期',
        }[state]
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'address',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  // 用户删除(单个)
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      },
    })
  }

  // 批量删除确认
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      },
    })
  }

  // 公共删除接口请求
  const handleUserDelSubmit = (ids: number[]) => {
    message.success('删除成功')
  }

  return (
    <div className='user-list'>
      <Form
        className='search-form'
        form={form}
        layout='inline'
        initialValues={{ state: 1 }}
      >
        <Form.Item label='用户ID' name='userId'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名' name='userName'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='用户状态' name='state'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}> 所有</Select.Option>
            <Select.Option value={1}> 在职</Select.Option>
            <Select.Option value={2}> 离职</Select.Option>
            <Select.Option value={3}> 试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton auth='user@create' type='primary'>
              新增
            </AuthButton>
            {/* <Button type='primary' onClick={handleCreate}>
              新增
            </Button> */}
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            },
          }}
          {...tableProps}
        />
      </div>
    </div>
  )
}
