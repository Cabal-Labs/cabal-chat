
import { ethers } from 'ethers';

import  { EthersAdapter,SafeFactory, SafeAccountConfig  } from '@safe-global/protocol-kit';



import { Context } from "@/providers/provider";


import { useContext, useEffect } from 'react';
import { Console } from 'console';
import { useRouter } from "next/navigation";


export default function CreateSafe() {
    const router = useRouter();
    const {
		web3AuthModalPack
	} = useContext(Context);

    useEffect(()=>{
        console.log(Context);
    },[Context.toString()])

    const safeFact = async () => {
        try{
            console.log("Starting sign function");
            const _provider = new ethers.providers.Web3Provider(web3AuthModalPack?.getProvider());
            console.log("Provider set");
            const signer = _provider.getSigner();
            console.log("Signer set");
            const senderAddress = await signer.getAddress();
            console.log("Sender address obtained: ", senderAddress);

        
            console.log("Setting up EthersAdapter");
            const ethAdapter = new EthersAdapter({
                ethers,
                signerOrProvider: signer
            });
         
            
            console.log("Creating SafeFactory");
            const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapter })
            console.log("SafeFactory created");

            console.log("Setting up SafeAccountConfig");
            const safeAccountConfig: SafeAccountConfig = {
                owners: [
                senderAddress,
                ],
                threshold: 1,
            }
            console.log("SafeAccountConfig set");

            const options:any = {
                from: senderAddress, 
                gasLimit: 1000000, 
                gasPrice: 10000000,
            }
            console.log("Deploying Safe");
            const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, options })
            console.log("Safe deployed");
            
            console.log("Getting Safe address");
            const safeAddress = await safeSdkOwner1.getAddress()
            console.log("Safe address obtained: ", safeAddress);

            console.log('Your Safe has been deployed:')
            console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
            console.log(`https://app.safe.global/gor:${safeAddress}`)
            console.log("End of sign function");
            router.push("/fund")
        }catch (e){
            console.log(e);
        }
    };


    return(
        <>
            <button
                onClick={() => safeFact() }
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            >
                Connect Account
            </button>
        </>
    )
}
