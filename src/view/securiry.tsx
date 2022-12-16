import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Col, Result, Row } from 'antd'
import { useContractAddress, useContracts } from 'hooks/useContracts'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppState } from 'store'

export const Security = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet()
  const contractsAll = useSelector((state: AppState) => state.contracts)
  const contracts = useContracts()
  const { hash } = useParams()
  const contractAddr = useContractAddress(hash || '')

  if (!wallet.connected)
    return (
      <Result
        status="warning"
        title="You need to login fist to use this feature!"
        extra={
          <Row justify={'center'}>
            <Col>
              <WalletMultiButton style={{ background: '#ffab40' }} />
            </Col>
          </Row>
        }
      />
    )

  if (
    !!hash &&
    !!contractAddr &&
    !contracts[contractAddr] &&
    !!contractsAll[contractAddr]
  )
    return (
      <Result
        status="403"
        title="Not have permission"
        subTitle="Sorry, you are not have permission."
      />
    )

  return <>{children}</>
}
