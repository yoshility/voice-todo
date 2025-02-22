import { FlatList, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import Header from '../../components/Header'

interface Item {
	id: number
	name: string
	created_at: string
}

const List = (): JSX.Element => {
	const [inputValue, setInputValue] = useState('')
	const [items, setItems] = useState<Item[]>([])

	// ---------- Get item ----------
	useEffect(() => {
		const fecthItems = async () => {
			try {
				const response = await fetch('http://192.168.3.5:8000/api/items/')
				console.log('connected!')
				if (!response.ok) {
					console.error('Failed to get items:', response)
				}
				const data = await response.json()
				console.log('data(get):', data)
				setItems(data)
			} catch (error) {
				console.error('Failed to connect(get):', error)
			}
		}
		fecthItems()
	}, [])

	// ---------- Send item ----------
	const handleSend = async () => {
		const newItem = {
			name: inputValue,
			created_at: new Date().toLocaleString('ja-JP', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false // 24h
			})
		}
		try {
			const response = await fetch('http://192.168.3.5:8000/api/items/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newItem)
			})
			if (!response.ok) {
				console.error('Failed to send items:', response)
			}
			const data = await response.json()
			console.log('data(send):', data)
			setItems([data, ...items])
			setInputValue('')
		}
		catch (error) {
			console.error('Failed to connect(send):', error)
		}
	}

	// ---------- Delete item ----------
	const handleDelete = (id: number) => {
		Alert.alert('メモを削除します', 'よろしいですか？', [
			{
				text: 'キャンセル'
			},
			{
				text: '削除',
				onPress: async () => {
					try {
						const response = await fetch('http://192.168.3.5:8000/api/items/'+id+'/', {
							method: 'DELETE'
						})
						if (!response.ok) {
							console.error('Failed to delete items:', response)
						}
						const newItems = items.filter((item) => item.id !== id)
						setItems(newItems)
					} catch (error) {
						console.error('Failed to connect(delete):', error)
					}
				}
			}
		])
	}

	return (
		<View className='flex-1 bg-gray-200'>
			{/* Status bar */}
			<StatusBar style="auto" />

			{/* Header */}
			<Header />

			{/* Todo list */}
			<View className='flex-1 bg-blue-100 p-4'>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<View className='bg-white px-4 py-2 rounded-lg mb-2 flex-row justify-between items-center'>
							<View>
								<Text className='text-lg'>{item.name}</Text>
								<Text className='text-sm text-gray-500'>{item.created_at}</Text>
							</View>
							<TouchableOpacity
								className='bg-gray-200 h-8 w-8 rounded-full justify-center items-center'
								onPress={() => handleDelete(item.id)}
							>
								<AntDesign name='close' size={16} color='black' />
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>

			{/* Input and Voice */}
			<View className='bg-green-100 px-4 py-2'>
				<View className='flex-row items-center justify-between px-4 py-2 border rounded-full'>
					<TextInput
						className='text-base flex-1 bg-purple-100'
						value={inputValue}
						onChangeText={(text) => setInputValue(text)}
						placeholder='Add memo'
					/>
					{inputValue ? (
						<TouchableOpacity
							className='bg-green-500 h-12 w-12 rounded-full justify-center items-center'
							onPress={handleSend}
						>
							<Text>Send</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity className='bg-green-500 h-12 w-12 rounded-full justify-center items-center'>
							<Text>Mic</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	)
}

export default List
