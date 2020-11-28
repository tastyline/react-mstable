import { useState, useEffect } from 'react';

const contracts = {
  1: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
  42: '0x70605Bdd16e52c86FC7031446D995Cf5c7E1b0e7' 
}

function useContract(chainId) {
  const [contractId, setContactId] = useState(1);

  useEffect(() => {
    setContactId(contracts[Number(chainId) || 1])
  }, [chainId]);

  return contractId;
}

export default useContract