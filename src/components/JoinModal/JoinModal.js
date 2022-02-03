import React, { Fragment } from "react";
import useConnect from "./../common/hooks/useConnect";
import Spinner from "./../common/Spinner/Spinner";
import success from "../../assets/success_icon.svg";

import styles from "./JoinModal.module.scss";
import Modal from "../common/Modal/Modal";
import ModalButtons from "../common/Modal/ModalButtons";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	const {
		initConnector,
		handleJoinGame,
		approve,
		joinedGame,
		isLoading,
		errorMessage,
	} = useConnect();
	console.log("approve", approve);
	console.log("joinedGame", joinedGame);

	if (!showJoinModal) return null;
	return (
		<Modal
			modalErrorMessage={errorMessage}
			handleCloseModalClick={() => setShowJoinModal(!showJoinModal)}
		>
			{isLoading ? (
				<Spinner />
			) : approve && JSON.parse(localStorage.getItem("joinedGame")) ? (
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
			) : approve && window.localStorage.getItem("approve") ? (
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
