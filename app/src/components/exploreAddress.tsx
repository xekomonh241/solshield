import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Button, Space, Tooltip, Typography } from 'antd'
import { CopyOutlined, LinkOutlined } from '@ant-design/icons'
import { asyncWait, explorer, shortenAddress } from 'utils'

type ExploreAddressProps = { address: string }
const ExploreAddress = ({ address }: ExploreAddressProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(500)
    setCopied(false)
  }

  return (
    <Space size={4}>
      {/* Shorten address */}
      <Typography.Text type="secondary">
        {shortenAddress(address)}
      </Typography.Text>
      {/* Copy address */}
      <Tooltip title="Copied" open={copied}>
        <CopyToClipboard text={address}>
          <Button
            style={{
              width: 'auto',
              height: 'auto',
              padding: 0,
              background: 'transparent',
            }}
            type="text"
            icon={<CopyOutlined />}
            onClick={onCopy}
          />
        </CopyToClipboard>
      </Tooltip>
      {/* Explore address */}
      <Button
        style={{
          width: 'auto',
          height: 'auto',
          padding: 0,
          background: 'transparent',
        }}
        type="text"
        icon={<LinkOutlined />}
        onClick={() => window.open(explorer(address), '_blank')}
      />
    </Space>
  )
}

export default ExploreAddress
