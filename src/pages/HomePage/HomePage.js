import React, { useState } from "react";
import styles from "./HomePage.module.scss";
import JoinModal from "../../components/common/JoinModal/JoinModal";

const HomePage = () => {
	const [showJoinModal, setShowJoinModal] = useState(false);

	return (
		<div>
			<button
				type="button"
				onClick={() => setShowJoinModal(true)}
				className={styles.walletButton}
			>
				Join our game
			</button>
			<JoinModal
				showJoinModal={showJoinModal}
				setShowJoinModal={setShowJoinModal}
			/>
		</div>
	);
};

export default HomePage;
