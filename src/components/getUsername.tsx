"use client";
import { useUser } from "@clerk/nextjs"

export default function GetUsername(){
    const { user } = useUser();

    return (
        <div>{user?.fullName}</div>
    );
}