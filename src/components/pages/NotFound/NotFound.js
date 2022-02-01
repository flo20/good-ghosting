import React from "react";
//import { Link } from "react-router-dom";
import notFoundIcon from "../../../assets/404_icon.svg";

import styles from "./NotFound.module.scss";

const NotFound = () => {
	return (
		<div className={styles.imageWrapper}>
			<img
				src={notFoundIcon}
				alt="not found icon"
				className={styles.notFoundImage}
			/>
			<button className={styles.dashboardButton}>
				{/* <Link to="/">Back to dashboard</Link> */}
				Back to dashboard
			</button>
		</div>
	);
};

export default NotFound;
