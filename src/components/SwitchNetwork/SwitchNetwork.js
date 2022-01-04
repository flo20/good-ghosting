import React, { useState } from "react";
import styles from "./SwitchNetwork.module.scss";

const SwitchNetwork = ({ network }) => {
	const [on, setOnState] = useState(false);
	const toggle = () => setOnState(!on);

	return (
		<div className={styles.switchContainer}>
			{on ? "" : <p className={styles.networkName}>{network}</p>}
			<button className={on ? styles.on : "off"} onClick={toggle}>
				<span className={styles.pin} />
				<p className={styles.switchInfo}>{on ? "Kovan" : "Switch to Kovan"}</p>
			</button>
		</div>
	);
};

export default SwitchNetwork;
