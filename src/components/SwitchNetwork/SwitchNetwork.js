import React, { useState, Fragment } from "react";
import styles from "./SwitchNetwork.module.scss";
import cx from "classnames";

const SwitchNetwork = () => {
	const [on, setOnState] = useState(false);
	const toggle = () => setOnState(!on);

    return (
        //fix css issue
		<Fragment>
			<button
				type="button"
				onClick={toggle}
				className={cx(styles.switchButton, { on: on })}
			>
				<span className={styles.pin} />
				<p className={styles.switchInfo}>{on ? "Kovan" : "Switch to Kovan"}</p>
			</button>
		</Fragment>
	);
};

export default SwitchNetwork;
