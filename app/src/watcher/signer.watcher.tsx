import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import { initSigners, upsetSigner } from 'store/signers.controller'
import { AppDispatch } from 'store'
import { useProgram } from 'hooks/useProgram'

// TODO: Config
const NAME = 'contractSigner'
const FILTER: web3.GetProgramAccountsFilter[] = []

const SignerWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const program = useProgram()

  // TODO: init all account data
  const init = useCallback(
    (data: any) => dispatch(initSigners(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetSigner({ address: key, data: value })),
    [dispatch],
  )

  if (!program) return null
  return (
    <Watcher
      program={program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default SignerWatcher
