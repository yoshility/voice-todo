// import { StatusBar } from 'expo-status-bar'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const App = (): JSX.Element => {
  return (
    <View className='flex-1 bg-gray-200'>
      {/* Header */}
      <View className='bg-red-100 p-4 h-20 justify-end items-center'>
        <Text>Header here</Text>
      </View>

      {/* Todo list */}
      <View className='flex-1 bg-blue-100 p-4'>
        <FlatList
          data={[
            {text: 'kaimono', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'},
            {text: 'honkaesu', createdAt: '2025/02/21'}
          ]}
          renderItem={({ item }) => (
            <View className='bg-white p-4 rounded-lg mb-2 items-center'>
              <Text className='text-lg'>{item.text}</Text>
              <Text className='text-sm text-gray-500'>{item.createdAt}</Text>
            </View>
          )}
        />
      </View>

      {/* voice button */}
      <View className='bg-green-green items-center'>
        <TouchableOpacity className='bg-green-500 p-4 rounded-full'>
          <Text>Mic</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// const App = (): JSX.Element => {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100,
//     paddingBottom: 100,
//     backgroundColor: '#ccd',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

export default App
