import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
		Without params - show the weather
		-h show help
		-s [CITY] setup a city
		-t [API_KEY] save a token
		`
    );
}

const printWeather = (res) => {
    const { name, main, weather, wind, clouds, sys } = res;
    const icon = getIcon(weather[0].icon);
    console.log(
        dedent`${chalk.bgYellow(' WEATHER IN ')} ${name.toUpperCase()}
		${icon}  ${weather[0].description}
		Temp: ${Math.round(main.temp)} (Feels like ${Math.round(main.feels_like)})
		Humidity: ${main.humidity}%
		Wind speed: ${wind.speed}
		Clouds: ${clouds.all}%
		`
    );
};

export { printSuccess, printError, printHelp, printWeather };
