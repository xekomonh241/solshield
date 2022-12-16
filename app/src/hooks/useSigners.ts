import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store'
import { useAnchorProvider } from './useAnchor'

export const useSignerData = (address: string) => {
  const signerData = useSelector(
    (state: AppState) => state.signers[address.toString()],
  )
  return signerData || {}
}

export const useSignerMetaData = (id: string | number) => {
  const data = useSelector((state: AppState) => state.users[id])
  return data || {}
}

export const useSignersByContract = (contractAddress: string) => {
  const signers = useSelector((state: AppState) => state.signers)

  const filteredSigners = useMemo(() => {
    return Object.values(signers).filter(
      (data) => data.contract.toString() === contractAddress,
    )
  }, [contractAddress, signers])

  return filteredSigners
}

export const useSignerAddress = (contractAddress: string) => {
  const signers = useSelector((state: AppState) => state.signers)
  const provider = useAnchorProvider()

  const signerAddress = useMemo(() => {
    if (!provider) return null
    for (const addr of Object.keys(signers)) {
      const signerData = signers[addr]
      if (
        signerData.contract.toString() !== contractAddress ||
        signerData.authority.toString() !== provider.publicKey.toBase58()
      )
        continue

      return addr
    }
    return null
  }, [contractAddress, provider, signers])

  return signerAddress
}
