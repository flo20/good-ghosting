import React, { useState } from "react";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import useConnect from "../../components/common/hooks/useConnect";
import JoinModal from "../../components/common/JoinModal/JoinModal";

const HomePage = () => {
	const [callWeb3, setCallWeb3] = useState();
	const [showJoinModal, setShowJoinModal] = useState(false);

	//const { data } =
	useConnect();
	//console.log(data);

	return (
		<div>
			<NavBar />
			<button
				type="button"
				onClick={() => setShowJoinModal(true)}
				className={styles.walletButton}
			>
				Join our game
			</button>
			<JoinModal showJoinModal={showJoinModal} setShowJoinModal={setShowJoinModal} />
			<Footer />
		</div>
	);
};

export default HomePage;
