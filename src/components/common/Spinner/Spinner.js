import React from "react";

import styles from "./Spinner.module.scss";

const Spinner = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.centerer}>
				<div className={styles.spinner} />
				<div>{children}</div>
			</div>
		</div>
	);
};
export default Spinner;
