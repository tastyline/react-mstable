import React, { useState, useEffect, Fragment } from 'react';
import MTip from './components/mTip/mTip';
import web3 from './api';
import { useWallet } from 'use-wallet';
import useContract from './hooks/useContract';
import './App.css';

window.api = web3;
const tipAddr = '0x535824c63D3421C703cB022aba55c321a6e30Bf4'
const DAI = '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa'

const App = () => {
  const wallet = useWallet();

  const [dai, setDai] = useState(0);
  const [musd, setMusd] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const contract = useContract(42);

  useEffect(() => {
    const fetch = async () => {
      if (wallet && wallet.status === 'connected') {
        console.log(
          "🚀 ~ file: App.js ~ line 15 ~ useEffect ~ wallet.status === 'connected'",
          wallet.balance, wallet.address, wallet.account
        );
        setWalletConnected(true);
        web3.alchemy.getTokenBalances(
          wallet.account,
          [contract, DAI]
        ).then((value) => {
          setMusd(web3.utils.fromWei(value.tokenBalances[0].tokenBalance, 0))
          setDai(web3.utils.fromWei(value.tokenBalances[1].tokenBalance, 0))
        }, console.warn);
        // setMusd(res.tokenBalances[0].tokenBalance);
      }
    };
    fetch()
  }, [wallet, contract]);

  const handleClick = (value) => {
    console.log('[YAY]',value);
  };

  const handleError = (err) => {
    console.warn('[Error]', err);
  };

  return (
    <div className='App'>
      <header className='App-header'>mTip Demo</header>
      {walletConnected ? (
        <div>
          <div>DAI: {dai}</div>
          <div>mUSD: {musd}</div>
        </div>
      ) : (
        <button onClick={() => wallet.connect()}>MetaMask</button>
      )}
      {walletConnected && <MTip
        myAddress={wallet.account}
        web3={web3}
        balance={1}
        onClick={handleClick}
        address={tipAddr}
        onError={handleError}
      />}
    </div>
  );
};

export default App;
