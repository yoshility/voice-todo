import { View, Text } from 'react-native'

const Header = (): JSX.Element => {
    return (
        <View className='bg-red-100 p-4 h-20 justify-end'>
            <View className='items-center'>
                <Text className='text-base'>My App</Text>
                <Text className='absolute right-0.5'>Logout</Text>
            </View>
        </View>
    )
}

export default Header
