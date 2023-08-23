import { useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"

export const Marker = ({ map, children, position, onClick }) => {

	const markerRef = useRef()
	const rootRef = useRef()

	useEffect(() => {
		if (!rootRef.current) {
			const container = document.createElement("div")
			rootRef.current = createRoot(container)
			markerRef.current = new google.maps.marker.AdvancedMarkerView({
				position,
				content: container,
			});
		}
		return () => (markerRef.current.map = null);
	}, [])
	useEffect(() => {
		rootRef.current.render(children)
		markerRef.current.position = position
		markerRef.current.map = map
		const listener = markerRef.current.addListener("click", onClick);
		return () => listener.remove();
	}, [map, position, children, onClick]);
}

export default Marker