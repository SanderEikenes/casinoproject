import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { UserCircle, Users, User, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
  

export default function Chat() { 
    return(
        <div className="flex flex-col bg-secondary p-4 rounded-lg my-4 mx-4">
            <div className="my-4">
                <h1 className="flex gap-2"><Users size={24}/>CHAT</h1>
                <p className="flex gap-1 items-center text-ring"><User size={16}/> 50 players online</p>
            </div>

            <div>
                <Card>
                    <CardTitle className="text-base font-semibold flex items-center gap-2 p-4"><UserCircle size={24} /> Username</CardTitle>
                    <CardContent>
                        <p>Hello, this is an example chat message!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardTitle className="text-base font-semibold flex items-center gap-2 p-4"><UserCircle size={24} /> Username2</CardTitle>
                    <CardContent>
                        <p>Hello, this is an example chat message!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardTitle className="text-base font-semibold flex items-center gap-2 p-4"><UserCircle size={24} /> Username3</CardTitle>
                    <CardContent>
                        <p>Hello, this is an example chat message!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardTitle className="text-base font-semibold flex items-center gap-2 p-4"><UserCircle size={24} /> Username4</CardTitle>
                    <CardContent>
                        <p>Hello, this is an example chat message!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="my-4 flex items-center gap-2">
                <div className="flex h-16 items-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <Input placeholder="Type your message here" className="border-0"/>
                    <Send size={24} className="text-ring mx-4"/>
                </div>
            </div>
        </div>
    )
}