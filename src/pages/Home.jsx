import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard'

export default function MoviesList() {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const initialPage = parseInt(searchParams.get('page')) || 1
	const [currentPage, setCurrentPage] = useState(initialPage)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await getAllMovies(currentPage)
				setMovies(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setTimeout(() => {
					setLoading(false)
				}, 3000)
			}
		}
		getMovies()
	}, [currentPage])

	const handlePageChange = page => {
		setLoading(true)
		setCurrentPage(page)
		navigate(`?page=${page}`)
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
			<div className='m-4 flex justify-center gap-4 pb-7'>
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
