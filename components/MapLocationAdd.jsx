"use client"
import React, { useEffect, useState } from 'react';
import Textbox from "@/components/Textbox";

function MapLocationAdd({ longitude, latitude, handleSubmit }) {
	const [textboxContent, setTextboxContent] = useState("");
	const [imageURL, setImageURL] = useState("");

	useEffect(() => {
	}, [longitude, latitude])

	return (
		<div className='w-full p-4 flex justify-center'>
			<div className='w- w-3/4 shadow-2xl p-10'>
				<h1 className="text-2xl font-bold text-center py-4">Add Map Location</h1>
				<div className="flex flex-col items-center justify-center space-y-4">
					<Textbox onChange={setTextboxContent} placeholder="Enter location name" />
					<input type="float" placeholder="Longitude" name='longitude' id='longitude' defaultValue={longitude} readOnly className=" hidden w-full py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
					<input type="float" placeholder="Latitude" name='latitude' id='latitude' defaultValue={latitude} readOnly className="hidden w-full none py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
					<input type="text" placeholder="Image URL" name='imageURL' id='imageURL' onChange={(e) => setImageURL(e.target.value)} className="w-full py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
					<button type="submit" onClick={e => {
						handleSubmit(e, imageURL, textboxContent)
					}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
						Submit
					</button>
				</div>
			</div>

		</div>
	)
}

export default MapLocationAdd