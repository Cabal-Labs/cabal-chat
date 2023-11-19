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

const sign = async () => {
    console.log("Start of sign function");
    const _provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider());
    console.log("Provider obtained");
    const signer = _provider.getSigner();
    console.log("Signer obtained");

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
    });
    console.log("EthAdapter created");
    const safeAddress:string = safeAuthSignInResponse.safes[0]
    console.log("SafeAddress obtained");

    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress
    })
    console.log("SafeSDK created");

 
    console.log("SafeApiKit created");

    const destination = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
    console.log("Destination set");
    const amount = ethers.utils.parseUnits('0.005', 'ether').toString()
    console.log("Amount set");

    const safeTransactionData: SafeTransactionDataPartial = {
    to: destination,
    data: '0x',
    value: amount
    }
    console.log("SafeTransactionData created");
    // Create a Safe transaction with the provided parameters
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
