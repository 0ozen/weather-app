import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Weather.module.css";
import { searchData } from "@/types/searchData";
import Image from "next/image";
import menuIcon from "./more_vert.svg";

const dias_semana = [
	"domingo",
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",
	"sábado",
];

const formatDate = (data: string) => {
	const date = new Date(data);

	return (
		dias_semana[date.getDay()] +
		", " +
		date.getHours() +
		":" +
		date.getMinutes().toString().padStart(2, "0")
	);
};

interface Props {
	city: searchData["city"];
	state: { fail: boolean; error: string };
}

export default function Weather({ city, state }: Props) {
	if (state?.fail) return <div>Error {state?.error}</div>;

	const [data] = useState(city);
	const [temp, setTemp] = useState<number>(data.current?.temp_c);
	const [hoverTemp, setHoverTemp] = useState<boolean>(false);
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [date] = useState(formatDate(data.current?.last_updated));
	const tempSelect = useRef<HTMLFormElement>(null);
	const menuIconRef = useRef<HTMLDivElement>(null);

	const handleTemp = (changeTemp: string) => {
		switch (changeTemp) {
			case "c":
				setTemp(data.current?.temp_c | 0);
				setHoverTemp(false);
				break;
			case "f":
				setTemp(data.current?.temp_f | 0);
				setHoverTemp(true);
				break;
		}
	};

	useEffect(() => {
		function setMenu(e: any) {
      const nodeClicked = e.target as Node
      const isClickedOutside = !tempSelect?.current?.contains(nodeClicked) && !menuIconRef.current?.contains(nodeClicked)
			if (showMenu && isClickedOutside) {
				setShowMenu(false);
			}
		}
		document.addEventListener("click", setMenu);
		return () => {
			document.removeEventListener("click", setMenu);
		};
	});

	return (
		<div className={styles.weather}>
			<div className={styles.resultFor}>
				<span>
					Resultados para <strong>{data.location?.name} </strong>
				</span>
				<span> ∙ </span>
				<button>Elegir área</button>
			</div>
			<div className={styles.info}>
				<div>
					<div className={styles.hidd}>Ahora</div>
					<div className={styles.icon}>
						<img src={data.current?.condition.icon} alt="icon" />
						<div>
							<p className={styles.temp}>
								{temp} <span className={styles.hidd}>°</span>
							</p>
							<span className={styles.tempOptions}>
								<button
									style={!hoverTemp ? { color: "white" } : {}}
									onClick={() => handleTemp("c")}>
									°C
								</button>
								<span>| </span>
								<button
									style={hoverTemp ? { color: "white" } : {}}
									onClick={() => handleTemp("f")}>
									°F
								</button>
							</span>
						</div>
					</div>
					<div className={`${styles.hidd} ${styles.feelslike}`}>
						Sensación térmica:{" "}
						{hoverTemp ? data.current.feelslike_f : data.current.feelslike_c}
						{"°"}
					</div>

					<div className={styles.stats}>
						<p>Humedad: {data.current?.humidity} %</p>
						<p>
							Viento: <span className={styles.hidd2}>a</span>{" "}
							{data.current?.gust_kph} km/h
						</p>
					</div>
					<div className={styles.graph}>viento , precipitacion icons</div>
				</div>
				<div className={styles.date}>
					<p className={styles.clima}>Clima</p>
					<p>{date}</p>
					<p>{data.location?.country}</p>
				</div>
				<div
          ref={menuIconRef}
					onClick={() => setShowMenu(!showMenu)}
					className={`${styles.menu} ${styles.hidd}`}>
					<Image src={menuIcon} width={64} height={64} alt="menu icon" />
				</div>

				<form
					ref={tempSelect}
					className={`${styles.hidd} ${styles.tempSelect} ${
						showMenu ? "" : styles.showMenuFalse
					}`}>
					<div>
						<input
							type={"radio"}
							style={!hoverTemp ? { color: "cyan" } : {}}
							onClick={() => handleTemp("c")}
							id={"rad1"}
							name="temp"
							defaultChecked
						/>
						<label htmlFor="rad1"> Celsius (°C)</label>
					</div>
					<div>
						<input
							type={"radio"}
							style={hoverTemp ? { color: "cyan" } : {}}
							onClick={() => handleTemp("f")}
							id="rad2"
							name="temp"
						/>
						<label htmlFor="rad2"> Fahrenheit (°F)</label>
					</div>
				</form>
			</div>
		</div>
	);
}
