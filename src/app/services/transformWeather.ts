import * as moment from 'moment'; // add this 1 of 4
import 'moment/locale/ar';
import {
    SUN,
    THUNDER,
    CLOUD,
    DRIZZLE,
    RAIN,
    SNOW
} from './constants/weatherIconState';

export const getWeatherState = weatherState => {
    const { id } = weatherState[0];
    if (id < 300) {
        return THUNDER;
    } else if (id < 400) {
        return DRIZZLE;
    } else if (id < 600) {
        return RAIN;
    } else if (id < 700) {
        return SNOW;
    } else if (id === 800) {
        return SUN;
    } else {
        return CLOUD;
    }
};

const transformWeather = weatherData => {
    const {
        humidity,
        temp
    } = weatherData.main;
    const {
        speed
    } = weatherData.wind;
    const weatherState = getWeatherState(weatherData.weather);

    return {
        humidity,
        temperature: Math.floor(temp),
        weatherState,
        wind: speed
    };
};
const getForecastAverage = collapsedForecast => {
    return Object.keys(collapsedForecast).map((day) => {
        const collapsedDay = {
            temperature: 0,
            humidity: 0,
            wind: 0,
            weatherState: ''
        };
        const len = collapsedForecast[day].length;
        collapsedForecast[day].forEach((val) => {
            collapsedDay.humidity += val.data.humidity;
            collapsedDay.temperature += val.data.temperature;
            collapsedDay.wind += val.data.wind;
            collapsedDay.weatherState = val.data.weatherState;
        });

        return {
            temperature: Math.floor(collapsedDay.temperature / len),
            humidity: Math.floor(collapsedDay.humidity / len),
            wind: Math.floor(collapsedDay.wind / len),
            weatherState: collapsedDay.weatherState,
            weekDay: day
        };
    });
};

const collapseForecastByDay = forecastData => {
    const collapsedForecast = {};
    forecastData.forEach(forecast => {
        if (!Array.isArray(collapsedForecast[forecast.weekDay])) {
            collapsedForecast[forecast.weekDay] = [];
        }
        collapsedForecast[forecast.weekDay].push(forecast);
    });
    return getForecastAverage(collapsedForecast);
};


export const transformForecast = data => {
    const mappedForecast = data.list.map(item => ({
        weekDay: moment.unix(item.dt).format('dddd'),
        data: transformWeather(item)
    }));
    return collapseForecastByDay(mappedForecast);
};

