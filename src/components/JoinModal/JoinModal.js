import React, { Fragment } from "react";
import useConnect from "./../common/hooks/useConnect";
import Spinner from "./../common/Spinner/Spinner";
import success from "../../assets/success_icon.svg";

import styles from "./JoinModal.module.scss";
import Modal from "../common/Modal/Modal";
import ModalButtons from "../common/Modal/ModalButtons";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	//console.log("showJoinModal", showJoinModal);
	const {
		initConnector,
		handleJoinGame,
		approve,
		joinedGame,
		isLoading,
		errorMessage,
	} = useConnect();
	//console.log("errorMessage", errorMessage);

	if (!showJoinModal) return null;
	return (
		<Modal
			modalErrorMessage={errorMessage}
			handleCloseModalClick={() => setShowJoinModal(!showJoinModal)}
		>
			{/* Switch Headings */}
			{joinedGame && window.localStorage.getItem("joinedGame") ? (
				""
			) : approve && window.localStorage.getItem("approve") ? (
				<h1 className={styles.approveHeading}>Join Our Savings Pool</h1>
			) : (
				<h1 className={styles.approveHeading}>
					Approve To Join Our Savings Pool
				</h1>
			)}

			{isLoading ? (
				<Spinner />
			) : joinedGame && window.localStorage.getItem("joinedGame") ? (
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
				<ModalButtons
					handleButtonModalClick={handleJoinGame}
					modalButtonDescription="Join Game"
				/>
			) : (
				<ModalButtons
					handleButtonModalClick={initConnector}
					modalButtonDescription="Approve single deposit"
				/>
			)}
		</Modal>
	);
};

export default JoinModal;
