import supabase from '@/lib/supabase'

export async function addNewUser(userId: string) {
    const { error } = await supabase
        .from('currencylist')
        .insert([{ clerk_id: userId, coins: 50 }])
    if (error) {console.log("Error: ", error)}else{console.log('User added to database. ID: ' + userId)}
    return;
}

export async function deleteUser(userId: string) {
    const { error } = await supabase
        .from('currencylist')
        .delete()
        .eq('clerk_id', userId)
    
    if (error) {console.log("Error: ", error)}else{console.log('User deleted from database. ID: ' + userId)}
    
    return;
}