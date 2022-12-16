import { useState } from 'react'

import { Button } from 'antd'
import { CheckCircleOutlined, HighlightOutlined } from '@ant-design/icons'

import { useProgram } from 'hooks/useProgram'
import { useSignerAddress, useSignerData } from 'hooks/useSigners'

const ButtonSignContract = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  const [loading, setLoading] = useState(false)
  const contractSigner = useSignerAddress(contractAddress)
  const signerData = useSignerData(contractSigner || '')
  const program = useProgram()

  const handleSign = async () => {
    if (!program || !contractSigner) return
    try {
      setLoading(true)
      await program.methods
        .signContract()
        .accounts({
          authority: program.provider.publicKey,
          contract: signerData.contract,
          contractSigner,
        })
        .rpc()
      window.notify({
        type: 'success',
        description: 'Sign contract successfully!',
      })
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  if (!contractSigner) return null

  if (!!signerData.state['singed'])
    return (
      <Button
        type="text"
        disabled
        icon={<CheckCircleOutlined />}
        style={{ color: '#2eb835' }}
      >
        Signed
      </Button>
    )
  return (
    <Button
      type="primary"
      onClick={handleSign}
      loading={loading}
      icon={<HighlightOutlined />}
    >
      Sign
    </Button>
  )
}

export default ButtonSignContract
