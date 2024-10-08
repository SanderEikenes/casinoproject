import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import supabase from '@/lib/supabase'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  console.log('WEBHOOK_SECRET:', WEBHOOK_SECRET)

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)

  if (eventType === 'user.created') {
    console.log('User created with id: ', evt.data.id)
    const { error } = await supabase
    .from('currencylist')
    .insert([{ clerk_id: evt.data.id, coins: 0, username: evt.data.username }])
    if (error) {
      console.error('Error adding user to database:', error)
    } else {
      console.log('User added to database with ID: ', evt.data.id)
    }
  }

  if (eventType === 'user.deleted') {
    console.log('User deleted with id: ', evt.data.id)
    if (evt.data.id) {
      const { error } = await supabase
        .from('currencylist')
        .delete()
        .eq('clerk_id', evt.data.id)
    } else {
      console.error('Invalid user ID')
    }
  }

  return new Response('', { status: 200 })
}