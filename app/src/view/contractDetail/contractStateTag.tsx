import { Tag } from 'antd'
import { ContractStatus, useWrapContracts } from 'view/management'

const ContractStateTag = ({ contractAddress }: { contractAddress: string }) => {
  const contract = useWrapContracts()

  const data = contract.find((e) => e.address === contractAddress)
  if (!data) return null
  const { status, totalSigned, totalSigner } = data
  let text = status.toString().toUpperCase()
  let color = 'geekblue'
  if (status === ContractStatus.Expired) color = 'volcano'
  if (status === ContractStatus.Approved) color = 'green'
  if (status !== ContractStatus.Approved) {
    text += ` ${totalSigned} onB/ ${totalSigner}`
  }
  return <Tag color={color}>{text}</Tag>
}

export default ContractStateTag
