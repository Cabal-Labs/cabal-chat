
import { ethers } from 'ethers';


const fundSafe = async (web3AuthModalPack:any,safeAuthSignInResponse:any ) => {
    const _provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider());
    const signer = _provider.getSigner();

    const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString()
    const transactionParameters = {
        to: safeAuthSignInResponse.safes[0],
        value: safeAmount
    }

    const tx = await signer.sendTransaction(transactionParameters);
    console.log('Fundraising.')
    console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
    
}