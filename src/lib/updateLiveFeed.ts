import supabase from '@/lib/supabase'

export default async function updateLiveFeed(game: any, imageurl: any, username: any, betamount: any, profitamount: any) {
    console.log('Live feed data: ', game, imageurl, username, betamount, profitamount)
    const { data } = await supabase
    .from('livefeed')
    .insert([{ game: game, imageurl: imageurl, username: username, betamount: betamount, profitamount: Math.round(profitamount) }])
    console.log('Live feed updated')
}