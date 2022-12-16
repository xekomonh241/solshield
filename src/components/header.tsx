import { ContactsOutlined, HomeOutlined } from '@ant-design/icons'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { Menu, MenuProps, Row, Col, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: (
      <Link to={'/home'}>
        <Typography.Text style={{ color: 'inherit' }} strong>
          Home
        </Typography.Text>
      </Link>
    ),
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link to={'/management'}>
        <Typography.Text style={{ color: 'inherit' }} strong>
          Management
        </Typography.Text>
      </Link>
    ),
    key: 'management',
    icon: <ContactsOutlined />,
  },
]

function MenuHeader() {
  return (
    <Row justify="space-between">
      <Col></Col>
      <Col>
        <Space>
          <Menu
            mode="horizontal"
            items={items}
            style={{ border: 'none', minWidth: 280 }}
            defaultSelectedKeys={['home']}
          />
          <WalletMultiButton style={{ background: '#ffab40' }} />
        </Space>
      </Col>
    </Row>
  )
}

export default MenuHeader
