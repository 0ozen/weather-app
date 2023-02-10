import Link from "next/link";
import home from "./home.svg";
import github from "./github.svg";
import Image from "next/image";
import styles from "@/styles/Navbar.module.css";

function Navbar() {
	return (
		<div className={styles.navbar}>
			<Link href={"/"}>
				<div>
					<Image src={home} className={styles.homeIcon} width={48} height={48} alt="home icon" />
				</div>
				<p className={styles.label}>Home</p>
			</Link>

			<Link href={"https://github.com/0ozen/weather-app"}>
				<div>
					<Image src={github} className={styles.githubIcon} width={40} height={40} alt="github icon" />
				</div>
				<p className={styles.label}>Github</p>{" "}
			</Link>
		</div>
	);
}

export default Navbar;
