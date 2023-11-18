import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit';
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthOptions } from '@web3auth/modal';
import { EthHashInfo } from '@safe-global/safe-react-components';
import Safe, { EthersAdapter,SafeFactory, SafeAccountConfig  } from '@safe-global/protocol-kit';
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc';
import SafeApiKit from '@safe-global/api-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import {SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';
import { Box, Divider, Grid, Typography } from '@mui/material';


export default function SafeConnect() {
    const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>();
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any>(null);
    const [safeAddress, setSafeAddress] = useState<any>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    useEffect(() => {
        const initializeWeb3Auth = async () => {
            const options: Web3AuthOptions = {
                clientId: 'BFvnlMuato_-hAxXg_DFH4VVOeibwB9MWWgh4kGypPOvYQE3uZN7cAqMUBw_DVq-XWLqlGKh7O4ikZ2azPj_FAE',
                web3AuthNetwork: 'testnet',
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: '0x5',
                    rpcTarget: `https://eth-goerli.g.alchemy.com/v2/1o7cVYTpLi-AKhI7Hyiu-mZCz-suyj7U`
                },
                uiConfig: {
                    theme: 'dark',
                    loginMethodsOrder: ['google', 'facebook']
                }
            };

            const modalConfig = {
                [WALLET_ADAPTERS.TORUS_EVM]: {
                    label: 'torus',
                    showOnModal: false
                },
                [WALLET_ADAPTERS.METAMASK]: {
                    label: 'metamask',
                    showOnDesktop: true,
                    showOnMobile: false
                }
            };

            const openloginAdapter = new OpenloginAdapter({
                loginSettings: {
                    mfaLevel: 'mandatory'
                },
                adapterSettings: {
                    uxMode: 'popup',
                    whiteLabel: {
                        name: 'Safe'
                    }
                }
            });

            const web3AuthModalPack = new Web3AuthModalPack({
                txServiceUrl: 'https://safe-transaction-goerli.safe.global'
            });

            await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
            setWeb3AuthModalPack(web3AuthModalPack);
        };

        initializeWeb3Auth();
    }, []);

    useEffect(() => {
        if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
            login();
        }
    }, [web3AuthModalPack]);

    const login = async () => {
        if (!web3AuthModalPack) {
            console.log("Web3AuthModalPack not initialized");
            return;
        }

        const signInInfo = await web3AuthModalPack.signIn();
        console.log('SIGN IN RESPONSE: ', signInInfo);
        

        const userInfo = await web3AuthModalPack.getUserInfo();
        console.log('USER INFO: ', userInfo);
        setSafeAuthSignInResponse(signInInfo);
    };

    const logout = async () => {
        if (!web3AuthModalPack) {
            console.log("Web3AuthModalPack not available for logout");
            return;
        }

        await web3AuthModalPack.signOut();
        setProvider(null);
        setSafeAuthSignInResponse(null);
        console.log("Logged out");
    };

    const createSafe = async () => {
        console.log("Starting sign function");
        const _provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider());
        console.log("Provider set");
        const signer = _provider.getSigner();
        console.log("Signer set");
        const senderAddress = await signer.getAddress();
        console.log("Sender address obtained: ", senderAddress);
    
        // Setup the EthersAdapter and GelatoRelayPack
        console.log("Setting up EthersAdapter");
        const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: signer
        });
        console.log("EthersAdapter set");
    
        console.log("Setting up SafeApiKit");
        
        console.log("SafeApiKit set");
        
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
            from: senderAddress, // Optional
            gasLimit: 1000000, // Optional
            gasPrice:10000000,
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
    };

    const fundSafe = async () => {
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
    

    return (
        <div>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={createSafe}>Create Safe</button>
            <button onClick={fundSafe}>Fund Safe</button>
            <button onClick={sign}>Sign</button>
        </div>
    )
    
   
}   