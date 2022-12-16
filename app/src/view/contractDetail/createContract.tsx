import { BN, web3 } from '@project-serum/anchor'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Button,
  Col,
  DatePicker,
  Input,
  PageHeader,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import ListSigner from 'components/listSingers'
import PdfViewer from 'components/pdf/pdfViewer'

import { ContractMetadata, MetadataService } from 'utils'
import PdfReviewer from 'components/pdf/pdfReviewer'
import {
  deriveContractAddress,
  deriveSignerAddress,
  PROGRAMS,
  useProgram,
} from 'hooks/useProgram'
import { useAnchorProvider } from 'hooks/useAnchor'

const CreateContract = () => {
  const { hash } = useParams()
  const [file, setFile] = useState<string>('')
  const [inputSigner, setInputSigner] = useState('')
  const [loading, setLoading] = useState(false)

  const [signers, setSigners] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [des, setDes] = useState('')
  const [endAt, setEndAt] = useState('')

  const program = useProgram()
  const provider = useAnchorProvider()

  const loadData = useCallback(async () => {
    if (!hash) return
    const file = await MetadataService.getFile(hash)
    console.log('file', file)
    setFile(file || '')
  }, [hash])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onCreateContract = async () => {
    try {
      setLoading(true)
      if (!hash) throw new Error('Invalid hash')

      const metadata: ContractMetadata = {
        hash,
        description: des,
        thumbnail: '',
        title,
      }
      await MetadataService.backupMetadata(hash, metadata)

      if (!program || !provider) return

      const hashBuff = Array.from(Buffer.from(hash, 'hex'))
      const contract = await deriveContractAddress(hashBuff)

      const tx = new web3.Transaction()

      const txCreateContract = await program.methods
        .createContract(
          Array.from(Buffer.from(hash, 'hex')),
          new BN(new Date(endAt).getTime() / 1000),
        )
        .accounts({
          authority: provider.publicKey,
          contract: contract,
          ...PROGRAMS,
        })
        .transaction()
      tx.add(txCreateContract)

      for (const signer of signers) {
        const txSigner = await deriveSignerAddress(
          contract,
          new web3.PublicKey(signer),
        )

        const txCreateSigner = await program.methods
          .createSigner()
          .accounts({
            authority: provider.publicKey,
            contract: contract,
            contractSigner: txSigner,
            contractSignerAuthority: signer,
            ...PROGRAMS,
          })
          .transaction()
        tx.add(txCreateSigner)
      }

      const txActiveContract = await program.methods
        .activeContract()
        .accounts({
          authority: provider.publicKey,
          contract: contract,
          ...PROGRAMS,
        })
        .transaction()
      tx.add(txActiveContract)

      await provider.sendAndConfirm(tx)
      window.notify({
        type: 'success',
        description: 'Create contract successfully!',
      })
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} data-aos-delay="350">
        <PageHeader
          onBack={() => window.history.back()}
          title="Create Contract"
          className="site-page-header"
          subTitle="Information"
        >
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Title</Typography.Text>
                <Input
                  placeholder="input title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Expired Date</Typography.Text>
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={(e) => setEndAt(e?.toISOString() || '')}
                />
              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Description</Typography.Text>
                <Input.TextArea
                  placeholder="input description"
                  onChange={(e) => setDes(e.target.value)}
                  rows={5}
                />
              </Space>
            </Col>
          </Row>
        </PageHeader>
      </Col>

      <Col span={24}>
        <PageHeader
          title="Signers"
          className="site-page-header"
          subTitle="Setup signers"
          tags={<Tag color="blue">{signers.length}</Tag>}
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Space style={{ width: '100%' }}>
                <Input
                  placeholder="signer address"
                  key="2"
                  onChange={(e) => setInputSigner(e.target.value)}
                  style={{ width: 330 }}
                />
                <Button
                  key="1"
                  type="primary"
                  onClick={() => {
                    const addr =
                      inputSigner ||
                      web3.Keypair.generate().publicKey.toBase58()
                    setSigners([...signers, addr])
                    setInputSigner('')
                  }}
                >
                  Add Signer
                </Button>
              </Space>
            </Col>
            {!!signers.length && (
              <Col span={24}>
                <ListSigner signers={signers} />
              </Col>
            )}
            <Col span={24}>
              <PdfReviewer base64Str={file} />
            </Col>
            <Col flex="auto"></Col>
            <Col>
              <Space>
                <PdfViewer base64Str={file} key="2" title={title} />
                <Button
                  type="primary"
                  icon={<FileAddOutlined />}
                  disabled={!signers.length}
                  onClick={onCreateContract}
                  loading={loading}
                >
                  Create Contract
                </Button>
              </Space>
            </Col>
          </Row>
        </PageHeader>
      </Col>
    </Row>
  )
}

export default CreateContract
