"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import next from "next";

export default function LuckyWheel() {
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(0);
    const [lastWinner, setLastWinner] = useState<number>(0);

    function calculateRotation() {
        console.log("Last winner: ", lastWinner+1);
        const segments = 8;
        const degree = 360 / segments;
        let start_angle = (lastWinner-1)*degree;
        let nextWinner = getWinner();
        console.log("Next winner: ", nextWinner+1);
        let end_angle = (nextWinner-1)*degree;
        setLastWinner(nextWinner);
        let clockwise = (end_angle - start_angle) % 360;
        console.log("rotate by: ", clockwise);
        return clockwise;
    }

    function getWinner() {
        const segments = 8;
        const degree = 360 / segments;
        const index = Math.floor(Math.random() * segments);
        return index;
    }

    function spinWheel() {
        console.log("Current rotation: ", rotation);
        
        const rotationDegrees = calculateRotation();
        setIsSpinning(true);
        setRotation(prevRotation => (prevRotation - rotationDegrees)+1800); // Increase rotation by 50 degrees
        setTimeout(() => {
            setIsSpinning(false);
            
        }, 5000);
    }
    
    return (
        <div className="flex flex-col items-center">
            <div style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 2s ease-out' }}>
                <Image  src="/spinwheel.png" width={300} height={300} alt="wheel" />
            </div>

            <Button className="mt-20" onClick={spinWheel}>Spin!</Button>
        </div>
    )

}