import supabase from '@/lib/supabase'

export async function addNewUser(userId: string) {
    console.log("Is this ever ran???");
    try {
        const { data, error } = await supabase
            .from('currencylist')
            .insert([{ clerk_id: userId, coins: 0 }]);
        
        if (error) {
            console.error("Add Error: ", error);
        } else {
            console.log('User added to database. ID: ' + userId, data);
        }
    } catch (err) {
        console.error("Unexpected Error: ", err);
    }
    return;
}

export async function deleteUser(userId: string) {
    console.log("Is this ever ran??? Deleted")
    const { error } = await supabase
        .from('currencylist')
        .delete()
        .eq('clerk_id', userId)
    
    if (error) {console.log("Delete Error: ", error)}else{console.log('User deleted from database. ID: ' + userId)}
    
    return;
}