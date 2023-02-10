import React from "react";
import styles from "@/styles/Home.module.css";
import Navbar from "./Navbar";

interface childrenType {
	children: React.ReactNode;
}

function Layout({ children }: childrenType) {
	return (
		<>
			<main className={styles.main}>
				<div className={styles.description}>
					<p>
						desarrollado con&nbsp;
						<code className={styles.code}>WeatherAPI.com</code>
					</p>
				</div>

				{children}
			</main>
			<div className={styles.footer}>
				<Navbar></Navbar>

				<a
					className={styles.ref}
					href="https://myportfolio003.netlify.app"
					target="_blank"
					rel="noopener noreferrer">
					<code>{`{Developed By jhean}`}</code>
				</a>
			</div>
		</>
	);
}

export default Layout;
