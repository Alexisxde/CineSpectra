import axios from 'axios'
import { API_URL } from '@CONST/const'

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
				primary_release_year: 2024,
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

export async function getMovieTrailer(id) {
	try {
		const response = await axiosInstance.get(`/movie/${id}/video`, {
			params: {
				language: 'es-MX'
			}
		})
		return response.data
	} catch (error) {
		throw new Error('Error fetching movies: ' + error.message)
	}
}
