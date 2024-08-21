"use client";

import { addCoins } from "@/lib/addCoins"
import { useAuth } from '@clerk/nextjs'
import { use } from "react"

export default function CoinBank() {
    const { userId } = useAuth()

    const addCoinsHere = async () => {
        const coinAmount = document.getElementById('coinAmount') as HTMLInputElement
        const coinsToAdd = parseInt(coinAmount.value)
        if (!userId) return;
        addCoins(userId, coinsToAdd)
    }

    return (
        <div>
            <input type="text" id="coinAmount" placeholder="Enter amount" />
            <button onClick={addCoinsHere}>Add Coins</button>
        </div>
    )
}