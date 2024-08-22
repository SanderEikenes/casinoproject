import supabase from '@/lib/supabase'

export async function addNewUser(clerkUserId: string) {
    try {
      const { error } = await supabase
        .from('currencylist')  // Replace with your actual table name
        .insert([{ clerk_id: clerkUserId, coins: 0 }]);
  
      if (error) {
        console.error('Error inserting new user into Supabase:', error);
      } else {
        console.log('New user added to Supabase with Clerk ID:', clerkUserId);
      }
    } catch (err) {
      console.error('Unexpected error when adding new user:', err);
    }
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