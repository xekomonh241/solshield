import React, { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import Banner from './banner'
import Management from './management'
import ContractWatcher from 'watcher/contract.watcher'
import SignerWatcher from 'watcher/signer.watcher'
import Home from './home'
import ContractDetail from './contractDetail'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { initUsers } from 'store/users.controller'
import UILoader from 'uiloader'
import { Security } from './securiry'
import Aos from 'aos'
import 'aos/dist/aos.css'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    Aos.init({ duration: 1000 })
  }, [])

  const loadData = useCallback(async () => {
    if (!loading) return
    await dispatch(initUsers())

    setLoading(false)
  }, [dispatch, loading])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <UILoader>
      <Layout>
        <ContractWatcher />
        <SignerWatcher />
        <Content>
          <Row justify="center">
            <Col span={24}>
              <Banner />
            </Col>

            <Col span={24} style={{ minHeight: 350 }}>
              <Routes>
                <Route path="/home" element={<Home />} />

                <Route
                  path="/contract/:hash"
                  element={
                    <Security>
                      <ContractDetail />
                    </Security>
                  }
                />
                <Route
                  path="/management"
                  element={
                    <Security>
                      <Management />
                    </Security>
                  }
                />

                <Route path="/*" element={<Home />} />
              </Routes>
            </Col>

            <Col span={24}>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Col>
          </Row>
        </Content>
      </Layout>
    </UILoader>
  )
}

export default App
