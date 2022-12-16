import { Card } from 'antd'
import { useSignersByContract } from 'hooks/useSigners'
import ButtonSignContract from './contract/buttonSignContract'

const ContractCard = ({ address }: { address: string }) => {
  const signers = useSignersByContract(address)

  return (
    <Card
      type="inner"
      title={address}
      extra={<ButtonSignContract contractAddress={address} />}
    >
      <p>Number of Signers: {signers.length}</p>
    </Card>
  )
}

export default ContractCard
