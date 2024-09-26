import { searchMovies } from '@api/movies/api'
import MovieCard from '@components/MovieCard/MovieCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Search.css'

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

	if (error) return <div>{error}</div>
	if (loading) {
		return (
			<div className='animate-loader-container'>
				<div className='animate-loader'></div>
			</div>
		)
	}

	return (
		<section className='animate-content section-search'>
			{search.length === 0 && <h1>No se encontraron resultados</h1>}
			{search?.map(
				movie =>
					movie.poster_path && (
						<MovieCard key={movie.id} movie={movie} className='animate-img' />
					)
			)}
		</section>
	)
}
