import Weather from "@/components/Weather";
import { searchData } from "@/types/searchData";

interface Props {
	city: searchData["city"];
	state: { fail: boolean; error: string };
}

export default function searchResult({ city, state }: Props) {
	return (
		<>
			<Weather city={city} state={state}></Weather>
		</>
	);
}

export async function getServerSideProps({ query }: any) {
	try {
		const res = await fetch(`${process.env.APIpath || "http://localhost:3000" }/api/current-weather`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(query.city),
		});
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
