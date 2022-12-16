import { Program, web3 } from '@project-serum/anchor'
import { useMemo } from 'react'
import { useAnchorProvider } from './useAnchor'

const PROGRAM_ID = new web3.PublicKey(
  '33eJhB9P4Kmf51MUpRgpJpdDab2MWP9FmpVHrASspJ3B',
)
export const useProgram = () => {
  const provider = useAnchorProvider()

  const program = useMemo(() => {
    if (!provider) return null
    return new Program(IDL, PROGRAM_ID, provider)
  }, [provider])
  return program
}

export const PROGRAMS = {
  rent: web3.SYSVAR_RENT_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
}

export const deriveContractAddress = async (hash: number[]) => {
  const [contract] = await web3.PublicKey.findProgramAddressSync(
    [Buffer.from('contract'), Buffer.from(hash)],
    PROGRAM_ID,
  )
  return contract
}

export const deriveSignerAddress = async (
  contract: web3.PublicKey,
  owner: web3.PublicKey,
) => {
  const [signer] = await web3.PublicKey.findProgramAddressSync(
    [Buffer.from('signer'), contract.toBuffer(), owner.toBuffer()],
    PROGRAM_ID,
  )
  return signer
}

export type SolShieldSdk = {
  version: '0.1.0'
  name: 'sol_shield_sdk'
  instructions: [
    {
      name: 'createContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'hash'
          type: {
            array: ['u8', 16]
          }
        },
        {
          name: 'expiredAt'
          type: 'i64'
        },
      ]
    },
    {
      name: 'createSigner'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'contractSignerAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'contractSigner'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'activeContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'signContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'contractSigner'
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: 'contractSigner'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'contract'
            type: 'publicKey'
          },
          {
            name: 'state'
            type: {
              defined: 'ContractSignerState'
            }
          },
        ]
      }
    },
    {
      name: 'contract'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'hash'
            type: {
              array: ['u8', 16]
            }
          },
          {
            name: 'expiredAt'
            type: 'i64'
          },
          {
            name: 'totalSigner'
            type: 'u8'
          },
          {
            name: 'totalSigned'
            type: 'u8'
          },
          {
            name: 'state'
            type: {
              defined: 'ContractState'
            }
          },
        ]
      }
    },
  ]
  types: [
    {
      name: 'ContractSignerState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Uninitialized'
          },
          {
            name: 'Initialized'
          },
          {
            name: 'Singed'
          },
        ]
      }
    },
    {
      name: 'ContractState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Uninitialized'
          },
          {
            name: 'Initialized'
          },
          {
            name: 'Processing'
          },
          {
            name: 'Approved'
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: 'Overflow'
      msg: 'Operation overflowed'
    },
    {
      code: 6001
      name: 'InvalidState'
      msg: 'Invalid contract State'
    },
    {
      code: 6002
      name: 'InvalidPermission'
      msg: 'Not have permission'
    },
  ]
}

export const IDL: SolShieldSdk = {
  version: '0.1.0',
  name: 'sol_shield_sdk',
  instructions: [
    {
      name: 'createContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'hash',
          type: {
            array: ['u8', 16],
          },
        },
        {
          name: 'expiredAt',
          type: 'i64',
        },
      ],
    },
    {
      name: 'createSigner',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contractSignerAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'contractSigner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'activeContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'signContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contractSigner',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'contractSigner',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'contract',
            type: 'publicKey',
          },
          {
            name: 'state',
            type: {
              defined: 'ContractSignerState',
            },
          },
        ],
      },
    },
    {
      name: 'contract',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'hash',
            type: {
              array: ['u8', 16],
            },
          },
          {
            name: 'expiredAt',
            type: 'i64',
          },
          {
            name: 'totalSigner',
            type: 'u8',
          },
          {
            name: 'totalSigned',
            type: 'u8',
          },
          {
            name: 'state',
            type: {
              defined: 'ContractState',
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ContractSignerState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Singed',
          },
        ],
      },
    },
    {
      name: 'ContractState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Processing',
          },
          {
            name: 'Approved',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Overflow',
      msg: 'Operation overflowed',
    },
    {
      code: 6001,
      name: 'InvalidState',
      msg: 'Invalid contract State',
    },
    {
      code: 6002,
      name: 'InvalidPermission',
      msg: 'Not have permission',
    },
  ],
}
