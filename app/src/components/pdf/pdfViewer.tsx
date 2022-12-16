import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'

import { Row, Col, Modal, Button, Typography } from 'antd'
import { Fragment, useState } from 'react'

function PdfViewer({ base64Str, title }: { base64Str: string; title: string }) {
  const pdfContentType = 'application/pdf'
  const [open, setOpen] = useState(false)

  const base64toBlob = (data: string) => {
    const base64WithoutPrefix = data.substr(
      `data:${pdfContentType};base64,`.length,
    )

    const bytes = atob(base64WithoutPrefix)
    let length = bytes.length
    let out = new Uint8Array(length)
    while (length--) {
      out[length] = bytes.charCodeAt(length)
    }

    return new Blob([out], { type: pdfContentType })
  }
  const blob = base64toBlob(base64Str)
  const url = URL.createObjectURL(blob)

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>View Contract</Button>
      <Modal
        title={<Typography.Title level={4}>{title}</Typography.Title>}
        open={open}
        width={1000}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Row justify="center">
          <Col span={24}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Viewer fileUrl={url} theme="dark" />
            </Worker>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default PdfViewer
