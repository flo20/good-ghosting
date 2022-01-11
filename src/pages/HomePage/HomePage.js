import React, { useState } from "react";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
	const [callWeb3, setCalWeb3] = useState();

	const joinGameHandler = () => {
		
	};
	return (
		<div>
			<NavBar />
			<button
				type="button"
				onClick={joinGameHandler}
				className={styles.walletButton}
			>
				Join our game
			</button>
			<Footer />
		</div>
	);
};

export default HomePage;
