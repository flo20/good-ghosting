import React from "react";
import { FaWindowClose } from "react-icons/fa";

import styles from "./Modal.module.scss";

const Modal = ({ handleCloseModalClick, modalErrorMessage, children }) => {
	return (
		<div className={styles.modalWrapper}>
			<div className={styles.confirmationBox}>
				<FaWindowClose
					onClick={handleCloseModalClick}
					className={styles.closeModal}
				/>
				{children}
				<p className={styles.errorText}>{modalErrorMessage}</p>
			</div>
		</div>
	);
};

export default Modal;
