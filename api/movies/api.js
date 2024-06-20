import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3'
const API_TOKEN = import.meta.env.VITE_API_TOKEN

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`
	}
})

export async function getAllMovies(page = 1) {
	try {
		const response = await axiosInstance.get('/discover/movie', {
			params: {
				page: page,
				language: 'es-MX'
			}
		})
		return response.data.results
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}
export async function getOneMovie(id) {
	try {
		const response = await axiosInstance.get(`/movie/${id}`, {
			params: {
				language: 'es-MX'
			}
		})
		return response.data
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}

export async function getMovieCategories(id) {
	try {
		const response = await axiosInstance.get(`/movie/${id}`)
		return response.data
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}
