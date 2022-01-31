import React from "react";
import NavBar from "../../NavBar/NavBar";

const HomePage = ({ onAccountSelected }) => {
	return (
		<div>
			<NavBar onAccountSelected={onAccountSelected} />
		</div>
	);
};

export default HomePage;
