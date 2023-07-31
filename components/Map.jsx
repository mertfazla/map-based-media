"use client"
require('dotenv').config()
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
import MapLocationAdd from "./MapLocationAdd";
import axios from "axios";
import { useRouter } from "next/navigation";


function Map() {
	const router = useRouter();
	const [markers, setMarkers] = useState([])
	const [userMark, setUserMark] = useState({ longitude: null, latitude: null, })
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const centerRef = useRef({ lat: 43.6532, lng: -79.3832, })
	const [posts, setPosts] = useState([]);

	const handleFetch = async () => {
		console.log("Locations are fetching...");
		const res = await fetch("/api/marker")
		const data = await res.json()
		setMarkers(data)
	}

	const handleGetCoordinate = (latLng) => {
		setLongitude(latLng.lng().toFixed(3))
		setLatitude(latLng.lat().toFixed(3))
	}

	const handleSubmit = async (e, imageURL, textboxContent) => {
		try {
			e.preventDefault();
			const tempID = "t_" + posts[posts.length - 1]?.id || "t_";
			const data = { title: 'New Test Post', content: textboxContent, longitude: longitude, latitude: latitude, imageURL: imageURL };
			const newPost = { id: tempID, title: data.title, content: data.content, longitude: longitude, latitude: latitude, imageURL: imageURL };
			setPosts(prevPosts => ([...prevPosts, newPost]));

			const response = await axios.post('/api/marker', JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const newPostID = await response.data

			// setPosts(prevPosts => {
			// 	console.log("prev post->", prevPosts)
			// 	const updatedPosts = prevPosts.map(
			// 		post => post.id === tempID ? { ...post, id: newPostID } : post
			// 	);
			// 	return updatedPosts;
			// });
			handleFetch();

			// e.preventDefault();
			// const data = { longitude: longitude, latitude: latitude, imageURL: imageURL };
			// const response2 = await axios.post('/api/marker', JSON.stringify(data), {
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	}
			// });
			// const returnedValue = await response.data;
			// handleFetch();

		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		handleFetch()
	}, [])

	const libraries = ["places"];
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};
	const { isLoaded, loadError } = useLoadScript({
		//googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});
	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";
	return (
		<>
			<div className="w-full h-[30rem] relative flex justify-center my-10">
				<span className="w-9/12 h-full relative bg-slate-500 shadow-xl border-8 border-slate-200 rounded-xl">
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={8}
						center={centerRef.current}
						options={{
							scrollwheel: true,
							mapTypeId: google.maps.MapTypeId.TERRAIN,
							styles: [],
						}}
						onClick={(event) => {
							setUserMark({ longitude: event.latLng.lng(), latitude: event.latLng.lat(), })
							handleGetCoordinate(event.latLng);
						}}
					>
						{userMark.latitude && userMark.longitude && (
							<Marker
								position={{ lat: userMark.latitude, lng: userMark.longitude }}
								icon={{
									url: "/location_on.svg",
									scaledSize: { width: 35, height: 35 },
								}}
							/>
						)}

						{markers.map(marker => (
							<Marker key={marker.id}
								position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
								icon={{
									url: marker.imageURL,
									scaledSize: { width: 50, height: 50 },
								}}
								onClick={() => {
									router.push(`/posts/${marker.id}`)
								}}
							/>
						))}
					</GoogleMap>
				</span>
			</div>
			<div>
				<MapLocationAdd longitude={longitude} latitude={latitude} handleSubmit={handleSubmit} />
			</div>
		</>
	)
}

export default Map
