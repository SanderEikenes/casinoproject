import supabase from '@/lib/supabase'

export async function addNewUser(userId: string) {
    console.log('User added with ID: ' + userId)
    const { error } = await supabase
        .from('currencylist')
        .insert([{ clerk_id: userId, coins: 50 }])
    return;
}

export async function deleteUser(userId: string) {
    console.log('User deleted with ID: ' + userId)
    const { error } = await supabase
        .from('currencylist')
        .delete()
        .eq('clerk_id', userId)
    return;
}