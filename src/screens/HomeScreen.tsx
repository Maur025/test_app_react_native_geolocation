import * as React from 'react'
import {
	Text,
	View,
	Button,
	ButtonText,
	ButtonIcon,
	AddIcon,
} from '@gluestack-ui/themed'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = (): React.JSX.Element => {
	const insets = useSafeAreaInsets()
	return (
		<>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					// Paddings to handle safe area
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				}}
			>
				<Text style={{ fontSize: 24, marginBottom: 20 }}>Mi Aplicación</Text>
				<Button
					size="md"
					variant="solid"
					action="primary"
					isDisabled={false}
					isFocusVisible={false}
				>
					<ButtonText>Add </ButtonText>
					<ButtonIcon as={AddIcon} />
				</Button>
			</View>
		</>
	)
}

export default HomeScreen
