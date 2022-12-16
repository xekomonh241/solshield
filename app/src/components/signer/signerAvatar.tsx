import { Avatar } from 'antd'
import { useSignerMetaData } from 'hooks/useSigners'

const SignerAvatar = ({ uid }: { uid: number }) => {
  const user = useSignerMetaData(uid)

  return <Avatar src={user?.picture?.thumbnail} />
}

export default SignerAvatar
