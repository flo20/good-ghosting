import React from "react";

import styles from "./Modal.module.scss";

const ModalButtons = ({ modalButtonDescription, handleButtonModalClick }) => {
	return (
		<button onClick={handleButtonModalClick} className={styles.approveButton}>
			{modalButtonDescription}
		</button>
	);
};

export default ModalButtons;
