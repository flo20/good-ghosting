import React from "react";
import NavBar from "../../NavBar/NavBar";
import spaceMan from "../../../assets/spaceman_icon.svg";

import styles from "./HomePage.module.scss";

const HomePage = ({ onAccountSelected }) => {
	return (
		<div>
			<NavBar onAccountSelected={onAccountSelected} />
			<div className={`${styles.bannerContainer}`}>
				<div className={styles.bannerText}>
					<h1 className="font-['Poppins']">
						A better way to grow your savings.
					</h1>
					<p className="font-['Montserrat']">
						The new addictive way to save. Our savings pools reward regular
						savers with higher interest rates. Start building the financial
						habits you deserve.
					</p>
				</div>
				<div>
					<img
						src={spaceMan}
						alt="space man icon"
						className={styles.imageSize}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
