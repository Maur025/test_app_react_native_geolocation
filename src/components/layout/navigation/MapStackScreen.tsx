import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useColorScheme, StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import MapScreen from '../../../screens/MapScreen'

const MapStack = createNativeStackNavigator()

const MapStackScreen = (): React.JSX.Element => {
	const isDarkMode = useColorScheme() === 'dark'
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}
	return (
		<>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<MapStack.Navigator>
				<MapStack.Screen
					name="Home"
					component={MapScreen}
					options={{ headerShown: false }}
				/>
			</MapStack.Navigator>
		</>
	)
}

export default MapStackScreen
