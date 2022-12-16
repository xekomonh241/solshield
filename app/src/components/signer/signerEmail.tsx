import { useSignerMetaData } from 'hooks/useSigners'

const SignerEmail = ({ uid }: { uid: number }) => {
  const user = useSignerMetaData(uid)
  if (!user?.email) return <span>--</span>
  return <span>{user?.email}</span>
}

export default SignerEmail
