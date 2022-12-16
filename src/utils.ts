import md5 from 'md5'
import localforage from 'localforage'
import { web3 } from '@project-serum/anchor'

export const hashMd5 = (base64: string) => {
  return md5(base64)
}

export type ContractMetadata = {
  hash: string
  title: string
  description: string
  thumbnail: string
}
export class MetadataService {
  static backupFile = async (hash: string, data: string) => {
    return localforage.setItem(`FILE:${hash}`, data)
  }

  static getFile = async (hash: string) => {
    return localforage.getItem<string>(`FILE:${hash}`)
  }

  static backupMetadata = async (hash: string, metaData: ContractMetadata) => {
    return localforage.setItem(`METADATA:${hash}`, metaData)
  }

  static getMetadata = async (hash: string) => {
    return localforage.getItem<ContractMetadata>(`METADATA:${hash}`)
  }
}

export var isAddress = function (address: any) {
  if (!address) return false
  try {
    var publicKey = new web3.PublicKey(address)
    if (!publicKey) throw new Error('Invalid public key')
    return true
  } catch (er) {
    return false
  }
}

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}

export const explorer = (addressOrTxId: string): string => {
  if (isAddress(addressOrTxId)) {
    return `https://solscan.io/account/${addressOrTxId}?cluster=devnet`
  }
  return `https://solscan.io/tx/${addressOrTxId}?cluster=devnet`
}
