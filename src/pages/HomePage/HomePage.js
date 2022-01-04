import React from "react";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
	return (
		<div>
			<NavBar />
			<button
				type="button"
				//onClick={connectWalletHandler}
				className={styles.walletButton}
			>
				Join our game
			</button>
			<Footer/>
		</div>
	);
};

export default HomePage;
