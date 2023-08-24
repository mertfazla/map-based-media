import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { createRoot } from "react-dom/client"
import { useRef } from "react";

const MarkerImages = ({ map }) => {
	const [data, setData] = useState([null])
	const [loading, setLoading] = useState(true)
	const router = useRouter();
	const rootRef = useRef()

	const handleMarkerClick = (markerID) => {
		router.push(`/posts/${markerID}`);
	}
	function handleClusterer() {
		const markers = data.map((marker) => {
			const container = document.createElement("div")
			rootRef.current = createRoot(container)
			rootRef.current.render(
				<div className="w-16 h-14 border-2 border-purple-100  rounded-full overflow-hidden text-white relative">
					<Image src={marker.imageURL} fill alt="image" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</div>
			)
			const markerElement = new google.maps.marker.AdvancedMarkerView({
				position: { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) },
				content: container,
			});
			markerElement.addListener("click", () => handleMarkerClick(marker.id))
			return markerElement
		})
		const markerClusterer = new MarkerClusterer({ markers, map });
		console.log("Clusterer is ready");
		return markerClusterer;
	}

	const handleFetch = async () => {
		console.log("Locations are fetching...");
		const res = await fetch("/api/marker")
		const data = await res.json()
		setData(data)
		setLoading(false)
	}
	useEffect(() => {
		if (!loading) {
			const markerClusterer = handleClusterer()
		} else {
			handleFetch()
		}
	}, [data, loading])
}
export default MarkerImages