import React, { Fragment } from "react";

import styles from "./Modal.module.scss";

const ModalButtons = ({
	modalButtonDescription,
	modalButtonHeading,
	modalButtonSubHeading,
	handleButtonModalClick,
	caption,
}) => {
	return (
		<Fragment>
			<div className={styles.headingContainer}>
				<h2 className={styles.approveHeading}>{modalButtonSubHeading}</h2>
				<p className={styles.earlyMessage}>{caption}</p>
			</div>
			<h1 className={styles.approveHeading}>{modalButtonHeading}</h1>
			<button onClick={handleButtonModalClick} className={styles.approveButton}>
				{modalButtonDescription}
			</button>
		</Fragment>
	);
};

export default ModalButtons;
