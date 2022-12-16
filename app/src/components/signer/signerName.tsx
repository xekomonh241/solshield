import { useSignerMetaData } from 'hooks/useSigners'

const SignerName = ({ uid }: { uid: number }) => {
  const user = useSignerMetaData(uid)
  if (!user.name) return <span>--</span>
  return (
    <span>{`${user.name.last} ${user.name.first}   (${user.location.country})`}</span>
  )
}

export default SignerName
