import { API_URL } from '@CONST/const'
import axios from 'axios'

const API_TOKEN = import.meta.env.VITE_API_TOKEN

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`
	}
})

export async function getAllMoviesCategories(id, page = 1) {
	const date = new Date()
	const year = date.getFullYear()

	try {
		const response = await axiosInstance.get('/discover/movie', {
			params: {
				primary_release_year: year,
				page: page,
				language: 'es-MX',
				with_genres: id
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

export async function getAllCategories() {
	try {
		const response = await axiosInstance.get(`/genre/movie/list`, {
			params: {
				language: 'es-MX'
			}
		})
		return response.data
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}

export async function getMovieTrailer(id) {
	try {
		const response = await axiosInstance.get(`/movie/${id}/videos`, {
			params: {
				language: 'es-MX'
			}
		})
		return response.data.results[0]
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}

export async function searchMovies(keyword, page = 1) {
	try {
		const response = await axiosInstance.get(`/search/movie`, {
			params: {
				language: 'es-MX',
				query: keyword,
				page
			}
		})
		return response.data.results
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}

export async function getImages(id_movie) {
	try {
		const response = await axiosInstance.get(`/movie/${id_movie}/images`, {
			params: {
				language: 'es'
			}
		})
		return response.data
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}

export async function getRecommendationsMovies(id_movie) {
	try {
		const response = await axiosInstance.get(
			`/movie/${id_movie}/recommendations`,
			{
				params: {
					language: 'es-MX'
				}
			}
		)
		return response.data.results
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}
