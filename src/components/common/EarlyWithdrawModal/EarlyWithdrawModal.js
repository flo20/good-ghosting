import React, { Fragment } from "react";
import { FaWindowClose } from "react-icons/fa";
import useConnect from "../hooks/useConnect";
import Spinner from "../Spinner/Spinner";
import withdraw from "../../../assets/withdraw_icon.svg";

import styles from "./EarlyWithdrawModal.module.scss";

const EarlyWithdraw = ({ showWithdrawalModal, setShowWithdrawalModal }) => {
	const { handleEarlyWithdrawal, isLoading, earlyWithdraw,errorMessage } = useConnect();

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
				{/* Switch Headings */}
				{earlyWithdraw && window.sessionStorage.getItem("earlyWithdraw") ? (
					""
				) : (
					<Fragment>
						<div className={styles.headingContainer}>
							<h2 className={styles.approveHeading}>
								Are you sure you want to withdraw early ?
							</h2>
							<p className={styles.earlyMessage}>
								Early withdrawal incurs a <strong>fee of 1% </strong>and make
								you loose the game
							</p>
						</div>
					</Fragment>
				)}

				{isLoading ? (
					<Spinner />
				) : earlyWithdraw && window.sessionStorage.getItem("earlyWithdraw") ? (
					<Fragment>
						<div className={styles.successIcon}>
							<img src={withdraw} alt="success" />
							<p className={styles.successMessage}>
								Your deposit has been successfully withdrawn from our savings
								pool!
							</p>
						</div>
						<button
							onClick={() => {
								setShowWithdrawalModal(false);
							}}
							className={styles.approveButton}
						>
							Back to dashboard
						</button>
					</Fragment>
				) : (
					<Fragment>
						<button
							className={styles.approveButton}
							onClick={handleEarlyWithdrawal}
						>
							Yes, withdraw anyway
						</button>
						<p className={styles.errorText}>{errorMessage}</p>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default EarlyWithdraw;
