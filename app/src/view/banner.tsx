import { Row, Col, Space } from 'antd'

import UploadBackground from 'static/images/upload.png'
import MenuHeader from 'components/header'
import ButtonUploadFile from 'components/buttonUpload'

const Banner = () => {
  return (
    <Row>
      <Col span={24}>
        <Row
          justify="center"
          style={{
            background: `url(${UploadBackground})`,
            height: '400px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            padding: '8px 100px',
          }}
        >
          <Col span={24}>
            <MenuHeader />
          </Col>
          <Col span={24} style={{ marginTop: 120, textAlign: 'center' }}>
            <Space style={{ fontSize: 45, fontWeight: 200 }}>
              <span className="title-word title-word-1">Protect</span>
              <span className="title-word title-word-2">your</span>
              <span className="title-word title-word-3">contract</span>
            </Space>
          </Col>
          <Col data-aos="zoom-in">
            <ButtonUploadFile />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Banner
