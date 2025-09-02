import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import './App.css';

// --- Konfigurasi API ---
// Ganti dengan API Key Anda dari openweathermap.org
const WEATHER_API_KEY = '4784502259eaff45037fa5d7f955d997'; 
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}}';
const PRODUCT_API_URL = 'https://dummyjson.com/products/search';

// --- Tipe Data (TypeScript) ---
interface WeatherData {
  name: string;
  main: { temp: number; humidity: number; };
  weather: { main: string; description: string; icon: string; }[];
  wind: { speed: number; };
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function App() {
  // === CHECKPOINT 1: WEATHER APP ===
  const [city, setCity] = useState(''); // State untuk controlled input kota
  const debouncedCity = useDebounce(city, 500); // Debounce input kota selama 500ms

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!debouncedCity) {
        setWeatherData(null);
        setWeatherError(null);
        return;
      }
      
      setWeatherLoading(true);
      setWeatherError(null);
      setWeatherData(null);

      try {
        const response = await fetch(`${WEATHER_API_URL}?q=${debouncedCity}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Kota tidak ditemukan atau terjadi kesalahan jaringan.');
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        setWeatherError((err as Error).message);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedCity]); // Efek ini hanya berjalan saat debouncedCity berubah

  // === CHECKPOINT 2: PRODUCT SEARCH ===
  const [searchTerm, setSearchTerm] = useState(''); // State untuk controlled input produk
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce input produk

  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!debouncedSearchTerm) {
        setProducts([]);
        return;
      }

      setProductLoading(true);
      setProducts([]);

      try {
        const response = await fetch(`${PRODUCT_API_URL}?q=${debouncedSearchTerm}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        // Bisa juga ditambahkan state error jika diperlukan
        console.error("Gagal fetch produk:", err);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]); // Efek ini hanya berjalan saat debouncedSearchTerm berubah

  return (
    <div className="container">
      {/* Bagian Weather App */}
      <div className="card">
        <h1>Weather App 🌤️</h1>
        <p>Ketik nama kota untuk melihat cuaca saat ini.</p>
        <input
          type="text"
          placeholder="Contoh: Jakarta"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        {/* Tampilan Loading & Error State */}
        {weatherLoading && <p className="loading-text">Mencari data cuaca...</p>}
        {weatherError && <p className="error-text">{weatherError}</p>}
        
        {/* Tampilan Hasil Cuaca */}
        {weatherData && (
          <div className="weather-result">
            <h2>{weatherData.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="description">{weatherData.weather[0].main} ({weatherData.weather[0].description})</p>
            <div className="details">
              <span>Kelembapan: {weatherData.main.humidity}%</span>
              <span>Angin: {weatherData.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>

      <hr />

      {/* Bagian Product Search */}
      <div className="card">
        <h1>Product Search 🛍️</h1>
        <p>Ketik nama produk yang ingin Anda cari.</p>
        <input
          type="text"
          placeholder="Contoh: iPhone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        {/* Tampilan Loading State */}
        {productLoading && <p className="loading-text">Mencari produk...</p>}
        
        {/* Tampilan Hasil Produk */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
        
        {/* Tampilan Jika Produk Tidak Ditemukan */}
        {!productLoading && products.length === 0 && debouncedSearchTerm && (
          <p className="info-text">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default App;
