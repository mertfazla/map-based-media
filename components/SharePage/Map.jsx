"use client"
require('dotenv').config()
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
import MapLocationAdd from "@/components/SharePage/MapLocationAdd"
import axios from "axios";
import { useRouter } from "next/navigation";
import { MarkerClusterer } from "@react-google-maps/api";


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
			handleFetch();

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
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});
	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";
	return (
		<>
			<div className="w-full h-full relative flex flex-col justify-center items-center my-10">
				<h1 className="text-xl bg-white/90 border rounded-2xl px-5 py-4 my-2 shadow-xl">Select the location of the picture on the map</h1>
				<span className="w-10/12 h-screen relative shadow-xl border-2 border-blue-800">
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
						<MarkerClusterer className="w-10 h-10 bg-red-500 rounded-full flex item-center" gridSize={60}>
							{(clusterer) =>
								markers.map((marker) => (
									<Marker
										key={marker.id}
										position={{
											lat: parseFloat(marker.latitude),
											lng: parseFloat(marker.longitude),
										}}
										icon={{
											url: marker.imageURL,
											scaledSize: { width: 50, height: 50 },
										}}
										onClick={() => {
											router.push(`/posts/${marker.id}`);
										}}
										clusterer={clusterer}
									/>
								))
							}
						</MarkerClusterer>
						{userMark.latitude && userMark.longitude && (
							<Marker
								position={{ lat: userMark.latitude, lng: userMark.longitude }}
								icon={{
									url: "/location_on.svg",
									scaledSize: { width: 35, height: 35 },
								}}
							/>
						)}
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
