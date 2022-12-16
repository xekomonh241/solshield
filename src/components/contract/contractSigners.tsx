import { Col, Row, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import ExploreAddress from 'components/exploreAddress'
import SignerAvatar from 'components/signer/signerAvatar'
import SignerName from 'components/signer/signerName'
import { useSignersByContract } from 'hooks/useSigners'
import { SignerData } from 'store/signers.controller'

const columns: ColumnsType<SignerData> = [
  {
    title: 'Authority',
    key: 'authority',
    render: (data: SignerData) => (
      <Space>
        <SignerAvatar uid={Math.floor((Math.random() * 1000) % 500)} />
        <SignerName uid={Math.floor((Math.random() * 1000) % 500)} />
      </Space>
    ),
  },
  {
    title: 'Wallet Address',
    key: 'address',
    render: (data: SignerData) => (
      <ExploreAddress address={data.authority.toBase58()} />
    ),
  },

  {
    title: 'Status',
    key: 'status',
    render: (data: SignerData) => {
      const status: 'initialized' | 'singed' = Object.keys(data.state)[0] as any
      let color = 'geekblue'
      if (status === 'singed') color = 'green'
      return <Tag color={color}>{status.toUpperCase()}</Tag>
    },
  },
]

const ContractSigners = ({ contractAddress }: { contractAddress: string }) => {
  const signers = useSignersByContract(contractAddress)

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={signers}
          rowKey={(e) => e.authority.toBase58()}
        />
      </Col>
    </Row>
  )
}

export default ContractSigners
