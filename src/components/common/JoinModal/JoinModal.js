import React, { useEffect } from "react";
import styles from "./JoinModal.module.scss";
import { FaWindowClose } from "react-icons/fa";
import useConnect from "../hooks/useConnect";

const JoinModal = ({ showJoinModal, setShowJoinModal }) => {
	//const approveSingleDepositHandler = () => {};
	const { initConnector, handleJoinGame, approve, joinedGame } = useConnect();

	//function showJoingame() {
		if (
			approve &&
			window.sessionStorage.getItem("approve") === true &&
			window.sessionStorage.getItem("joinedGame") !== true
		) {
		}
	//}

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
				<h1 className={styles.approveHeading}>
					Approve To Join Our Savings Pool
				</h1>

				{approve && window.sessionStorage.getItem("approve") ? (
					<button className={styles.approveButton} onClick={handleJoinGame}>
						Join Game
					</button>
				) : (
					<button className={styles.approveButton} onClick={initConnector}>
						Approve single deposit
					</button>
				)}
				{/* <button className={styles.approveButton}>
					Approve total deposit amount
				</button> */}
			</div>
		</div>
	);
};

export default JoinModal;
