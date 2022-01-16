import React from "react";
import styles from "./JoinModal.module.scss";
import { FaWindowClose } from "react-icons/fa";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	//const approveSingleDepositHandler = () => {};
	if (!showJoinModal) return null;
	return (
		<div className={styles.modalWrapper}>
			<div className={styles.confirmationBox}>
				<FaWindowClose
					onClick={() => {
						setShowJoinModal(false);
					}}
					className={styles.closeModal}
				/>
				<button className={styles.approveButton}>
					Approve single deposit
				</button>
				<button className={styles.approveButton}>
					Approve total deposit amount
				</button>
			</div>
		</div>
	);
};

export default JoinModal;
