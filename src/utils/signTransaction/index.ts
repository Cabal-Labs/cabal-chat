import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit';
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthOptions } from '@web3auth/modal';
import { EthHashInfo } from '@safe-global/safe-react-components';
import Safe, { EthersAdapter,SafeFactory, SafeAccountConfig  } from '@safe-global/protocol-kit';
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc';
import SafeApiKit from '@safe-global/api-kit';

import {SafeTransactionDataPartial,  } from '@safe-global/safe-core-sdk-types';

import { Context } from "@/providers/provider";
import { useRouter } from "next/navigation";

const signTransaction = async (provider: any, safeAddress:any, transactionData:any) => {
    console.log("Start of sign function");

    const signer = provider.getSigner();
    console.log("Signer obtained");

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
    });
    console.log("EthAdapter created");

    
    console.log("SafeAddress obtained");

    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress
    })
    console.log("SafeSDK created");

 
    console.log("SafeApiKit created");


    const safeTransactionData: SafeTransactionDataPartial = transactionData

    console.log("SafeTransactionData created");
 
    const safeTransaction = await safeSDK.createTransaction({ safeTransactionData })
    console.log("SafeTransaction created");
   

    console.log("Executing transaction");
    const executeTxResponse = await safeSDK.executeTransaction(safeTransaction)
    console.log("Transaction executed");
    
    console.log("Waiting for receipt");
    const receipt = await executeTxResponse.transactionResponse?.wait()
    console.log("Receipt obtained");

    console.log('Transaction executed:')
    console.log(`https://goerli.etherscan.io/tx/${receipt?.transactionHash}`)
    
}

export {
    signTransaction
}
