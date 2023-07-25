"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

function MapLocationAdd() {
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [imageURL, setImageURL] = useState("");

	useEffect(() => {
		console.log(imageURL);
	}, [imageURL])


	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const data = { longitude: longitude, latitude: latitude, imageURL: imageURL };
			const response = await axios.post('/api/marker', JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const returnedValue = await response.data;
			console.log(returnedValue)

		}catch(error){
			console.error(error);
		}
	}
	return (
		<div>
			<h1>Map Location Add</h1>
			<form className="flex flex-col justify-center items-center">
				<input onChange={(e) => setLongitude(e.target.value)} type="float" placeholder="longitude" name='longitude' id='longitude' />
				<input onChange={(e) => setLatitude(e.target.value)} type="float" placeholder="latitude" name='latitude' id='latitude' />
				<input onChange={(e) => setImageURL(e.target.value)} type="text" placeholder="imageURL" name='imageURL' id='imageURL' />
				<button type="submit" onClick={handleSubmit}>Submit</button>
			</form>
		</div>
	)
}

export default MapLocationAdd