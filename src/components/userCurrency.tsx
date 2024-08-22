'use client'

import React,{ useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSpring, animated } from '@react-spring/web'
import supabase from '@/lib/supabase'


function Number({coinAmount}: {coinAmount: number}) {
  const countAnimation = useSpring({
      number: coinAmount,
      from: { number: 0 },
      config: {
          mass: 1,
          tension: 20,
          friction: 10
      }
  });

  const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(Math.floor(val));
  return (<animated.div className=" text-base">{countAnimation.number.to(val => formatNumber(val))}</animated.div>);
}

export default function UserCurrency() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastCoinAmount, setLastCoinAmount] = useState(null);
  const [coins, setCoins] = useState<any>([])
  const { userId } = useAuth()
  
  supabase
    .channel('realtime:currencylist')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'currencylist'
    }, (payload: any) => {
      fetchCoins()
    })
    .subscribe();

  useEffect(() => {
    fetchCoins()
  }, [userId])

  const fetchCoins = async () => {
    setIsLoading(true)
    const { data } = await supabase.from('currencylist').select("coins").eq('clerk_id', userId)
    if (data && data.length > 0) {
      setLastCoinAmount(coins.length > 0 ? coins[0].coins : null); // Save the last coin amount
      setCoins(data);
    }
    setIsLoading(false)
  }



  const numberOfCoins = coins.length > 0 ? coins[0].coins : "No coins found";

  return (
    <div className='flex font-medium'>
      <Number coinAmount={numberOfCoins}/>
      <p className="ml-1 text-base">coins</p>
    </div>
  )
}