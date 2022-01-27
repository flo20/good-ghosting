import React from "react";
import { FaWindowClose } from "react-icons/fa";
import useConnect from "../hooks/useConnect";
import Spinner from "../Spinner/Spinner";

import styles from "./EarlyWithdrawModal.module.scss";

const EarlyWithdraw = ({ showWithdrawalModal, setShowWithdrawalModal }) => {
	const { handleEarlyWithdrawal } = useConnect();

	// if (
	// 	approve &&
	// 	window.sessionStorage.getItem("approve") === true &&
	// 	window.sessionStorage.getItem("joinedGame") !== true
	// )
	if (!showWithdrawalModal) return null;
	return (
		<div className={styles.modalWrapper}>
			<div className={styles.confirmationBox}>
				<FaWindowClose
					onClick={() => {
						setShowWithdrawalModal(false);
					}}
					className={styles.closeModal}
				/>
				<h1 className={styles.approveHeading}>Early Withdrawal</h1>

				<button
					className={styles.approveButton}
					onClick={handleEarlyWithdrawal}
				>
					Early Withdrawal
				</button>
			</div>
		</div>
	);
};

export default EarlyWithdraw;
