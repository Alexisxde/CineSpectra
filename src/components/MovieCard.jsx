import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { URL_IMG } from '@CONST/const'

export default function MovieCard({ movie }) {
	const { id, title, poster_path } = movie
	const navigate = useNavigate()
	return (
		<Link
			className='animate-img h-64 w-44 lg:h-80 lg:w-56'
			alt={title}
			onClick={ev => {
				ev.preventDefault()
				document.startViewTransition(() => {
					flushSync(() => {
						navigate(`/movie/${id}`)
					})
				})
			}}>
			<div key={id} className='size-full transition hover:scale-105'>
				<img
					className='size-full rounded object-cover'
					src={URL_IMG + poster_path}
					alt={`${title} Poster`}
					style={{ viewTransitionName: `movie-${id}` }}
				/>
			</div>
		</Link>
	)
}
