/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { listings, listingsLoading, status } from '../../hooks/useListings'
import listingContractAbi from '@/app/abi/listingContractAbi'
import { listingContractAddress } from '@/utils/constants'

const app = new Frog({
  title: 'm3terscan-frame',
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

let index: number;
let singleMeter: any;

app.frame('/', async (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  const query = c.req.query()
  const id = query?.id

  singleMeter = listings?.find((meter: any, i:number)=>{
    index = i
    return meter.tokenId == id
  })

  console.log(singleMeter, index)

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img src={`https://m3ters.ichristwin.com/api/m3ter-head/png/${id || fruit || "hello"}`} />
      </div>
    ),
    intents: [
      singleMeter ? <Button.Transaction target='/buy'>Buy</Button.Transaction> : <Button>M3ter not available</Button>,
    ],
  })
})

app.transaction("/buy", (c)=>{
    return c.contract({
      abi: listingContractAbi,
      chainId: 'eip155:11155111',
      functionName: 'purchaseListing',
      to: listingContractAddress,
      args: [index],
      value: singleMeter.price
    })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
