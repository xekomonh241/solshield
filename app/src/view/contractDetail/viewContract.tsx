import { Col, Divider, PageHeader, Row, Typography } from 'antd'
import ButtonSignContract from 'components/contract/buttonSignContract'
import ContractReviewFile from 'components/contract/contractReviewFile'
import ContractSigners from 'components/contract/contractSigners'
import ExploreAddress from 'components/exploreAddress'
import PdfViewer from 'components/pdf/pdfViewer'

import { useContractFile, useContractMetadata } from 'hooks/useContracts'
import ContractStatusTag from './contractStateTag'
import './index.less'

const { Paragraph } = Typography

const ViewContract = ({ contractAddress }: { contractAddress: string }) => {
  const metadata = useContractMetadata(contractAddress)
  const file = useContractFile(contractAddress)

  return (
    <Row>
      <Col span={24} data-aos="zoom-in" data-aos-delay="350">
        <PageHeader
          onBack={() => window.history.back()}
          title={metadata.title}
          className="site-page-header"
          subTitle={<ExploreAddress address={contractAddress} />}
          tags={<ContractStatusTag contractAddress={contractAddress} />}
          extra={[
            <PdfViewer base64Str={file} title={metadata?.title} />,
            <ButtonSignContract contractAddress={contractAddress} />,
          ]}
          avatar={{
            src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Paragraph>{metadata.description}</Paragraph>
            </Col>

            <Col span={24}>
              <ContractReviewFile contractAddress={contractAddress} />
            </Col>

            <Col span={24}>
              <Divider />
              <Typography.Title level={4}>List Signers</Typography.Title>
            </Col>
            <Col span={24}>
              <ContractSigners contractAddress={contractAddress} />
            </Col>
          </Row>
        </PageHeader>
      </Col>
    </Row>
  )
}

export default ViewContract
