import React, { Fragment } from "react";
import useConnect from "../../components/common/hooks/useConnect";
import Spinner from "../common/Spinner/Spinner";
import withdraw from "../../assets/withdraw_icon.svg";
import ModalButtons from "../common/Modal/ModalButtons";
import Modal from "../common/Modal/Modal";

import styles from "./EarlyWithdrawModal.module.scss";

const EarlyWithdraw = ({ showWithdrawalModal, setShowWithdrawalModal }) => {
	const { handleEarlyWithdrawal, isLoading, errorMessage } = useConnect();

	if (!showWithdrawalModal) return null;
	return (
		<Modal
			modalErrorMessage={errorMessage}
			handleCloseModalClick={() => setShowWithdrawalModal(!showWithdrawalModal)}
		>
			{isLoading ? (
				<Spinner />
			) : JSON.parse(window.localStorage.getItem("earlyWithdraw")) ? (
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
				<ModalButtons
					modalButtonSubHeading="Are you sure you want to withdraw early ?"
					caption="Early withdrawal incurs a fee of 1% and make you loose the game"
					handleButtonModalClick={handleEarlyWithdrawal}
					modalButtonDescription="Yes, withdraw anyway"
				/>
			)}
		</Modal>
	);
};

export default EarlyWithdraw;
