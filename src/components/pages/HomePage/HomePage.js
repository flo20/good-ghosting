import React from "react";
import NavBar from "../../NavBar/NavBar";
import spaceMan from "../../../assets/spaceman_icon.svg";

const HomePage = ({ onAccountSelected }) => {
	return (
		<div>
			<NavBar onAccountSelected={onAccountSelected} />
			<main>
				A better way to grow your savings The new addictive way to save. Our
				savings pools reward regular savers with higher interest rates. Start
				building the financial habits you deserve.
				<img src={spaceMan} alt="" />
			</main>
		</div>
	);
};

export default HomePage;
