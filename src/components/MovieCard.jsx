import { URL_IMG } from '@CONST/const'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'

export default function MovieCard({ movie, className = '' }) {
	const { id, title, poster_path } = movie
	const navigate = useNavigate()
	return (
		<Link
			className={`h-64 w-44 flex-none snap-start lg:h-80 lg:w-56 ${className}`}
			onClick={ev => {
				ev.preventDefault()
				document.startViewTransition(() => {
					flushSync(() => {
						navigate(`/movie/${id}`)
					})
				})
			}}>
			<div key={id} className='size-full md:transition md:hover:scale-105'>
				<img
					className='size-full select-none rounded object-cover'
					src={URL_IMG + poster_path}
					alt={`${title} Poster`}
					loading='lazy'
					// style={{ viewTransitionName: `movie-${id}` }}
				/>
			</div>
		</Link>
	)
}
