import { Col, Row } from 'antd'

import bg from 'static/images/bg-2.png'

const SubBanner = () => {
  return (
    <Row>
      <Col span={24}>
        <img src={bg} alt="sol-shield" style={{ width: '100%' }} />
      </Col>
    </Row>
  )
}

export default SubBanner
