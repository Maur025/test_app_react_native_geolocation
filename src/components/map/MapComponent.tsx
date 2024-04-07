import React, { useRef, useState, useEffect } from 'react'
import { View, Text } from '@gluestack-ui/themed'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet } from 'react-native'

const MapComponent = (props: any): React.JSX.Element => {
	const mapRef = useRef(null)
	const [loadingMap, setLoadingMap] = useState<boolean>(false)
	const [latitudeMarker, setLatitudeMarker] = useState<number>(0)
	const [longitudeMarker, setLongitudeMarker] = useState<number>(0)

	const styles = StyleSheet.create({
		container: {
			// ...StyleSheet.absoluteFillObject,
			height: 400,
			width: 400,
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		map: {
			...StyleSheet.absoluteFillObject,
		},
	})

	useEffect(() => {
		setLoadingMap(true)
	}, [])

	useEffect(() => {
		let isSubscribed: boolean = true
		const getMarkerLatLng = (): void => {
			if (props?.location?.coords?.latitude) {
				setLatitudeMarker(props?.location?.coords?.latitude)
			}
			if (props?.location?.coords?.longitude) {
				setLongitudeMarker(props?.location?.coords?.longitude)
			}
		}

		if (isSubscribed) {
			getMarkerLatLng()
		}

		return (): void => {
			isSubscribed = false
		}
	}, [props.location])

	return (
		<>
			<View style={styles.container}>
				{loadingMap ? (
					<MapView
						ref={mapRef}
						provider={PROVIDER_GOOGLE}
						style={styles.map}
						loadingEnabled={true}
						mapType="standard"
						rotateEnabled={false}
						camera={{
							center: {
								latitude: latitudeMarker || 0,
								longitude: longitudeMarker || 0,
							},
							heading: 0,
							pitch: 0,
							zoom: 18,
						}}
					>
						<Marker
							coordinate={{
								latitude: latitudeMarker || 0,
								longitude: longitudeMarker || 0,
							}}
							title="Marker Title"
							description="Marker Description"
						/>
					</MapView>
				) : (
					<View>
						<Text>No se pudo cargar el Mapa</Text>
					</View>
				)}
			</View>
		</>
	)
}

export default MapComponent
