import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = 'c96043413d4a55e5dcfd270f7e0e76f6'; 
const cities = ['İstanbul', 'Mardin', 'İzmir', 'Ankara', 'Trabzon', 'Antalya'];

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = cities.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},TR&units=metric&appid=${API_KEY}&lang=tr`)
        );
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Hava durumu verileri alınırken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Günlük Hava Durumları</Text>
      {weatherData.map((cityData, index) => (
        <View key={index} style={styles.cityContainer}>
          <Text style={styles.cityName}>{cityData.name}</Text>
          <Text style={styles.temperature}>{Math.round(cityData.main.temp)}°C</Text>
          <Text style={styles.humidity}>Nem: %{cityData.main.humidity}</Text>
          <Text style={styles.description}>{cityData.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#f0ffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00008b',
  },
  cityContainer: {
    backgroundColor: '#00008b',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: 'white',
    borderWidth: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0ffff',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 18,
    color: '#e6e6fa',
  },
  humidity: {
    fontSize: 16,
    color: '#f0ffff',
  },
  description: {
    fontSize: 16,
    color: '#f0ffff',
    fontStyle: 'italic',
  },
});

export default App;