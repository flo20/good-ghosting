import React from "react";
import styles from "./NavButton.module.scss";

const Button = ({ handleClick, buttonDescription }) => {
	return (
		<button onClick={handleClick} type="button" className={styles.walletButton}>
			{buttonDescription}
		</button>
	);
};

export default Button;
