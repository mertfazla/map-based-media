"use client"

import { MarkerClusterer } from "@react-google-maps/api";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ViewMap() {
	const { data, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin")
		}
	});

	const router = useRouter();
	const [markers, setMarkers] = useState([])
	const centerRef = useRef({ lat: 43.6532, lng: -79.3832, })

	const handleFetch = async () => {
		console.log("Locations are fetching...");
		const res = await fetch("/api/marker")
		const data = await res.json()
		setMarkers(data)
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
			<div className="w-full h-screen relative flex justify-center">
				<span className="w-full h-full relative bg-slate-500 shadow-xl rounded-xl">
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={8}
						center={centerRef.current}
						options={{
							scrollwheel: true,
							mapTypeId: google.maps.MapTypeId.TERRAIN,
							styles: [],
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
					</GoogleMap>
				</span>
			</div>
		</>
	)
}