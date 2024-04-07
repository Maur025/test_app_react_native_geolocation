import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import HomeScreen from '../../../screens/HomeScreen'
import { useColorScheme, StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const SettingStack = createNativeStackNavigator()

const SettingStackScreen = (): React.JSX.Element => {
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
			<SettingStack.Navigator>
				<SettingStack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
			</SettingStack.Navigator>
		</>
	)
}

export default SettingStackScreen
