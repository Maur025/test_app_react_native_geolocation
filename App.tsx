/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {
	DefaultTheme,
	NavigationContainer,
	DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeStackScreen from './src/components/layout/navigation/HomeStackScreen'
import MapStackScreen from './src/components/layout/navigation/MapStackScreen'
import ListStackScreen from './src/components/layout/navigation/ListStackScreen'
import NotificationStackScreen from './src/components/layout/navigation/NotificationStackScreen'
import SettingStackScreen from './src/components/layout/navigation/SettingStackScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

type RootStackParamList = {
	Home: undefined
	[key: string]: any
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const App = (): React.JSX.Element => {
	const isDarkMode = useColorScheme() === 'dark'

	const getIconObject = (
		{
			focused,
			color,
			size,
		}: {
			focused: any
			color: string
			size: number
		},
		{ route }: { route: any }
	): React.JSX.Element => {
		let iconName: string = ''
		switch (route.name) {
			case 'HomeStack':
				iconName = focused ? 'home' : 'home-outline'
				break
			case 'ListStack':
				iconName = focused ? 'grid' : 'grid-outline'
				break
			case 'MapStack':
				iconName = focused ? 'map' : 'map-outline'
				break
			case 'NotificationStack':
				iconName = focused ? 'notifications' : 'notifications-outline'
				break
			case 'SettingStack':
				iconName = focused ? 'settings' : 'settings-outline'
				break
			default:
				break
		}
		return <Ionicons name={iconName} size={size} color={color} />
	}

	return (
		<GluestackUIProvider
			colorMode={isDarkMode ? 'dark' : 'light'}
			config={config}
		>
			<SafeAreaProvider>
				<NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Home">
							{() => (
								<Tab.Navigator
									screenOptions={({ route }) => ({
										headerShown: false,
										tabBarStyle: {
											height: 70,
											paddingHorizontal: 5,
											paddingTop: 0,
											borderTopLeftRadius: 25,
											borderTopRightRadius: 25,
										},
										tabBarIcon: ({ focused, color, size }) =>
											getIconObject({ focused, color, size }, { route }),
										tabBarLabelStyle: { paddingBottom: 10 },
										tabBarIconStyle: { marginTop: 10 },
										tabBarActiveTintColor: 'purple',
										tabBarInactiveTintColor: 'gray',
									})}
								>
									<Tab.Screen
										name="HomeStack"
										component={HomeStackScreen}
										options={{
											title: 'Inicio',
										}}
									/>
									<Tab.Screen
										name="MapStack"
										component={MapStackScreen}
										options={{
											title: 'Mapa',
										}}
									/>
									<Tab.Screen
										name="ListStack"
										component={ListStackScreen}
										options={{
											title: 'Lista',
										}}
									/>
									<Tab.Screen
										name="NotificationStack"
										component={NotificationStackScreen}
										options={{ tabBarBadge: 3, title: 'Notificaciones' }}
									/>
									<Tab.Screen
										name="SettingStack"
										component={SettingStackScreen}
										options={{ title: 'Configuracion' }}
									/>
								</Tab.Navigator>
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</GluestackUIProvider>
	)
}

export default App
