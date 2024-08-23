"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useAuth } from '@clerk/nextjs'
import { useUser } from "@clerk/nextjs"
import supabase from '@/lib/supabase'
import { UserCircle, Users, User, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import Image from "next/image";
  

export default function Chat() { 
    const [chatMessage, setChatMessage] = useState<string>("");
    const { userId } = useAuth()
    const {user} = useUser();
    const [messages, setMessages] = useState<any>([])

    supabase
    .channel('realtime:chatmessages')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'chatmessages'
    }, (payload: any) => {
      updateChat()
    })
    .subscribe();

    const updateChat = async () => {
        const { data } = await supabase.from('chatmessages').select("*")
        if (data && data.length > 0) {
            console.log(data[0].chat_content)
            setMessages(data)
        }
    }

    useEffect(() => {
        updateChat();
    }, []);

    const sendChatMessage = async () => {
        const message = chatMessage
        if (!message) return;
        const { error } = await supabase
        .from('chatmessages')
        .insert([{ chat_content: message, clerk_id: userId, username: user?.username, profileimage: user?.imageUrl }])
        console.log("Error: ", error)
    }

    const handleChatMessageChange = (e: any) => {
        setChatMessage(e.target.value)
    }

    return(
        <div className="flex flex-col w-4/12 bg-secondary p-4 rounded-lg my-4 mx-4">
            <div className="my-4">
                <h1 className="flex gap-2"><Users size={24}/>CHAT</h1>
                <p className="flex gap-1 items-center text-ring"><User size={16}/> 50 players online</p>
            </div>

            <div>
                {messages.slice(-5).map((message: any, index: any) => (
                    <Card key={index}>
                        <CardTitle className="text-base font-semibold flex items-center gap-2 p-4"><Image src={message.profileimage} alt="profileimage" width={28} height={28} className="rounded-full"/> {message.username}</CardTitle>
                        <CardContent>
                            <p>{message.chat_content}</p>
                        </CardContent>
                    </Card>
                ))}

            </div>

            <div className="my-4 flex items-center gap-2">
                <div className="flex h-16 items-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <Input placeholder="Type your message here" disabled={!user} id="chatMessage" className="border-0" onChange={handleChatMessageChange} value={chatMessage}/>
                    <Button onClick={sendChatMessage} className="bg-transparent hover:bg-transparent hover: text-white hover:scale-125 transition-transform duration-200 font-semibold px-4 py-2 rounded-md"><Send size={24} className="text-ring mx-4"/></Button>
                    
                </div>
            </div>
        </div>
    )
}