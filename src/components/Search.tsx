import useDebounce from "@/hooks/useDebounce";
import styles from "@/styles/Search.module.css";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { data } from "../utils/autoComplete";
import Link from "next/link";

export default function Search() {
	const [city, setCity] = useState("");
	const [results, setResults] = useState(data);
	const [showResults, setShowResults] = useState(false);
	const debounceInput = useDebounce(city, 400);
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("Searching", debounceInput);

		async function fetchResults() {
			const res = await fetch("/api/auto-complete", {
				method: "POST",
				body: debounceInput,
			});

			if (res.ok) {
				const data = await res.json();
        
				setResults(data);
			}
		}

		if (debounceInput.length >= 3) {
			fetchResults();
		}
	}, [debounceInput]);

	const handleChange = (event: any) => {
		setCity(event.target.value);
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		setShowResults(true);
	};
	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (typeof window !== "undefined") {
			document.addEventListener("click", (e) => {
				if (!searchRef.current?.contains(e.target as Node)) {
					setShowResults(false);
				}
			});
		}
	};

	return (
		<div className={styles.searchCont}>
			<div ref={searchRef} className={styles.search}>
				<input
					type="text"
					placeholder="buscar ciudad..."
					onChange={handleChange}
					value={city}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{showResults && (
					<div className={styles.options}>
						<div>
							{results && results.map(({ name, id, country, region }) => {
								return (
									<Link
										key={id}
										href={{ pathname: "/city", query: { city: name } }}>
										<span>
											<p>{name}</p>
											<p>{country}</p>
											<p>{region}</p>
										</span>
									</Link>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
