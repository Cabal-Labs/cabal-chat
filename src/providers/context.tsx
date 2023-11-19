import { SafeEventEmitterProvider } from "@web3auth/base";
import { useMemo, useState } from "react";
export type DataType = {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	userId: string;
	setUserId: (userId: string) => void;
	// TODO: set correct types
	web3AuthModalPack: null;
	setWeb3AuthModalPack: (web3AuthModalPack:any) => {};
	safeAddress: "";
	setSafeAddress: (addres:string) => {};
	ethProvider: null;
	setEthProvider: (provider:any) => {};
};
const AllData = () => {
	const [userId, setUserId] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>();
	const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
		useState<any>(null);
	const [safeAddress, setSafeAddress] = useState<any>(null);
	const [ethProvider, setEthProvider] =
		useState<SafeEventEmitterProvider | null>(null);

	const provider = useMemo(
		() => ({
			loggedIn,
			setLoggedIn,
			userId,
			setUserId,
			web3AuthModalPack,
			setWeb3AuthModalPack,
			safeAuthSignInResponse,
			setSafeAuthSignInResponse,
			safeAddress,
			setSafeAddress,
			ethProvider,
			setEthProvider,
		}),
		[
			loggedIn,
			setLoggedIn,
			userId,
			setUserId,
			web3AuthModalPack,
			setWeb3AuthModalPack,
			safeAuthSignInResponse,
			setSafeAuthSignInResponse,
			safeAddress,
			setSafeAddress,
			ethProvider,
			setEthProvider,
		]
	);
	return provider;
};

export default AllData;
