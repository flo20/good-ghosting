import React, { useState } from "react";

const NavBar = () => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [network, setNetwork] = useState(null);

	const networkChainIdToName = () => {
		const chainId = window.ethereum.networkVersion;

		//detect chainId and display network name
		switch (chainId) {
			case "1":
				return setNetwork("Ethereum Main Network");
			case "3":
				return setNetwork("Ropsten Test Network");
			case "4":
				return setNetwork("Rinkeby Test Network");
			case "5":
				return setNetwork("Goerli Test Network");
			case "42":
				return setNetwork("Kovan Test Network");
			default:
				return setNetwork(network);
		}
	};

	const connectWalletHandler = async () => {
		//console.log("Connect");
		const { ethereum } = window;
		// console.log(ethereum);

		if (!ethereum) {
			alert("Please install Metamask!");
		}

		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			const account = accounts[0];
			setCurrentAccount(account);
			networkChainIdToName();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div>{network}</div>
			<div>{currentAccount}</div>
			<button
				type="button"
				onClick={connectWalletHandler}
				className="rounded-full bg-sky-500/100"
			>
				Connect to wallet
			</button>
			<button type="button">Join our game on KOVAN</button>
		</div>
	);
};

export default NavBar;
