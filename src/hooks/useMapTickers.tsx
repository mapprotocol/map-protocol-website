import axios from "axios"
import { useState, useEffect } from "react"
import { getData } from "../utils/cache"
import { absoluteDecimal } from "../utils/number"

interface TickersInfo {
  logo: string
  name: string
  pairs: string
  price: number
  cost_to_move_up_usd: number
  cost_to_move_down_usd: number
  volume: number
}


export const useMapTickers = () => {
  const [mapTickers, setMapTickers] = useState<Array<TickersInfo>>([])
  useEffect(() => {
    ; (async () => {
      try {
        const data = await getData<{ tickers: [] }>(
          "https://api.coingecko.com/api/v3/coins/marcopolo/tickers?include_exchange_logo=true&depth=true"
        )
        const {
          tickers,
        } = data
        if (!tickers) throw new Error("Unable to fetch Map tickers from CoinGecko")
        let tickerArray: Array<TickersInfo> = []
        tickers.forEach((item: any) => {
          if(item.market.identifier !=='uniswap_v3')
          tickerArray.push(
            {
              logo: item.market.logo,
              name: item.market.name,
              pairs: item.base + "/" + item.target,
              price: item.converted_last.usd,
              cost_to_move_up_usd: absoluteDecimal(item.cost_to_move_up_usd, 0),
              cost_to_move_down_usd: absoluteDecimal(item.cost_to_move_down_usd, 0),
              volume: absoluteDecimal(item.converted_volume.usd, 0)
            }
          )
        })
        setMapTickers(tickerArray)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return mapTickers
}
