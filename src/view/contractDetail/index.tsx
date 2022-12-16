import { useContracts } from 'hooks/useContracts'
import { useCallback, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'
import React from 'react'
import ViewContract from './viewContract'
import CreateContract from './createContract'

const ContractDetail = () => {
  const { hash } = useParams()
  const contracts = useContracts()
  const [contractAddress, setContractAddress] = useState<string | null>()

  const loadData = useCallback(() => {
    for (const addr in contracts) {
      const hashContract = Buffer.from(contracts[addr].hash).toString('hex')
      if (hashContract === hash) {
        return setContractAddress(addr)
      }
    }
    return setContractAddress(null)
  }, [contracts, hash])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (contractAddress === undefined) return <div>Loading</div>

  return (
    <Row justify="center">
      <Col style={{ maxWidth: 980 }} span={24}>
        {!contractAddress ? (
          <CreateContract />
        ) : (
          <ViewContract contractAddress={contractAddress} />
        )}
      </Col>
    </Row>
  )
}

export default ContractDetail
