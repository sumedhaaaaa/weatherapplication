import React, { useEffect, useState } from 'react';
import CurrTime from "./CurrTime";
import ReactAnimatedWeather from 'react-animated-weather';
import search from '../assets/search-outline.svg';

const Forcast = () => {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({});

    const searchcity = async (city) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city !== "[object object]" ? city : location}&units=metric&appid=0861a5029ae242c98d1f8edcbf54215c`);
            const data = await res.json();
            setData(data);
            setLocation("");
            console.log("Fine everything")
        }

        catch {
            setData({"code" : "-1"})
            console.log("Unknow Error occured");
        }
    }

    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            searchcity(location);
        }
    }

    const handleClick = () => {
        searchcity(location);
    }

    useEffect(() => {
        searchcity("Greater Noida");
    }, []); 

    const defaults = {
        icon: 'CLEAR_DAY',
        color: "white",
        size: 112,
        animate: true,
    };

    return (
        <div className="forcast">
            <div className="forcast-icon">
                <ReactAnimatedWeather
                    icon={defaults.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                />
            </div>
            <div className="today-weather">
                <h3>WeatherApplication</h3>
                <div className="search-box">
                    <input
                        type="text"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        onKeyDown={searchLocation}
                        placeholder='Enter Location'
                        className='search-bar'
                    />
                    <img src={search} onClick={handleClick} className="search-icon" />
                </div>

                {
                    data.cod < 400 ? (
                        <div >
                            {" "}
                            <div className='city--heading'>
                                <p>{data.name}, {data.sys.country}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                />
                            </div>
                            <ul>
                                <li>
                                    Temperature
                                    <span className="temp">
                                        {Math.round(data.main.temp)}°C ({data.weather[0].main})
                                    </span>
                                </li>
                                <li>
                                    Humidity
                                    <span className="temp">
                                        {Math.round(data.main.humidity)}%
                                    </span>
                                </li>
                                <li>
                                    Visibility
                                    <span className="temp">
                                        {Math.round(data.visibility)} mi
                                    </span>
                                </li>
                                <li>
                                    Wind Speed
                                    <span className="temp">
                                        {Math.round(data.wind.speed)} mps
                                    </span>
                                </li>
                                <li>
                                    Feels Like
                                    <span className="temp">
                                        {data.main.feels_like.toFixed()}°C
                                    </span>
                                </li>
                            </ul>
                        </div>
                    ) 
                    : (data.cod == 404) ? (
                        <p className='city--heading'>City not found!</p>
                    ) 
                    : (data.cod == 401) ? (
                        <p className='city--heading'>Invalid API Key </p>
                    )
                    : (data.code == -1) ? (
                        <p className='city--heading'>API down</p>
                    ) : null
                }

                <div className="time">
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <CurrTime />
                </div>

            </div>
        </div>
    )
}

export default Forcast;