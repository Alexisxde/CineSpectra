import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3/discover/movie'
const API_TOKEN = import.meta.env.VITE_API_TOKEN
// const API_KEY = import.meta.env.VITE_API_KEY

const options = {
	method: 'GET',
	url: `${API_URL}`,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`
	}
}

export const fetchMovies = async () => {
	try {
		const response = await axios.get(API_URL, options)
		return response.data.results
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}
