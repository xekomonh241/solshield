import { Row, Col, Typography, Statistic } from 'antd'
import { ContainerOutlined } from '@ant-design/icons'

import Card from 'antd/lib/card/Card'
import SubBanner from './subBanner'
import { useSelector } from 'react-redux'
import { AppState } from 'store'

const Home = () => {
  const contracts = useSelector((state: AppState) => state.contracts)
  const signers = useSelector((state: AppState) => state.signers)

  const approved = Object.values(contracts).filter(
    (e) => e.totalSigned.toString() === e.totalSigner.toString(),
  )

  return (
    <Row>
      <Col span={24}>
        <Card
          bordered={false}
          style={{ background: 'transparent' }}
          bodyStyle={{ padding: 24 }}
        >
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ textAlign: 'center' }}
          >
            <Col
              xl={6}
              md={8}
              xs={24}
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay="250"
              data-aos-easing="ease-in-sine"
            >
              <Statistic
                title={
                  <Typography.Title level={2} style={{ color: '#ffab40' }}>
                    Total Contract
                  </Typography.Title>
                }
                value={10212 + Object.keys(contracts).length}
                prefix={<ContainerOutlined />}
              />
            </Col>
            <Col
              xl={6}
              md={8}
              xs={24}
              data-aos="flip-left"
              data-aos-delay="250"
            >
              <Statistic
                title={
                  <Typography.Title level={2} style={{ color: '#ffab40' }}>
                    Total Approved
                  </Typography.Title>
                }
                value={7281 + approved.length}
              />
            </Col>
            <Col
              xl={6}
              md={8}
              xs={24}
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              data-aos-delay="250"
            >
              <Statistic
                title={
                  <Typography.Title level={2} style={{ color: '#ffab40' }}>
                    Total Signature
                  </Typography.Title>
                }
                value={12721 + Object.keys(signers).length}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col
        span={24}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        data-aos-delay="500"
      >
        <SubBanner />
      </Col>
    </Row>
  )
}

export default Home
