import React from "react";
import { FaTwitterSquare, FaMedium, FaGithub, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import logo from "../../assets/logo2.png";

const Footer = () => {
	return (
		<div className={styles.footerInfo}>
			<div className={styles.footerIconContainer}>
				<div>
					<a
						href="https://github.com/Good-Ghosting"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub className={styles.footerIcon} />
					</a>
				</div>
				<div>
					<a
						href="https://discord.com/invite/AWvcTFP"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaDiscord className={styles.footerIcon} />
					</a>
				</div>

				<a
					href="https://twitter.com/goodghosting"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaTwitterSquare className={styles.footerIcon} />
				</a>
				<a
					href="https://medium.com/goodghosting"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaMedium className={styles.footerIcon} />
				</a>
			</div>
			<div className={styles.brandWrapper}>
				<Link to="/">
					<img src={logo} alt="logo" className={styles.footerLogo} />
				</Link>

				<p className={styles.tagLine}>No more boring saving</p>
			</div>
			<div>
				<a
					href="https://docs.goodghosting.com/docs/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Docs
				</a>
			</div>
		</div>
	);
};

export default Footer;
