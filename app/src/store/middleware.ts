import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { BN } from 'bn.js'

// Need it cause https://github.com/GoogleChromeLabs/jsbi/issues/30
declare global {
  interface BigInt {
    toJSON: (this: bigint) => string
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString()
}

const isPlain = (val: any): boolean => {
  const isPlainObject = (obj: object): boolean => {
    if (obj === null) return false
    const proto = Object.getPrototypeOf(obj)
    return proto !== null && Object.getPrototypeOf(proto) === null
  }
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val) ||
    typeof val === 'bigint' ||
    val instanceof PublicKey ||
    val instanceof BN ||
    Buffer.isBuffer(val)
  )
}
const middleware = createSerializableStateInvariantMiddleware({
  isSerializable: isPlain,
})

export default middleware
