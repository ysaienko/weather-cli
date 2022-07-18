#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY} from './services/storage.service.js';
import { getWeather } from './services/api.service.js';
import { printWeather } from './services/log.service.js'

const saveToken = async (token) => {
    if(!token.length) return printError('Please set a token');
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token successfully saved');
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) return printError('Please set a city');
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City successfully saved');
    } catch (error) {
        printError(error.message);
    }
}

const getForecast = async () => {
   const city = await getKeyValue(TOKEN_DICTIONARY.city);
    try {
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (error) {
        if(error?.response?.status === 404) return printError('Incorrect city')
        if(error?.response?.status === 401) return printError('Incorrect token')

        return printError(error.message)
    }

}

const initCLI = () => {
    const args = getArgs(process.argv);

    if(args.h) return printHelp();
    if(args.s) return saveCity(args.s);
    if(args.t) return saveToken(args.t);

    return getForecast()
}

initCLI();
