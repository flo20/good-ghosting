import React, { Fragment } from "react";
import useConnect from "../../components/common/hooks/useConnect";
import Spinner from "../common/Spinner/Spinner";
import withdraw from "../../assets/withdraw_icon.svg";
import ModalButtons from "../common/Modal/ModalButtons";
import Modal from "../common/Modal/Modal";

import styles from "./EarlyWithdrawModal.module.scss";

const EarlyWithdraw = ({ showWithdrawalModal, setShowWithdrawalModal }) => {
	const { handleEarlyWithdrawal, isLoading, earlyWithdraw, errorMessage } =
		useConnect();

	if (!showWithdrawalModal) return null;
	return (
		<Modal
			modalErrorMessage={errorMessage}
			handleCloseModalClick={() => setShowWithdrawalModal(!showWithdrawalModal)}
		>
			{/* Switch Headings */}
			{earlyWithdraw && window.localStorage.getItem("earlyWithdraw") ? (
				""
			) : (
				<Fragment>
					<div className={styles.headingContainer}>
						<h2 className={styles.approveHeading}>
							Are you sure you want to withdraw early ?
						</h2>
						<p className={styles.earlyMessage}>
							Early withdrawal incurs a <strong>fee of 1% </strong>and make you
							loose the game
						</p>
					</div>
				</Fragment>
			)}

			{isLoading ? (
				<Spinner />
			) : earlyWithdraw && window.localStorage.getItem("earlyWithdraw") ? (
				<Fragment>
					<div className={styles.successIcon}>
						<img src={withdraw} alt="success" />
						<p className={styles.successMessage}>
							Your deposit has been successfully withdrawn from our savings
							pool!
						</p>
					</div>
					<ModalButtons
						handleButtonModalClick={() => {
							setShowWithdrawalModal(!showWithdrawalModal);
						}}
						modalButtonDescription="Back to dashboard"
					/>
				</Fragment>
			) : (
				<Fragment>
					<ModalButtons
						handleButtonModalClick={handleEarlyWithdrawal}
						modalButtonDescription="Yes, withdraw anyway"
					/>
				</Fragment>
			)}
		</Modal>
	);
};

export default EarlyWithdraw;
