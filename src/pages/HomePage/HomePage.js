import React, { useState, useContext, useEffect } from "react";
import styles from "./HomePage.module.scss";
import JoinModal from "../../components/common/JoinModal/JoinModal";
import useConnect from "../../components/common/hooks/useConnect";
import { UserContext } from "../../App";

const HomePage = () => {
	const [showJoinModal, setShowJoinModal] = useState(false);
	const userAddress = useContext(UserContext);

	const { approve, approvedTransaction, joinedGame } = useConnect();

	// useEffect(() => {
	console.log(
		"connect hook",
		approve,
		approvedTransaction,
		userAddress,
		joinedGame
	);
	// });

	return (
		<div>
			<button>Early withdrawal</button>
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
		</div>
	);
};

export default HomePage;
