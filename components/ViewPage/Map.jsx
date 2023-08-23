import { useEffect, useState, useRef } from "react"
import MarkerImages from "./MarkerImages";

export const Map = () => {
	const [map, setMap] = useState()
	const ref = useRef();

	const mapOptions = {
		mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
		center: { lat: 43.6532, lng: -79.3832, },
		zoom: 8,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		scrollwheel: true,
	}

	useEffect(() => {
		setMap(new window.google.maps.Map(ref.current, mapOptions))
	}, [])

	return (
		<>
			<div ref={ref} className=" w-full h-screen">
				{map && <MarkerImages map={map} />}
			</div>
		</>
	)
}

export default Map