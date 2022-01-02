import React, { useState, Fragment } from "react";
import styles from "./SwitchNetwork.module.scss";
import cx from "classnames";

const SwitchNetwork = ({ network }) => {
	const [on, setOnState] = useState(false);
	const toggle = () => setOnState(!on);

	return (
		//fix css issue
		<div className={styles.switchContainer}>
			<button
				type="button"
				onClick={toggle}
				className={cx(styles.switchButton, { on: on })}
			>
				<span className={styles.pin} />
				<p className={styles.switchInfo}>{on ? "Kovan" : "Switch to Kovan"}</p>
			</button>
			{/* <p>{network}</p> */}
		</div>
	);
};

export default SwitchNetwork;
