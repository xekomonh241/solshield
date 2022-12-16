import { Col, Empty, PageHeader, Row, Space, Spin, Tag, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import ExploreAddress from 'components/exploreAddress'
import { useContracts } from 'hooks/useContracts'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { MetadataService } from 'utils'
import ButtonSignContract from 'components/contract/buttonSignContract'

import { useLoadingContracts } from 'watcher/contract.watcher'

export enum ContractStatus {
  Open = 'Open',
  Expired = 'Expired',
  Approved = 'Approved',
}
interface WrapContractType {
  no: number
  createAt: Date
  endAt: Date
  address: string
  title: string
  totalSigner: number
  totalSigned: number
  status: ContractStatus
  hash: string
}

export const useWrapContracts = () => {
  const contracts = useContracts()
  const [wrapContracts, setWrapContracts] = useState<WrapContractType[]>([])

  const buildWrapContracts = useCallback(async () => {
    const wrapContracts: Record<string, WrapContractType> = {}
    let idx = 1
    for (const address in contracts) {
      const { totalSigned, totalSigner, expiredAt, hash } = contracts[address]
      const metadata = await MetadataService.getMetadata(
        Buffer.from(hash).toString('hex'),
      )
      wrapContracts[address] = {
        no: idx++,
        createAt: new Date(),
        address,
        title: metadata?.title || '',
        totalSigner: Number(totalSigner.toString()),
        totalSigned: Number(totalSigned.toString()),
        status: ContractStatus.Open,
        endAt: new Date(expiredAt.toNumber() * 1000),
        hash: Buffer.from(hash).toString('hex'),
      }

      if (totalSigner === totalSigned)
        wrapContracts[address].status = ContractStatus.Approved
      else if (new Date().getTime() / 1000 > expiredAt.toNumber())
        wrapContracts[address].status = ContractStatus.Expired
    }

    return setWrapContracts(Object.values(wrapContracts))
  }, [contracts])

  useEffect(() => {
    const timeout = setTimeout(() => {
      buildWrapContracts()
    }, 300)
    return () => clearTimeout(timeout)
  }, [buildWrapContracts])

  return wrapContracts
}
const columns: ColumnsType<WrapContractType> = [
  {
    title: 'NO.',
    dataIndex: 'no',
    key: 'no',
    render: (no: string) => (
      <Typography.Text type="secondary">{no}.</Typography.Text>
    ),
  },
  // {
  //   title: 'Create At',
  //   dataIndex: 'createAt',
  //   key: 'createAt',
  //   render: (date: Date) => (
  //     <Typography.Text>{moment(date).format('DD-MM-YYYY')}</Typography.Text>
  //   ),
  // },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: 'Status',
    key: 'status',
    render: ({ status, totalSigned, totalSigner }: WrapContractType) => {
      let text = status.toString().toUpperCase()
      let color = 'geekblue'
      if (status === ContractStatus.Expired) color = 'volcano'
      if (status === ContractStatus.Approved) color = 'green'
      if (status !== ContractStatus.Approved) {
        text += ` ${totalSigned} / ${totalSigner}`
      }
      return <Tag color={color}>{text}</Tag>
    },
    filters: [
      {
        text: ContractStatus.Open,
        value: ContractStatus.Open,
      },
      {
        text: ContractStatus.Approved,
        value: ContractStatus.Approved,
      },
      {
        text: ContractStatus.Expired,
        value: ContractStatus.Expired,
      },
    ],
  },
  {
    title: 'End At',
    dataIndex: 'endAt',
    key: 'endAt',
    render: (date: Date) => (
      <Typography.Text>
        {moment(date).format('DD-MM-YYYY HH:mm')}
      </Typography.Text>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => <ExploreAddress address={address} />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (data: WrapContractType) => (
      <Space size="middle">
        <Link to={'/contract/' + data.hash}>View</Link>
        <ButtonSignContract contractAddress={data.address} />
      </Space>
    ),
  },
]

const Management = () => {
  const contracts = useWrapContracts()
  const [loadContract] = useLoadingContracts()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col style={{ maxWidth: 1200 }} span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <PageHeader
              onBack={() => window.history.back()}
              title="Contract"
              tags={
                <Tag color="blue">
                  {Object.keys(contracts).length} Contracts
                </Tag>
              }
              subTitle="Management"
            ></PageHeader>
          </Col>
          <Col span={24}>
            {loadContract ? (
              <Spin spinning tip="loading">
                <Empty description="" />
              </Spin>
            ) : (
              <Row>
                <Col span={24} data-aos="zoom-in">
                  <Table
                    columns={columns}
                    dataSource={contracts}
                    rowKey={(e) => e.address}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Management
