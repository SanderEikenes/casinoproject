"use client";
import { parse } from "path";
import React, { useState, useCallback, use } from "react";
import MinesBoard from "./minesBoard";
import { addCoins } from "@/lib/addCoins";
import { useAuth } from "@clerk/nextjs";
import getCoinAmount from "@/lib/getCoinAmount";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TOTAL_TILES = 25;

const Mines: React.FC = () => {
    const [lavaCount, setLavaCount] = useState<string>("4");
    const [betAmount, setBetAmount] = useState<string>("10");
    const [currentWinnings, setCurrentWinnings] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const { userId } = useAuth()

    const calculateProbability = useCallback(
        (safeClicks: number) => {
            const remainingSafeTiles = TOTAL_TILES - parseInt(lavaCount) - safeClicks;
            const remainingTotalTiles = TOTAL_TILES - safeClicks;

            return (remainingSafeTiles / remainingTotalTiles);
        }, [lavaCount]
    );

    const calculatePayout = useCallback(
        (safeClicks: number) => {
            let payout = parseFloat(betAmount);
            for (let i = 0; i<safeClicks; i++) {
                payout /= calculateProbability(i);
            }
            return payout;
        }, [betAmount, calculateProbability]
    );

    const handleSafeClick = useCallback(
        (newClickCount: number) => {
            setClickCount(newClickCount);
            const newWinnings = calculatePayout(newClickCount);
            setCurrentWinnings(newWinnings);
        }, [calculatePayout]
    );

    const handleGameOver = useCallback((isHomeRun: boolean) => {
        setGameOver(true);
        if (!isHomeRun) {
            setCurrentWinnings(0);
        }
        setIsGameStarted(false);
    },[]);

    const handleStartGame = async () => {
        const lavaCountNum = parseInt(lavaCount);
        const betAmountNum = parseFloat(betAmount);
        if (!userId) return;
        const playerCoins = await getCoinAmount(userId);

        if (
            isNaN(lavaCountNum) ||
            lavaCountNum <1 ||
            lavaCountNum >= TOTAL_TILES
        ) {
            alert("Please enter a valid number of bombs");
            return;
        }

        if (isNaN(betAmountNum) || betAmountNum <= 0 || (playerCoins !== null && betAmountNum > playerCoins)) {
            alert("Please enter a valid bet amount");
            return;
        }

        addCoins(userId, -betAmountNum);
        setIsGameStarted(true);
        setGameOver(false);
        setCurrentWinnings(0);
        setClickCount(0);
    };

    const handleCashOut = () => {
        
        if(currentWinnings > parseFloat(betAmount)){
            setGameOver(true);
            setIsGameStarted(false);
            if (!userId) return;
            addCoins(userId, Math.round(currentWinnings));
        }
    };

    const handleLavaCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLavaCount(e.target.value);
    };

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(e.target.value);
    };

    return(
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-96 p-4 bg-accent rounded-lg rouded-lg">
                    <div className="mb-8">
                        <label htmlFor="lavaCount" className="block mb-2 text-left">Number of bombs</label>
                        <Input 
                            id="lavaCount"
                            type="number"
                            value={lavaCount}
                            onChange={handleLavaCountChange}
                            className="w-full px-2 border rounded-lg"
                            disabled={isGameStarted}
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="betAmount" className="block mb-2 text-left">Bet amount</label>
                        <Input 
                            id="betAmount"
                            type="number"
                            value={betAmount}
                            onChange={handleBetAmountChange}
                            className="w-full px-2 border rounded"
                            disabled={isGameStarted}
                        />
                    </div>
                    <div>

                        {isGameStarted && !gameOver && (
                            <div className="text-xl mb-4">
                                Current winnings: {currentWinnings.toFixed(2)}
                            </div>
                        )}

                        {gameOver && currentWinnings === 0 && (
                        <div className="text-xl mb-4">You lost the game</div>
                        )}

                        {gameOver && currentWinnings > 0 && (
                            <div className="text-xl mb-4">You won {currentWinnings.toFixed(2)}</div>
                        )}
                    </div>

                    <Button onClick={
                            !isGameStarted
                                ? handleStartGame
                                : currentWinnings > parseFloat(betAmount)
                                ? handleCashOut
                                : undefined
                            }
                            className={`w-full px-4 py-2 rounded ${
                                !isGameStarted
                                    ? "bg-ring text-white font-bold"
                                    : currentWinnings > parseFloat(betAmount)
                                    ? "bg-green-500 hover:bg-green-700 text-white font-bold"
                                    : "bg-gray-300 text-gray-500"
                            }`}
                            disabled={
                                isGameStarted && currentWinnings <= parseFloat(betAmount)
                            }>

                            {!isGameStarted
                            ? "Start Game"
                            : currentWinnings > parseFloat(betAmount)
                            ? "Cash Out"
                            : "Waiting to uncover tile"}
                    </Button>

                </div>

                <div className="flex flex-col items-center w-full md:w-auto">
                    <MinesBoard
                        lavaCount={parseInt(lavaCount)}
                        isGameStarted={isGameStarted}
                        onSafeClick={handleSafeClick}
                        onGameOver={handleGameOver}
                    />
                </div>

            </div>
        </div>
    );
};

export default Mines;