"use client"

import supabase from '@/lib/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function LiveFeed() {

    const [liveFeed, setLiveFeed] = useState<any>([])


    supabase
    .channel('realtime:livefeed')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'livefeed'
    }, (payload: any) => {
        console.log(payload)
        updateLiveFeed()
    })
    .subscribe();

    const updateLiveFeed = async () => {
        const { data } = await supabase.from('livefeed').select("*")
        if (data && data.length > 0) {
            console.log(data)
            setLiveFeed(data)
        }
    }

    useEffect(() => {
        updateLiveFeed();
    }, []);

    return (
        <div>
            <h1 className='text-2xl my-4'>Live feed</h1>
            <div className='mx-8 flex justify-between'>
                <h2>Game</h2>
                <h2>User</h2>
                <h2>Bet</h2>
                <h2>Profit</h2>
            </div>

            <div>
                {liveFeed.map((feed: any, index: number) => {
                    return (
                        <div key={index} className='flex justify-between mx-8 bg-secondary p-4 rounded-lg my-4'>
                            <h2>{feed.game}</h2>
                            <div className='flex gap-2'>
                                <Image src={feed.imageurl} className='rounded-full' alt='game' width={30} height={30} />
                                <h2>{feed.username}</h2>
                            </div>
                            <h2>{feed.betamount}</h2>
                            <h2>{feed.profitamount}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}