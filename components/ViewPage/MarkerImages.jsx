import { useEffect, useState } from "react";
import Marker from "@/components/ViewPage/Marker"
import Image from "next/image";
import { useRouter } from "next/navigation";

const MarkerImages = ({ map }) => {
	const [data, setData] = useState([null])
	const [loading, setLoading] = useState(true)
	const router = useRouter();

	const handleMarkerClick = (markerID) => {
		router.push(`/posts/${markerID}`);
	}

	const handleFetch = async () => {
		console.log("Locations are fetching...");
		const res = await fetch("/api/marker")
		const data = await res.json()
		setData(data)
		setLoading(false)
	}
	useEffect(() => {
		handleFetch()
	}, [])

	return (
		<>
			{!loading && map && Object.entries(data).map(([key, marker]) => (
				<Marker
					key={key}
					map={map}
					position={{
						lat: parseFloat(marker.latitude),
						lng: parseFloat(marker.longitude),
					}}
					onClick={() => handleMarkerClick(marker.id)}
				>
					<div className="w-16 h-14 border-2 border-purple-100  rounded-full overflow-hidden text-white relative">
						<Image src={marker.imageURL} fill alt="image" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
					</div>
				</Marker>
			))}
		</>
	)
}
export default MarkerImages