import { Link } from 'react-router-dom'
import { URL_IMG } from '@CONST/const'

export default function MovieCard({ movie }) {
	const { id, title, poster_path } = movie
	return (
		<Link
			to={`/movie/${id}`}
			className='animate-img h-64 w-44 lg:h-80 lg:w-56'
			alt={title}
			style={{ viewTransitionName: `movie-${id}` }}>
			<div
				key={id}
				className='size-full transition hover:scale-105 hover:rounded hover:border hover:border-blue-600'>
				<img
					className='size-full rounded object-cover'
					src={URL_IMG + poster_path}
					alt={`${title} Poster`}
				/>
			</div>
		</Link>
	)
}
