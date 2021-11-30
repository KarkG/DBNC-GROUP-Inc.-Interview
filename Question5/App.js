import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
} from 'react-native';
import 'react-native-url-polyfill/auto';

export default function App() {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('Montréal');
	const [date, setDate] = useState(new Date());
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		apiCall();
		setName('');
	}, [location, date]);

	const apiCall = async () => {
		let woeAPICall = await fetch(
			`https://www.metaweather.com/api/location/search/?query=${location}`
		);
		let woeAPICallJson = await woeAPICall.json();
		let woeId = woeAPICallJson[0].woeid;
		let locationAndDateAPICall = await fetch(
			`https://www.metaweather.com/api/location/${woeId}/${date
				.toISOString()
				.split('T')[0]
				.replace(/-/g, '/')}/`
		);
		let locationAndDateAPICallJson = await locationAndDateAPICall.json();
		setData(locationAndDateAPICallJson[0]);
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={{ fontSize: 30 }}
				onChangeText={(text) => setName(text)}
				onSubmitEditing={() => {
					if (name) setLocation(name);
				}}
				placeholder={'Enter location name'}
				returnKeyType={'search'}
				value={name}
			/>
			<TouchableOpacity
				style={{
					height: 50,
					marginTop: 10,
					backgroundColor: '#32a5e4',
					borderRadius: 10,
				}}
				onPress={() => setShow(true)}
			>
				<Text
					style={{
						fontSize: 30,
						color: 'white',
						marginRight: 20,
						marginLeft: 20,
						marginTop: 3,
					}}
				>
					{date.toDateString()}
				</Text>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					display='default'
					onChange={onChange}
				/>
			)}
			<Text style={{ fontSize: 50 }}>{location}</Text>
			<Text style={{ fontSize: 40 }}>{Math.round(data.the_temp) + '˚C'}</Text>
			<Image
				style={{
					width: 200,
					height: 200,
				}}
				source={{
					uri: `https://www.metaweather.com/static/img/weather/png/${data.weather_state_abbr}.png`,
				}}
			/>
			<Text style={{ fontSize: 30 }}>{data.weather_state_name}</Text>

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
