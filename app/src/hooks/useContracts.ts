import { PublicKey } from '@solana/web3.js'
import { ContractState } from './../store/contracts.controller'
import { ContractMetadata, MetadataService } from './../utils'
import { deriveContractAddress, deriveSignerAddress } from './useProgram'
import { Address } from '@project-serum/anchor'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store'
import { useWallet } from '@solana/wallet-adapter-react'

export const useContracts = () => {
  const contracts = useSelector((state: AppState) => state.contracts)
  const signers = useSelector((state: AppState) => state.signers)
  const wallet = useWallet()
  const [filtered, setFiltered] = useState<ContractState>({})

  const load = useCallback(async () => {
    const state: ContractState = {}
    if (!wallet.publicKey) return setFiltered({})

    for (const addr in contracts) {
      const data = contracts[addr]
      const signerAddr = await deriveSignerAddress(
        new PublicKey(addr),
        wallet.publicKey,
      )
      if (
        data.authority.toBase58() !== wallet?.publicKey.toBase58() &&
        !signers[signerAddr.toBase58()]
      )
        continue

      state[addr] = data
    }
    return setFiltered(state)
  }, [contracts, signers, wallet.publicKey])

  useEffect(() => {
    load()
  }, [load])

  return filtered
}

export const useContractData = (address: Address) => {
  const contractData = useSelector(
    (state: AppState) => state.contracts[address.toString()],
  )
  return contractData
}

export const useHash = (contractAddress: Address) => {
  const contractData = useContractData(contractAddress)
  const [hash, setHash] = useState('')

  const load = useCallback(async () => {
    setHash(Buffer.from(contractData.hash || []).toString('hex'))
  }, [contractData.hash])

  useEffect(() => {
    load()
  }, [load])

  return hash
}

export const useContractMetadata = (address: Address) => {
  const hash = useHash(address)
  const [metadata, setMetadata] = useState<ContractMetadata>({
    description: '',
    hash: '',
    thumbnail: '',
    title: '',
  })

  const load = useCallback(async () => {
    const data = (await MetadataService.getMetadata(hash)) || {
      description: '',
      hash: '',
      thumbnail: '',
      title: '',
    }
    return setMetadata(data)
  }, [hash])

  useEffect(() => {
    load()
  }, [load])

  return metadata
}

export const useContractFile = (address: Address) => {
  const hash = useHash(address)
  const [file, setFile] = useState<string>('')

  const load = useCallback(async () => {
    const data = (await MetadataService.getFile(hash)) || ''
    return setFile(data)
  }, [hash])

  useEffect(() => {
    load()
  }, [load])

  return file
}

export const useContractAddress = (hash: string) => {
  const [address, setAddress] = useState('')

  const derive = useCallback(async () => {
    const addr = await deriveContractAddress(
      Array.from(Buffer.from(hash, 'hex')),
    )
    setAddress(addr.toBase58())
  }, [hash])

  useEffect(() => {
    derive()
  }, [derive])

  return address
}
