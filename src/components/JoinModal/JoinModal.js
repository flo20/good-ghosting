import React, { Fragment } from "react";
import useConnect from "./../common/hooks/useConnect";
import Spinner from "./../common/Spinner/Spinner";
import success from "../../assets/success_icon.svg";

import Modal from "../common/Modal/Modal";
import ModalButtons from "../common/Modal/ModalButtons";

import styles from "./JoinModal.module.scss";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	const {
		initConnector,
		handleJoinGame,
		approve,
		isLoading,
		errorMessage,
		showErrorMessage,
	} = useConnect();

	if (!showJoinModal) return null;
	return (
		<Modal
			modalErrorMessage={showErrorMessage && errorMessage}
			handleCloseModalClick={() => setShowJoinModal(!showJoinModal)}
		>
			{/* Switching headings */}
			{!isLoading && JSON.parse(localStorage.getItem("joinedGame")) ? (
				""
			) : isLoading && window.localStorage.getItem("approve") ? (
				<h1 className={styles.approveHeading}> Joining game ... </h1>
			) : isLoading ? (
				<h1 className={styles.approveHeading}> Approving deposit ... </h1>
			) : null}

			{isLoading ? (
				<Spinner />
			) : JSON.parse(localStorage.getItem("joinedGame")) ? (
				<Fragment>
					<div className={styles.successIcon}>
						<img src={success} alt="success icon" />
						<div className={styles.successMessageContainer}>
							<p>Hooray!</p>
							<p>You have successfully joined our savings pool!</p>
						</div>
					</div>
					<ModalButtons
						handleButtonModalClick={() => {
							setShowJoinModal(!showJoinModal);
						}}
						modalButtonDescription="Back to dashboard"
					/>
				</Fragment>
			) : window.localStorage.getItem("approve") ? (
				<Fragment>
					<ModalButtons
						handleButtonModalClick={handleJoinGame}
						modalButtonHeading="Join Our Savings Pool"
						modalButtonDescription="Join Game"
					/>
				</Fragment>
			) : (
				<Fragment>
					<ModalButtons
						handleButtonModalClick={initConnector}
						modalButtonHeading="Approve To Join Our Savings Pool"
						modalButtonDescription="Approve single deposit"
					/>
				</Fragment>
			)}
		</Modal>
	);
};

export default JoinModal;
