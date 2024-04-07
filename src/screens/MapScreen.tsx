import React, { useState, useEffect } from 'react'
import BackgroundGeolocation, {
	Subscription,
} from 'react-native-background-geolocation'
import { View, Text, Switch, ScrollView, Card } from '@gluestack-ui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapComponent from '../components/map/MapComponent'

const MapScreen = (): React.JSX.Element => {
	const insets = useSafeAreaInsets()
	const [enabled, setEnabled] = useState<boolean>(false)
	const [location, setLocation] = useState<string>('')
	const [currentLocationObject, setCurrentLocationObject] = useState<{
		[key: string]: any
	}>({})

	useEffect(() => {
		const onLocation: Subscription = BackgroundGeolocation.onLocation(
			location => {
				console.log('[onLocation]: ', location)
				setLocation(JSON.stringify(location, null, 2))
				setCurrentLocationObject(location)
			}
		)

		const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
			event => {
				console.log('[onMotionChange]: ', event)
			}
		)

		const onActivityChange: Subscription =
			BackgroundGeolocation.onActivityChange(event => {
				console.log('[onActivityChange]: ', event)
			})

		const onProviderChange: Subscription =
			BackgroundGeolocation.onProviderChange(event => {
				console.log('[onProviderChange]: ', event)
			})

		BackgroundGeolocation.ready({
			// Geolocation Config
			desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
			distanceFilter: 5,
			// Activity Recognition
			stopTimeout: 2,
			// Application config
			debug: true,
			logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
			stopOnTerminate: false,
			startOnBoot: true,
			// HTTP / SQLite config
			// url: 'http://yourserver.com/locations',
			// batchSync: false,
			// autoSync: true,
			// headers: {
			// 	'X-FOO': 'bar',
			// },
			// params: {
			// 	auth_token: 'maybe_your_server_authenticates_via_token_YES?',
			// },
		}).then(state => {
			setEnabled(state.enabled)
			console.log(
				'BackgroundGeolocation is configured and ready: ',
				state.enabled
			)
		})

		return () => {
			onLocation.remove()
			onMotionChange.remove()
			onActivityChange.remove()
			onProviderChange.remove()
		}
	}, [])

	useEffect(() => {
		const initBackgroundGeolocationByEnabled = (): void => {
			if (enabled) {
				BackgroundGeolocation.start()
			} else {
				BackgroundGeolocation.stop()
				setLocation('')
				setCurrentLocationObject({})
			}
		}
		initBackgroundGeolocationByEnabled()
	}, [enabled])

	return (
		<>
			<ScrollView
				style={{
					flex: 1,
					// Paddings to handle safe area
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				}}
			>
				<View style={{ flex: 1 }}>
					<MapComponent location={currentLocationObject} />
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 20,
					}}
				>
					<Text>Click to Enable BackgroundGeolocation</Text>
					<Switch
						style={{ padding: 10 }}
						value={enabled}
						onValueChange={setEnabled}
					/>
				</View>
				<View style={{ padding: 20 }}>
					<Card>
						<Text style={{ marginBottom: 10 }}>DATOS DE UBICACION</Text>
						<Text style={{ paddingLeft: 10 }}>
							Actividad: {currentLocationObject.activity?.type || 'N/A'}
						</Text>
						<Text style={{ paddingLeft: 10 }}>
							Precision: {currentLocationObject.coords?.accuracy || 'N/A'}
						</Text>
						<Text style={{ paddingLeft: 10 }}>
							Altitud: {currentLocationObject.coords?.altitude || 'N/A'}
						</Text>
						<Text style={{ paddingLeft: 10 }}>
							Latitud: {currentLocationObject.coords?.latitude || 'N/A'}
						</Text>
						<Text style={{ paddingLeft: 10 }}>
							Longitud: {currentLocationObject.coords?.longitude || 'N/A'}
						</Text>
					</Card>
				</View>
			</ScrollView>
		</>
	)
}

export default MapScreen
