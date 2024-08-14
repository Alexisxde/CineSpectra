import { searchMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard/MovieCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Search() {
	const { keyword } = useParams()
	const [search, setSearch] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getSearchMovies = async () => {
			try {
				const data = await searchMovies(keyword)
				setSearch(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getSearchMovies()
	}, [keyword])

	if (loading) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<div className='animate-loader'></div>
			</div>
		)
	}
	if (error) return <div>{error}</div>

	return (
		<>
			<section className='animate-content mx-2 mb-10 mt-5 flex flex-wrap justify-center gap-4'>
				{search.length === 0 && <h4>No se encontraron resultados</h4>}
				{search?.map(
					movie =>
						movie.poster_path && (
							<MovieCard key={movie.id} movie={movie} className='animate-img' />
						)
				)}
			</section>
		</>
	)
}
