"use client"
import { useEffect, useState, useRef } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import MapLocationAdd from "./MapLocationAdd";

export const Map = () => {
	const router = useRouter();
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [posts, setPosts] = useState([]);

	const [map, setMap] = useState()
	const ref = useRef();
	const markerRef = useRef()

	const mapOptions = {
		mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
		center: { lat: 43.6532, lng: -79.3832, },
		zoom: 8,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		scrollwheel: true,
	}

	const handleSubmit = async (e, imageURL, textboxContent) => {
		try {
			e.preventDefault();
			console.log(latitude, longitude, imageURL, textboxContent)
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
			console.log(newPostID)
			if(newPostID){
				router.push(`/view-map`)
			}

		} catch (error) {
			console.error(error);
		}
	}

	function addClickEventListener() {
		console.log("addClickEventListener")
		map.addListener("click", (mapsMouseEvent) => {
			const lat = mapsMouseEvent.latLng.lat();
			const lng = mapsMouseEvent.latLng.lng(); 
			setLatitude(lat.toFixed(3).toString());
			setLongitude(lng.toFixed(3).toString());
			markerRef.current.setPosition({ lat, lng });
			console.log(markerRef.current)
		});
	}

	useEffect(() => {
		if (!map) {
			setMap(new window.google.maps.Map(ref.current, mapOptions))
		} else {
			markerRef.current = new google.maps.Marker({
				position: { lat: 43.6532, lng: -79.3832 },
				map,
				icon: '/location_on.svg',
			});
			addClickEventListener();
		}
	}, [map])
	return (
		<>
			<div className="w-full h-full relative flex flex-col justify-center items-center my-10">
				<h1 className="text-xl bg-white/90 border rounded-2xl px-5 py-4 my-2 shadow-xl">Select the location of the picture on the map</h1>
				<span className="w-10/12 h-screen relative shadow-xl border-2 border-blue-800">
					{
						<div ref={ref} className=" w-full h-screen"></div>
					}
				</span>
			</div>
			<div>
				<MapLocationAdd longitude={longitude} latitude={latitude} handleSubmit={handleSubmit} />
			</div>
		</>
	)
}

export default Map
