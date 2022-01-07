import React, { useState } from "react";
import styles from "./SwitchNetwork.module.scss";

const SwitchNetwork = ({ network }) => {
	const [on, setOnState] = useState(false);
	const toggle = () => setOnState(!on);

	const handleKovanSwitch = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x2a" }],
			});
		} catch (e) {
			if (e.code === 4902) {
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: "0x2a",
								chainName: "Ethereum Testnet Kovan",
								nativeCurrency: {
									name: "Kovan Ether",
									symbol: "KOV", // 2-6 characters long
									decimals: 18,
								},
								rpcUrls: ["https://kovan.poa.network"],
							},
						],
					});
				} catch (err) {
					console.error(err);
				}
			}
		}
	};

	return (
		<div className={styles.switchContainer}>
			<button className={on ? styles.on : styles.off} onClick={toggle}>
				<span className={styles.pin} onClick={handleKovanSwitch} />
				<div className={styles.switchInfo}>
					{on ? " " : <p className={styles.networkSwitch}>Switch to Kovan</p>}
					{on ? "" : <p className={styles.networkName}>{network}</p>}
				</div>
			</button>
		</div>
	);
};

export default SwitchNetwork;
