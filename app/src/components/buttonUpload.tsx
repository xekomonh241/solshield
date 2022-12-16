import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { asyncWait, hashMd5, MetadataService } from 'utils'

const ButtonUploadFile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handlePdfFileChange = (selectedFile: RcFile) => {
    if (selectedFile) {
      let reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = async (e: any) => {
        console.log('e.target.result', e.target.result)
        const hash = hashMd5(e.target.result)
        console.log('hash', hash)
        await MetadataService.backupFile(hash, e.target.result)
        navigate(`contract/${hash}`)
      }
    }
  }

  return (
    <Upload
      name="file"
      multiple={false}
      accept={'application/pdf'}
      maxCount={1}
      showUploadList={false}
      beforeUpload={async (file) => {
        setLoading(true)
        await asyncWait(500)
        try {
          if (file.type !== 'application/pdf') return // Throw error
          handlePdfFileChange(file)
          return false
        } catch (error) {
        } finally {
          setLoading(false)
        }
      }}
    >
      <Button
        loading={loading}
        type="ghost"
        size="large"
        style={{
          borderImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 4s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1`,
        }}
        icon={<UploadOutlined />}
      >
        Select PDF files
      </Button>
    </Upload>
  )
}

export default ButtonUploadFile
