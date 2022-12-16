import { Col, Row } from 'antd'
import PdfReviewer from 'components/pdf/pdfReviewer'
import { useContractFile } from 'hooks/useContracts'

const ContractReviewFile = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  const file = useContractFile(contractAddress)
  return (
    <Row>
      <Col span={24}>
        <PdfReviewer base64Str={file} />
      </Col>
    </Row>
  )
}

export default ContractReviewFile
