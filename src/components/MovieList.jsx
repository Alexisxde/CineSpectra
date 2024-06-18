import { useState, useEffect } from 'react'
import { fetchMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard'

export default function MoviesList() {
	const [movies, setMovies] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await fetchMovies()
				setMovies(data)
			} catch (error) {
				setError(error.message)
			}
		}
		getMovies()
	}, [])

	if (error) {
		return <div>{error}</div>
	}

	return (
		<>
			<h1 className='my-8 text-center text-3xl font-bold'>Movies List</h1>
			<section className='flex flex-wrap justify-center'>
				{movies.map(movie => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
		</>
	)
}
