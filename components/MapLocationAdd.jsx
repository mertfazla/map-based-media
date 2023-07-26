"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

function MapLocationAdd({longitude, latitude}) {

	const [imageURL, setImageURL] = useState("");
	useEffect(() => {
		console.log(longitude, latitude, "=000");
	}, [longitude, latitude])

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
				<input type="float" placeholder="longitude" name='longitude' id='longitude' defaultValue={longitude} readOnly />
				<input type="float" placeholder="latitude" name='latitude' id='latitude' defaultValue={latitude} readOnly/>
				<input type="text" placeholder="imageURL" name='imageURL' id='imageURL' onChange={(e)=>setImageURL(e.target.value)} />
				<button type="submit" onClick={handleSubmit}>Submit</button>
			</form>
		</div>
	)
}

export default MapLocationAdd