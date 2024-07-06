import { getAllMoviesCategories } from '@api/movies/api'
import MovieCard from '@components/MovieCard'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Categories() {
	const { id } = useParams()
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const pageEnd = useRef(null)

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await getAllMoviesCategories(id, currentPage)
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
	}, [id, currentPage])

	useEffect(() => {
		const currentEnd = pageEnd.current
		if (currentEnd) {
			const observer = new IntersectionObserver(
				entries => {
					if (entries[0].isIntersecting && !loading) {
						handlePageChange()
					}
				},
				{ threshold: 0.25, rootMargin: '100px' }
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

	if (loading) {
		return (
			<div className='flex h-screen justify-center pb-7'>
				<div className='animate-loader'></div>
			</div>
		)
	}
	if (error) return <div>{error}</div>
	if (movies.length === 0) return <h1>No hay resultados</h1>

	return (
		<>
			<section className='mx-2 mb-10 mt-5 flex flex-wrap justify-center gap-4'>
				{movies?.map(
					movie =>
						movie.poster_path && (
							<MovieCard key={movie.id} movie={movie} className='animate-img' />
						)
				)}
			</section>
			<div className='flex justify-center pb-7'>
				<div ref={pageEnd} className='animate-loader'></div>
			</div>
		</>
	)
}
