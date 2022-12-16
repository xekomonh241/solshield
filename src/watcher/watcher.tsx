import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Program, web3 } from '@project-serum/anchor'
import bs58 from 'bs58'
import camelcase from 'camelcase'
import { sha256 } from 'js-sha256'

type UseWatcherProps = {
  program: Program<any>
  name: keyof UseWatcherProps['program']['account']
  filter: web3.GetProgramAccountsFilter[]
  upset: (key: string, value: any) => void
  init: (bulk: Record<string, any>) => void
}

const encodeIxData = bs58.encode
export const accountDiscriminator = (name: string): Buffer => {
  return Buffer.from(
    sha256.digest(`account:${camelcase(name, { pascalCase: true })}`),
  ).slice(0, 8)
}

const GLOBAL_WATCHER: Record<string, boolean> = {}

const Watcher = (props: UseWatcherProps) => {
  const { program, name, filter, upset, init } = props
  const [watchId, setWatchId] = useState(0)

  const { accountClient, connection } = useMemo(() => {
    const accountClient = program?.account?.[name]
    const connection = accountClient.provider.connection
    return { accountClient, connection }
  }, [name, program?.account])

  const fetchData = useCallback(async () => {
    if (GLOBAL_WATCHER[name] !== undefined) return
    try {
      GLOBAL_WATCHER[name] = true

      const accountInfos = await accountClient.all(filter)
      const bulk: any = {}
      for (const info of accountInfos) {
        bulk[info.publicKey.toBase58()] = info.account
      }
      await init(bulk)
    } catch (error) {
      console.log(error)
    } finally {
      GLOBAL_WATCHER[name] = false
    }
  }, [accountClient, filter, init, name])

  const watchData = useCallback(async () => {
    if (watchId) return
    const newWatcherId = connection.onProgramAccountChange(
      accountClient.programId,
      async (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = program.coder.accounts.decode(name, buffer)
        upset(address, accountData)
      },
      'confirmed',
      [
        { dataSize: accountClient.size },
        {
          memcmp: {
            offset: 0,
            bytes: encodeIxData(accountDiscriminator(name)),
          },
        },
        ...filter,
      ],
    )
    setWatchId(newWatcherId)
  }, [
    accountClient.programId,
    accountClient.size,
    connection,
    filter,
    name,
    program.coder.accounts,
    upset,
    watchId,
  ])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await connection.removeProgramAccountChangeListener(watchId)
      })()
    }
  }, [connection, watchData, watchId])

  return <Fragment />
}

export default Watcher
