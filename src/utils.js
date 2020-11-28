export const to64Bytes = (web3, hex) => {
  const padded = web3.utils.padLeft(hex, 64)
  return padded.substring(2)
}


export const toHex = (web3, value) => {
  return web3.utils.toHex(value)
}