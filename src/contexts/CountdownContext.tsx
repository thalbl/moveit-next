import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}){
    const{ startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime]=useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHashFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let countdownTimeout: NodeJS.Timeout;

    function startCountdown(){
        setIsActive(true);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{setTime(time-1);},1000)
        } else if (isActive && time === 0 ){
            setHashFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHashFinished(false);
    }

    return(
        <CountdownContext.Provider value={{
            minutes, 
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}