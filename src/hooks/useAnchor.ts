import { AnchorProvider } from '@project-serum/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'

export const useAnchorProvider = () => {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const provider = useMemo(() => {
    if (!wallet) return null
    return new AnchorProvider(connection, wallet, { skipPreflight: true })
  }, [connection, wallet])

  return provider
}
