import { URL_IMG } from '@CONST/const'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ movie }) {
	const { id, title, poster_path } = movie
	const navigate = useNavigate()

	return (
		<Link
			className='card'
			onClick={ev => {
				ev.preventDefault()
				document.startViewTransition(() => {
					flushSync(() => {
						navigate(`/movie/${id}`)
					})
				})
			}}>
			<div key={id}>
				<img
					src={URL_IMG + poster_path}
					alt={`${title} Poster`}
					loading='lazy'
				/>
			</div>
		</Link>
	)
}
