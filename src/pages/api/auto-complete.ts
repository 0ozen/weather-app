// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function fetchData(req: NextApiRequest, res: NextApiResponse) {
	const options = {
		method: "GET",
		url: "https://weatherapi-com.p.rapidapi.com/search.json",
		params: { q: req.body },
		headers: {
			"X-RapidAPI-Key": process.env.API_KEY,
			"X-RapidAPI-Host": process.env.API_HOST,
		},
	};
 
  await axios.request(options).then(function (response) {
		res.status(200).json(response.data); 
	}).catch(function (error) {
		res.status(400).json({error: error});
	});
  
}
