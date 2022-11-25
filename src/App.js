import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Time from 'react-time';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("Toronto");
    const [time] = useState(new Date());
    
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9fb336a7dcc475fb13e2e8d3cb229a19`;
    
    const getWeather = () => {
      axios.get(url).then(res => {
        setData(res.data);
        console.log(res.data)
    });
    }

    const searchLocation = (e) => {
        if(e.key === 'Enter'){
            axios.get(url).then(res => {
                setData(res.data);
                console.log(res.data)
            });
            setLocation("");
        }
    }

    useEffect( () => {
      getWeather();
    }, []);

    return (
        <div className='app'>
          <div className='container'>
            <div className='search'>
                <input type='text' placeholder='Enter Location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onKeyPress={searchLocation}
                />
            </div>
            <div className='box1'>
              <div className='day'><p>{weekday[time.getDay()]}</p></div>
              <div className='date'><p>{time.getDate()} {month[time.getMonth()]} {time.getFullYear()}</p></div>
              <div className='location'><p>{data.name}</p></div>
              <div className='temperature'><p>{(data.main.temp - 273.15).toFixed()}°C</p></div>
              <div className='weather'><p>{data.weather[0].main}</p></div>
            </div>
            <div className='box2'>
              <div className='humidity'><p>Humidity: {data.main.humidity}</p></div>
              <div className='wind'><p>Wind: {data.wind.speed}</p></div>
              <div className='pressure'><p>Air Pressure: {data.main.pressure} mb</p></div>
              <div className='min'><p>Min Temp: {data.main.temp_min}°C</p></div>
              <div className='max'><p>Max Temp: {data.main.temp_max}°C</p></div>
            </div>
          </div>
        </div>
    )
}

export default App