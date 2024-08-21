import supabase from '@/lib/supabase'

export async function addCoins(userId: string, coinsToAdd: number) {
    const { data } = await supabase.from('currencylist').select("coins").eq('clerk_id', userId)
    console.log('current coins: ' + data)
    console.log('User added coins with ID: ' + userId)
    if (!data) return;
    const currentCoins = data[0].coins

    const { error } = await supabase
        .from('currencylist')
        .update({ coins: currentCoins+coinsToAdd })
        .eq('clerk_id', userId)
    console.log('added coins: ' + coinsToAdd)
};