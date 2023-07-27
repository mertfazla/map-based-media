"use client"
import React, { useEffect, useState } from 'react';

function MapLocationAdd({ longitude, latitude, handleSubmit }) {

	const [imageURL, setImageURL] = useState("");
	useEffect(() => {
	}, [longitude, latitude])

	return (
		<div>
			<h1>Map Location Add</h1>
			<form className="flex flex-col justify-center items-center">
				<input type="float" placeholder="longitude" name='longitude' id='longitude' defaultValue={longitude} readOnly />
				<input type="float" placeholder="latitude" name='latitude' id='latitude' defaultValue={latitude} readOnly />
				<input type="text" placeholder="imageURL" name='imageURL' id='imageURL' onChange={(e) => setImageURL(e.target.value)} />
				<button type="submit" onClick={e => {
					handleSubmit(e, imageURL)
				}}>Submit</button>
			</form>
		</div>
	)
}

export default MapLocationAdd