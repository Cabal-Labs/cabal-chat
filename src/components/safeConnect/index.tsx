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
    const { setWeb3AuthModalPack, setEthProvider } = useContext(Context);

    useEffect(() => {
        const initializeWeb3Auth = async () => {
            const options: Web3AuthOptions = {
                clientId: "BFvnlMuato_-hAxXg_DFH4VVOeibwB9MWWgh4kGypPOvYQE3uZN7cAqMUBw_DVq-XWLqlGKh7O4ikZ2azPj_FAE",
                web3AuthNetwork: 'testnet',
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: '0x14a33',
                    rpcTarget: "https://base-goerli.g.alchemy.com/v2/fAQnaYiRZDFfLh3Xqzv76_3LS4bKRkLN"
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
                txServiceUrl: 'https://safe-transaction-base-testnet.safe.global/'
            });

            await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
            // @ts-expect-error
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

        if (signInInfo.safes[0]) {
            router.push("/chat")
        } else {
            router.push("/connect")
        }
    };

    const logout = async () => {
        if (!localWeb3AuthModalPack) {
            console.log("Web3AuthModalPack not available for logout");
            return;
        }

        await localWeb3AuthModalPack.signOut();
        // @ts-expect-error
        setEthProvider(null);
        console.log("Logged out");
    };

    return (
        <div>
            <button
                onClick={login}
                className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-1'
            >
                Log In
            </button>
        </div>
    );
}