import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const web3 = createAlchemyWeb3(process.env.REACT_APP_API_URL);

export default web3