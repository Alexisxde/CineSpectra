import { useState, useEffect, useRef } from 'react'
import { getAllMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard'

export default function MoviesList() {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const pageEnd = useRef(null)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await getAllMovies(currentPage)
				setMovies(prevData =>
					currentPage === 1 ? data : [...prevData, ...data]
				)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getMovies()
	}, [currentPage])

	useEffect(() => {
		const currentEnd = pageEnd.current
		if (currentEnd) {
			const observer = new IntersectionObserver(
				entries => {
					if (entries[0].isIntersecting && !loading) {
						handlePageChange()
					}
				},
				{ threshold: 0.25 }
			)
			observer.observe(currentEnd)

			return () => {
				if (currentEnd) {
					observer.unobserve(currentEnd)
				}
			}
		}
	}, [loading])

	const handlePageChange = () => {
		setCurrentPage(prev => prev + 1)
	}

	if (error) return <div>{error}</div>

	return (
		<main className='pt-10'>
			<section className='m-10 flex flex-wrap justify-center gap-4'>
				{movies?.map(movie => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
			<div className='flex justify-center pb-7'>
				<div ref={pageEnd} className='loader'></div>
			</div>
		</main>
	)
}