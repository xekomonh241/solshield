import { Button, List } from 'antd'
import SignerAvatar from './signer/signerAvatar'
import SignerName from './signer/signerName'

const ListSigner = ({ signers }: { signers: string[] }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={signers}
      renderItem={(signer, uid) => (
        <List.Item
          actions={[
            <Button type="text" color="danger">
              Remove
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<SignerAvatar uid={uid} />}
            title={<SignerName uid={uid} />}
            description={signer}
          />
        </List.Item>
      )}
    />
  )
}

export default ListSigner
