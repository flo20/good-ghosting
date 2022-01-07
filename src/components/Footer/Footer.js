import React from "react";
import { VscGithub } from "react-icons/vsc";
import { RiDiscordLine, RiMediumLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";
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
						<VscGithub className={styles.footerIcon} />
					</a>
				</div>
				<div>
					<a
						href="https://discord.com/invite/AWvcTFP"
						target="_blank"
						rel="noopener noreferrer"
					>
						<RiDiscordLine className={styles.footerIcon} />
					</a>
				</div>

				<a
					href="https://twitter.com/goodghosting"
					target="_blank"
					rel="noopener noreferrer"
				>
					<TiSocialTwitterCircular className={styles.footerIcon} />
				</a>
				<a
					href="https://medium.com/goodghosting"
					target="_blank"
					rel="noopener noreferrer"
				>
					<RiMediumLine className={styles.footerIcon} />
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
