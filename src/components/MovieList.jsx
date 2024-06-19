import { useState, useEffect } from 'react'
import { getAllMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard'

export default function MoviesList() {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await getAllMovies(currentPage)
				setMovies(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getMovies()
	}, [currentPage])

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	if (loading) return <div className='loader'></div>
	if (error) return <div>{error}</div>

	return (
		<>
			<section className='m-10 flex flex-wrap justify-center gap-4'>
				{movies.map(movie => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
			<div className='m-4 flex justify-center gap-4'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}>
					Anterior
				</button>
				<span>{currentPage}</span>
				<button onClick={() => handlePageChange(currentPage + 1)}>
					Siguiente
				</button>
			</div>
		</>
	)
}
