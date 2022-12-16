import React from 'react'
import { notification } from 'antd'

declare global {
  interface Window {
    notify: ({ type, description, onClick }: PropsNotification) => void
  }
}

type PropsNotification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}

const UILoader = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification()

  window.notify = ({
    type,
    description,
    onClick = () => {},
  }: PropsNotification) => {
    console.error(description)
    return api[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      style: { cursor: 'pointer' },
    })
  }

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}

export default UILoader
