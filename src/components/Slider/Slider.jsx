import MovieCard from '@components/MovieCard/MovieCard'
import './Slider.css'

export default function Slider({ movies, title }) {
	return (
		<div className='slider'>
			{title && <h2>{title}</h2>}
			<div className='slider-movies'>
				{movies?.map(
					movie =>
						movie.poster_path && <MovieCard key={movie.id} movie={movie} />
				)}
			</div>
		</div>
	)
}
