import { AppProps } from 'next/app'
import { useState } from 'react';

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const[level, setLevel] = useState(1);

  function levelUp(){
    
  }
  
  return (
  <Component {...pageProps} />
  )
}