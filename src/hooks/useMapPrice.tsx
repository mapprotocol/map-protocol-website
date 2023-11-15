import axios from "axios"
import { useState, useEffect } from "react"
import { getData } from "../utils/cache"
import { absoluteDecimal } from "../utils/number"


type price = {
  usd: number,
  usd_24h_change: number
}

export const useMapPrice = (): price & { simbol: number } => {
  const [mapPrice, setMapPrice] = useState<price & { simbol: number }>(
    {
      usd: 0,
      usd_24h_change: 0,
      simbol: 1
    }
  )
  useEffect(() => {
    ; (async () => {
      try {
        const data = await getData<{ marcopolo: price }>(
          "https://api.coingecko.com/api/v3/simple/price?ids=marcopolo&vs_currencies=usd&include_24hr_change=true"
        )
        const {
          marcopolo: { usd, usd_24h_change },
        } = data
        if (!usd) throw new Error("Unable to fetch Map price from CoinGecko")
        setMapPrice({
          usd: absoluteDecimal(usd, 6),
          usd_24h_change: absoluteDecimal(usd_24h_change, 2),
          simbol: usd_24h_change > 0 ? 1 : 0
        })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return mapPrice
}
