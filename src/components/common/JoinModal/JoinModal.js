import React, { Fragment } from "react";
import styles from "./JoinModal.module.scss";
import { FaWindowClose } from "react-icons/fa";
import useConnect from "../hooks/useConnect";
import Spinner from "../Spinner/Spinner";
import success from "../../../assets/success_icon.svg";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	const { initConnector, handleJoinGame, approve, joinedGame, isLoading } =
		useConnect();
	console.log("joined already", joinedGame);

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
				{/* Switch Headings */}
				{joinedGame && window.sessionStorage.getItem("joinedGame") ? (
					""
				) : approve && window.sessionStorage.getItem("approve") ? (
					<h1 className={styles.approveHeading}>Join Our Savings Pool</h1>
				) : (
					<h1 className={styles.approveHeading}>
						Approve To Join Our Savings Pool
					</h1>
				)}

				{isLoading ? (
					<Spinner />
				) : joinedGame && window.sessionStorage.getItem("joinedGame") ? (
					<Fragment>
						<div className={styles.successIcon}>
							<img src={success} alt="success" />
							<div className={styles.successMessageContainer}>
								<p>Hooray!</p>
								<p>You have successfully joined our savings pool!</p>
							</div>
						</div>

						<button
							onClick={() => {
								setShowJoinModal(false);
							}}
							className={styles.approveButton}
						>
							Back to dashboard
						</button>
					</Fragment>
				) : approve && window.sessionStorage.getItem("approve") ? (
					<button className={styles.approveButton} onClick={handleJoinGame}>
						Join Game
					</button>
				) : (
					<button className={styles.approveButton} onClick={initConnector}>
						Approve single deposit
					</button>
				)}
			</div>
		</div>
	);
};

export default JoinModal;
