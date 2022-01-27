import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";
import _ from "lodash";
import styles from "./NavBar.module.scss";
import logo from "../../assets/logo2.png";
import JoinModal from "../common/JoinModal/JoinModal";
import EarlyWithdrawModal from "../common/EarlyWithdrawModal/EarlyWithdrawModal";

const NavBar = ({ onAccountSelected }) => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [network, setNetwork] = useState(null);
	const [displayChangeButton, setDisplayChangeButton] = useState(false);
	const [walletIsConnected, setWalletConnected] = useState(false);
	const [showJoinModal, setShowJoinModal] = useState(false);
	const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

	const networkChainIdToName = () => {
		const chainId = window.ethereum.networkVersion;

		if (chainId !== "42") {
			setDisplayChangeButton(true);
		}
		//detect chainId and display network name
		switch (chainId) {
			case "1":
				return setNetwork("Ethereum Main");
			case "3":
				return setNetwork("Ropsten");
			case "4":
				return setNetwork("Rinkeby");
			case "5":
				return setNetwork("Goerli");
			case "42":
				return setNetwork("Kovan");
			default:
				return setNetwork(network);
		}
	};

	const connectWalletHandler = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			alert(
				"Please install Metamask!You can install at: https://metamask.io/download.html"
			);
		}

		//if it is not connected to the provider
		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			const account = accounts[0];
			setCurrentAccount(_.truncate(account, { length: 8 }));
			onAccountSelected(account);
			setWalletConnected(true);
			networkChainIdToName();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		connectWalletHandler();
		if (window.ethereum) {
			window.ethereum.on("chainChanged", (_chainId) =>
				window.location.reload()
			);
			window.ethereum.on("accountsChanged", () => {
				window.location.reload();
			});
		}
	});

	return (
		<div className={styles.navContainer}>
			<Link to="/">
				<img src={logo} alt="logo" className={styles.logo} />
			</Link>
			<div className={styles.navItems}>
				{walletIsConnected && currentAccount ? (
					<Fragment>
						<div className={styles.buttonChange}>
							{displayChangeButton ? (
								<SwitchNetwork network={network} />
							) : (
								<Fragment>
									<div className={styles.joinGameWrapper}>
										{/* display join game button when network is on kovan  */}
										{network === "Kovan" &&
										window.sessionStorage.getItem("earlyWithdraw") === true ? (
											<button
												type="button"
												onClick={() => setShowWithdrawalModal(true)}
												className={styles.walletButton}
											>
												EarlyWithdraw
											</button>
										) : (
											<button
												type="button"
												onClick={() => setShowJoinModal(true)}
												className={styles.walletButton}
											>
												Join our game
											</button>
										)}
										{/* <button
											type="button"
											onClick={() => setShowWithdrawalModal(true)}
											className={styles.walletButton}
										>
											EarlyWithdraw
										</button> */}
										<JoinModal
											showJoinModal={showJoinModal}
											setShowJoinModal={setShowJoinModal}
										/>
										<EarlyWithdrawModal
											showWithdrawalModal={showWithdrawalModal}
											setShowWithdrawalModal={setShowWithdrawalModal}
										/>
									</div>
									<div className={styles.kovanNetwork}>{network}</div>
								</Fragment>
							)}
						</div>
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
