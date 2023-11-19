import { useState, useEffect, useContext } from 'react';
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit';
import {  CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthOptions } from '@web3auth/modal';


import { Context } from "@/providers/provider";
import { useRouter } from "next/navigation";


export default function SafeConnect() {

    const [localWeb3AuthModalPack, setLocalWeb3AuthModalPack] = useState<any>();
    const router = useRouter();
	const {
		setWeb3AuthModalPack,
		//setSafeAuthSignInResponse,
		setEthProvider,
	} = useContext(Context);

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
            setLocalWeb3AuthModalPack(web3AuthModalPack);
        };

        initializeWeb3Auth();
    }, []);
    useEffect(() => {
        if (localWeb3AuthModalPack && localWeb3AuthModalPack.getProvider()) {
            login();
        }
    }, [localWeb3AuthModalPack]);




    const login = async () => {
        if (!localWeb3AuthModalPack) {
            console.log("Web3AuthModalPack not initialized");
            return;
        }

        const signInInfo = await localWeb3AuthModalPack.signIn();
        console.log('SIGN IN RESPONSE: ', signInInfo);
        

        const userInfo = await localWeb3AuthModalPack.getUserInfo();
        console.log('USER INFO: ', userInfo);
        //setSafeAuthSignInResponse(signInInfo);

        if(signInInfo.safes[0]){
            router.push("/chat")
        }else{
            router.push("/connect")
        }
        
    };

    const logout = async () => {
        if (!localWeb3AuthModalPack) {
            console.log("Web3AuthModalPack not available for logout");
            return;
        }

        await localWeb3AuthModalPack.signOut();
        setEthProvider(null);
        //setSafeAuthSignInResponse(null);
        console.log("Logged out");
    };

    

    

    

    return (
        <div>
            <button
                onClick={()=>{login()}}
                className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-1'
            >
                Log In
            </button>
        </div>
    )
    
   
}   