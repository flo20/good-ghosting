import React, { Fragment } from "react";
import styles from "./JoinModal.module.scss";
import { FaWindowClose } from "react-icons/fa";
import useConnect from "../hooks/useConnect";
import Spinner from "../Spinner/Spinner";
import success from "../../../assets/success_icon.svg";

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
		<div className={styles.modalWrapper}>
			<div className={styles.confirmationBox}>
				<FaWindowClose
					onClick={() => {
						setShowJoinModal(!showJoinModal);
						//window.localStorage.removeItem("joinedGame");
					}}
					className={styles.closeModal}
				/>

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

						<button
							onClick={() => {
								setShowJoinModal(!showJoinModal);
							}}
							className={styles.approveButton}
						>
							Back to dashboard
						</button>
					</Fragment>
				) : approve && window.localStorage.getItem("approve") ? (
					<Fragment>
						<button className={styles.approveButton} onClick={handleJoinGame}>
							Join Game
						</button>
						<p className={styles.errorText}>{errorMessage}</p>
					</Fragment>
				) : (
					<Fragment>
						<button className={styles.approveButton} onClick={initConnector}>
							Approve single deposit
						</button>
						<p className={styles.errorText}>{errorMessage}</p>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default JoinModal;
