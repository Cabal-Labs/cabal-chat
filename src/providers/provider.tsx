

import React, { createContext } from "react";
import AllData, { DataType } from "./context";

export const Context = createContext<DataType>({
	loggedIn: false,
	setLoggedIn: (boolean) => {},
	userId: "",
	setUserId: (string) => {},
	web3AuthModalPack: null,
	setWeb3AuthModalPack: () => {},
	safeAddress: "",
	setSafeAddress: (string) => {},
	ethProvider: null,
	setEthProvider: (x) => {},
});

// const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>();
// 	const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
// 		useState<any>(null);
// 	const [safeAddress, setSafeAddress] = useState<any>(null);
// 	const [ethProvider, setEthProvider] =
// 		useState<SafeEventEmitterProvider | null>(null);

export const Provider = ({ children }: any) => {
	const data: DataType = AllData();
	return <Context.Provider value={data}>{children}</Context.Provider>;
};
