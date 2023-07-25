"use client"
require('dotenv').config()
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"

function Map() {
	const [markers, setMarkers] = useState([])
	const [userMark, setUserMark] = useState({ longitude: null, latitude: null, })
	const handleFetch = async () => {
		const res = await fetch("/api/marker")
		const data = await res.json()
		console.log("DATA->", data)
		setMarkers(data)
	}


	useEffect(() => {
		console.log("Locations are fetching");
		handleFetch()
	}, [])



	const libraries = ["places"];
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};
	const center = {
		lat: 43.6532,
		lng: -79.3832,
	};
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey:process.env.GOOGLE_MAPS_API_KEY,
	});
	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";
	return (
		<div className="w-full h-[30rem] relative flex justify-center my-10">
			<span className="w-9/12 h-full relative bg-slate-500 shadow-xl border-8 border-slate-200 rounded-xl">
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={8}
						center={center}
						options={{
							scrollwheel: true,
							mapTypeId: google.maps.MapTypeId.TERRAIN,
							styles: [],
						}}
						onClick={(event) => {
							setUserMark({ longitude: event.latLng.lng(), latitude: event.latLng.lat(), })
							console.log("Latitude:", event.latLng.lat());
							console.log("Longitude:", event.latLng.lng());
						}}
					>

						<Marker
							position={{ lat: 43.6532, lng: -79.3832 }}
							icon={{
								url: "https://picsum.photos/200/300",
								scaledSize: { width: 50, height: 50 },

							}}
						/>
						{userMark.latitude && userMark.longitude && (
							<Marker
								position={{ lat: userMark.latitude, lng: userMark.longitude }}
								icon={{
									url: "https://picsum.photos/200/300",
									scaledSize: { width: 50, height: 50 },

								}}
							/>
						)}

						{markers.map(marker => (
							<Marker
								key={marker.id}
								position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
								icon={{
									url: marker.imageURL,
									scaledSize: { width: 50, height: 50 },
								}}
							/>
						))}

					</GoogleMap>
			</span>
		</div>
	)
}

export default Map
