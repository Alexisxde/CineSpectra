import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
	const URL_IMG = 'https://image.tmdb.org/t/p/w500'

	return (
		<Link to={`/movie/${movie.id}`} className='h-3/4 w-40'>
			<img
				className='w-full rounded'
				src={URL_IMG + movie.poster_path}
				alt={`${movie.title} Poster`}
			/>
		</Link>
	)
}
