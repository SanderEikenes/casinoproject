"use client";
import { useUser } from "@clerk/nextjs"

export default function getUser(){
    const { user } = useUser();
    return (user);
}