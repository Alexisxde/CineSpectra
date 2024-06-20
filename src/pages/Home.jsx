import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard'

export default function MoviesList() {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const initialPage = parseInt(searchParams.get('page')) || 1
	const [currentPage, setCurrentPage] = useState(initialPage)

	const getMovies = async page => {
		try {
			const data = await getAllMovies(page)
			setMovies(data)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handlePageChange = page => {
		setLoading(true)
		setCurrentPage(page)
		navigate(`?page=${page}`)
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	useEffect(() => {
		getMovies(currentPage)
	}, [currentPage])

	if (loading) return <div className='loader'></div>
	if (error) return <div>{error}</div>

	return (
		<main className='pt-10'>
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
		</main>
	)
}
