"use client";

import { addCoins } from "@/lib/addCoins"
import { useAuth } from '@clerk/nextjs'
import { Input } from "./ui/input";
import { use } from "react"
import { Button } from "./ui/button";

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
            <Input type="text" id="coinAmount" placeholder="Enter amount" />
            <Button onClick={addCoinsHere} className="mt-4">Add Coins</Button>
        </div>
    )
}