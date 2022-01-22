import React, { useState, useContext, useEffect } from "react";
import styles from "./HomePage.module.scss";
import JoinModal from "../../components/common/JoinModal/JoinModal";
import useConnect from "../../components/common/hooks/useConnect";
import { UserContext } from "../../App";

const HomePage = () => {
	const [showJoinModal, setShowJoinModal] = useState(false);
	const userAddress = useContext(UserContext);

	const { approve, approvedTransaction } = useConnect();

	// useEffect(() => {
	// 	console.log("connect hook", approve, approvedTransaction, userAddress);
	// });

	return (
		<div>
			<button
				type="button"
				onClick={() => setShowJoinModal(true)}
				className={styles.walletButton}
			>
				Join our game
			</button>
			{/* {approve ? (
				<h1 style={{ color: "white" }}>Approved</h1>
			) : (
				<h1 style={{ color: "white" }}>Not Approved</h1>
			)} */}
			{/* {approvedTransaction.map(
				(info) => {
					console.log("info", info);
				}
				(
					<div>
						<p>From:{info}</p>
					</div>
				)
			)} */}

			<JoinModal
				showJoinModal={showJoinModal}
				setShowJoinModal={setShowJoinModal}
			/>
		</div>
	);
};

export default HomePage;
