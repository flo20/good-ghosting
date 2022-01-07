import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";
import _ from "lodash";
import styles from "./NavBar.module.scss";
import logo from "../../assets/logo2.png";

const NavBar = () => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [network, setNetwork] = useState(null);
	const [displayChangeButton, setDisplayChangeButton] = useState(false);
	const [walletIsConnected, setWalletConnected] = useState(false);

	const networkChainIdToName = () => {
		const chainId = window.ethereum.networkVersion;

		// console.log({chainId});

		if (chainId !== "42") {
			//console.log("Not Kovan");
			setDisplayChangeButton(true);
		}
		//detect chainId and display network name
		switch (chainId) {
			case "1":
				return setNetwork("Ethereum Main");
			case "3":
				return setNetwork("Ropsten Test Network");
			case "4":
				return setNetwork("Rinkeby Test Network");
			case "5":
				return setNetwork("Goerli Test Network");
			case "42":
				return setNetwork("Kovan");
			default:
				return setNetwork(network);
		}
	};

	const connectWalletHandler = async () => {
		//console.log("Connect");
		const { ethereum } = window;
		// console.log(ethereum);

		if (!ethereum) {
			alert(
				"Please install Metamask!You can install at: https://metamask.io/download.html"
			);
		}

		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			const account = accounts[0];
			setCurrentAccount(_.truncate(account, { length: 8 }));
			setWalletConnected(true);
			networkChainIdToName();
		} catch (err) {
			console.error(err);
		}
	};

	// const switchNetwork = async () => {
	// 	try {
	// 		await window.ethereum.request({
	// 			method: "wallet_switchEthereumChain",
	// 			params: [{ chainId: "0x2a" }],
	// 		});
	// 	} catch (e) {
	// 		if (e.code === 4902) {
	// 			try {
	// 				await window.ethereum.request({
	// 					method: "wallet_addEthereumChain",
	// 					params: [
	// 						{
	// 							chainId: "0x2a",
	// 							chainName: "Ethereum Testnet Kovan",
	// 							nativeCurrency: {
	// 								name: "Kovan Ether",
	// 								symbol: "KOV", // 2-6 characters long
	// 								decimals: 18,
	// 							},
	// 							rpcUrls: ["https://kovan.poa.network"],
	// 						},
	// 					],
	// 				});
	// 			} catch (err) {
	// 				console.error(err);
	// 			}
	// 		}
	// 	}
	// };

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("chainChanged", () => {
				window.location.reload();
			});
			window.ethereum.on("accountsChanged", () => {
				window.location.reload();
			});
		}
		connectWalletHandler();
	});

	return (
		<div className={styles.navContainer}>
			<Link to="/">
				<img src={logo} alt="" className={styles.logo} />
			</Link>
			<div className={styles.navItems}>
				<div className={styles.buttonChange}>
					{displayChangeButton ? (
						<SwitchNetwork network={network} />
					) : (
						<div className={styles.kovanNetwork}>{network}</div>
					)}
				</div>
				<p className={styles.accountAddress}>{currentAccount}</p>

				{!walletIsConnected && !currentAccount ? (
					<button
						type="button"
						onClick={connectWalletHandler}
						className={styles.walletButton}
					>
						Connect wallet
					</button>
				) : null}

			</div>
		</div>
	);
};

export default NavBar;
