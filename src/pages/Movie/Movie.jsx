import { URL_IMG, URL_IMG_LOGOS } from '@CONST/const'
import {
	getImages,
	getMovieTrailer,
	getOneMovie,
	getRecommendationsMovies
} from '@api/movies/api'
import Slider from '@components/Slider/Slider'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie.css'

export default function Movie() {
	const { id } = useParams()
	const [movie, setMovie] = useState([])
	const [recommendations, setRecommendations] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getMovie = async () => {
			try {
				const data = await getOneMovie(id)
				const trailer = await getMovieTrailer(id)
				const images = await getImages(id)
				const recom = await getRecommendationsMovies(id)
				setMovie({ movie: data, trailer, images })
				setRecommendations(recom)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getMovie()
	}, [id])

	if (loading) return
	if (error) return <div>{error}</div>

	const { backdrop_path, poster_path, title, overview, genres, release_date } =
		movie.movie

	const { logos } = movie.images

	const release = new Date(release_date)
	const year = release.getFullYear()

	return (
		<section className='one-movie'>
			<div className='one-movie__backdrop'>
				<img src={URL_IMG + backdrop_path} alt={title} loading='lazy' />
			</div>
			<div className='one-movie__logo'>
				{logos[logos.length - 1] ? (
					<img
						src={URL_IMG_LOGOS + logos[logos.length - 1]?.file_path}
						alt={`${title} Logo`}
						loading='lazy'
						className='logo'
					/>
				) : (
					<>
						<img
							src={URL_IMG_LOGOS + poster_path}
							alt={`${title} Poster`}
							loading='lazy'
							className='poster'
						/>
						<h1>{title}</h1>
					</>
				)}
				<div className='one-movie__genres'>
					<span className='year'>{year} | </span>
					{genres?.map(({ id, name }, index) => (
						<span className='genres' key={id}>
							<a href={`/categories/${id}`}>{name}</a>
							{index < genres.length - 1 && ', '}
						</span>
					))}
				</div>
				{/* <div className='one-movie__vote'>
					{vote_average.toFixed(1) == 0.0 ? (
						<span className='not-vote'>No estrenado</span>
					) : (
						<span className='vote-average'>{vote_average.toFixed(1)}</span>
					)}
				</div> */}
				<p className='one-movie__description'>{overview}</p>
			</div>
			{movie?.trailer && (
				<div className='one-movie__trailer'>
					<a
						href={`https://www.youtube.com/watch?v=${movie.trailer.key}`}
						target='_blank'>
						Ver Trailer
					</a>
				</div>
			)}
			<Slider movies={recommendations} title='También podria gustarte' />
		</section>
	)
}
