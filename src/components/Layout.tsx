import React from "react";
import styles from "@/styles/Home.module.css";

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

				<a
					className={styles.ref}
					href="https://myportfolio003.netlify.app"
					target="_blank"
					rel="noopener noreferrer">
					<div>
						<code>{`{Developed By jhean}`}</code>
					</div>
				</a>
			</main>
		</>
	);
}

export default Layout;
