import supabase from "./supabase";

export default async function getCoinAmount(userId: string): Promise<number | null> {
    const { data } = await supabase
    .from('currencylist')
    .select('coins')
    .eq('clerk_id', userId)
    if (!data) return null;
    let coinsNum = data[0].coins;
    return coinsNum;
}