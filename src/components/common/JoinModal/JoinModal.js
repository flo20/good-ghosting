import React from "react";
import styles from "./JoinModal.module.scss";
import { FaWindowClose } from "react-icons/fa";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	//const joinGameHandler = () => {};
	if (!showJoinModal) return null;
	return (
		<div className={styles.modalWrapper}>
			<div className={styles.confirmationBox}>
				<FaWindowClose
					onClick={() => {
						setShowJoinModal();
					}}
					className={styles.closeModal}
				/>
				<button>Add</button>
			</div>
		</div>
	);
};

export default JoinModal;
