import { lazy, Suspense } from "react";

const Weather = lazy(() => import("@/components/Weather"));
import { searchData } from "@/types/searchData";
import Head from "next/head";

interface Props {
	city: searchData["city"];
	state: { fail: boolean; error: string };
}

export default function searchResult({ city, state }: Props) {
	return (
		<>
			<Head>
				<title>Clima en: {city.location.name}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/rain.svg" />
			</Head>
			<Suspense fallback={<div>Loading...</div>}>
				<Weather city={city} state={state}></Weather>
			</Suspense>
		</>
	);
}

export async function getServerSideProps({ query }: any) {
	try {
		const res = await fetch(
			`${process.env.API_path || "http://localhost:3000"}/api/current-weather`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(query.city),
			}
		);
		if (res.ok) {
			const result = await res.json();

			return {
				props: { city: result.data },
			};
		} else {
			throw new Error(res.status + " - Error getting weather data from server");
		}
	} catch (error: any | unknown) {
		return {
			props: { state: { fail: true, error: error.message } },
		};
	}
}
