const { useState } = require('react');

const GET = 'GET';
const POST = 'POST';
const JSON_TYPE = 'application/json';
const FILE_TYPE = 'multipart/form-data';
const FORM_URL = 'application/x-www-form-urlencoded';

const BASE_URL = 'https://us-central1-mind-the-map.cloudfunctions.net/';

const useFetch = () => {
	const [result, setResult] = useState(null);

	const load = async ({ url, method = POST, body = '' }) => {
		const params = {
			method,
			headers: {
				'Content-Type': JSON_TYPE,
			},
			body: JSON.stringify(body),
		};
		const response = await fetch(BASE_URL + url, params);
		const data = await response.json();

		setResult(data);
	};

	return [result, load];
};

export default useFetch;
