import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";
import _ from "lodash";
import styles from "./NavBar.module.scss";

const NavBar = () => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [network, setNetwork] = useState(null);
	const [displayChangeButton, setDisplayChangeButton] = useState(false);

	const networkChainIdToName = () => {
		const chainId = window.ethereum.networkVersion;

		if (chainId !== "42") {
			//console.log("Not Kovan");
			setDisplayChangeButton(true);
		}
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
			setCurrentAccount(_.truncate(account, { length: 8 }));
			networkChainIdToName();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.navContainer}>
			<div>
				<Link to="/">
					<div className={styles.logo}>GoodGhosting</div>
				</Link>
			</div>
			<div className={styles.navItems}>
				{currentAccount ? (
					<Fragment>
						<p className={styles.buttonChange}>
							{displayChangeButton ? <SwitchNetwork /> : network}
						</p>
						<p className={styles.accountAddress}>{currentAccount}</p>
					</Fragment>
				) : (
					<button
						type="button"
						onClick={connectWalletHandler}
						className={styles.walletButton}
					>
						Connect wallet
					</button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
