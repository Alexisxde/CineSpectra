import { Link } from 'react-router-dom'
import { URL_IMG } from '@CONST/const'

export default function MovieCard({ movie }) {
	return (
		<div
			key={movie.id}
			className='h-64 w-44 transition hover:scale-105 hover:rounded hover:border hover:border-blue-600 lg:h-80 lg:w-56'>
			<Link
				to={`/movie/${movie.id}`}
				className='size-full'
				alt={movie.title}
				style={{ viewTransitionName: `movie-${movie.id}` }}>
				<img
					className='size-full rounded object-cover'
					src={URL_IMG + movie.poster_path}
					alt={`${movie.title} Poster`}
				/>
			</Link>
		</div>
	)
}
