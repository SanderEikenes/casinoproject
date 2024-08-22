"use client";
import { initialize } from 'next/dist/server/lib/render-server';
import React, { useEffect, useState } from 'react'

type tileState = "hidden" | "gem" | "lava";

interface minesBoardProps {
    lavaCount: number;
    onSafeClick: (clickCount: number) => void;
    onGameOver: (isHomeRun: boolean) => void;
    isGameStarted: boolean;
}

const MinesBoard: React.FC<minesBoardProps> = ({
    lavaCount,
    onSafeClick,
    onGameOver,
    isGameStarted,
}) => {
    const [gameState, setGameState] = useState<tileState[]>(
        Array(25).fill("hidden")
    );
    const [lavaPositions, setLavaPositions] = useState<Set<number>>(new Set());
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (isGameStarted) {
            initializeGame();
        }
    }, [isGameStarted, lavaCount]);

    const initializeGame = () => {
        const newGameState = Array(25).fill("hidden");
        const newLavaPositions = new Set<number>();
        while (newLavaPositions.size < lavaCount) {
            const randomPosition = Math.floor(Math.random() * 25);
            newLavaPositions.add(randomPosition);
        }
        setGameState(newGameState);
        setLavaPositions(newLavaPositions);
        setClickCount(0);
    };

    const handleCircleClick = (index: number) => {
        if (gameState[index] !== "hidden" || !isGameStarted) {
            return;
        }

        const newGameState = [...gameState];
        if (lavaPositions.has(index)) {
            newGameState[index] = "lava";
            setGameState(newGameState);
            onGameOver(false);
        } else {
            newGameState[index] = "gem";
            setGameState(newGameState);
            const newClickCount = clickCount + 1;
            setClickCount(newClickCount);
            onSafeClick(newClickCount);

            if (newClickCount === 25 - lavaCount) {
                onGameOver(true);
            }
        }
    };

    useEffect(() => {
        if (!isGameStarted) {
            const finalGameState = [...gameState];
            lavaPositions.forEach((pos) => {
                finalGameState[pos] = "lava";
            });
            setGameState(finalGameState);
        }
    }, [isGameStarted, lavaCount]);

    return(
        <div className='w-full max-w-xl mx-auto'>
            <div className='grid grid-cols-5 sm:grid-cols-5 gap-1 sm:gap-2 md:gap-3 bg-accent p-8 sm:p-3 md:p-8 md:px-16 rounded-lg'>
                {gameState.map((state, index) => (
                    <div
                        key={index}
                        className={`aspect-square rounded-lg cursor-pointer w-10 h-10 sm:w-14 sm:h-14
                                    md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center
                                    ${
                                        state === "hidden" ? "bg-white border-2 border-gray-300" : state === "gem" ? "bg-green-500 " : "bg-red-500"
                                    }
                                    ${isGameStarted && state=== "hidden" ? "hover:bg-gray-200" : ""}
                                `}
                        onClick={() => handleCircleClick(index)}
                    />
                ))}
            </div>

        </div>
    );
};

export default MinesBoard;