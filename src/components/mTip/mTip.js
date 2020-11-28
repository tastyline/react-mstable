import React from 'react';
import './mTip.css';
import { to64Bytes, toHex } from '../../utils';

const mTip = ({
  balance,
  onClick,
  disabled,
  web3,
  address,
  onError,
  myAddress,
}) => {
  const handleClick = () => {
    const value = web3.utils.toWei(String(balance), 0)
    const prefix = '0xa9059cbb';
    const addr = to64Bytes(web3, address);
    const v = to64Bytes(web3, toHex(web3, value))
    const to = '0x70605Bdd16e52c86FC7031446D995Cf5c7E1b0e7';
    console.log(myAddress)
    web3.eth
      .sendTransaction({
        to,
        from: myAddress,
        data: prefix + addr + v
      })
      .then(onClick, onError);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className='general-button'
    >
      tip {balance} mUSD
    </button>
  );
};

export default mTip;
