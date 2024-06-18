export default function MovieCard({ movie }) {
	const URL_IMG = 'https://image.tmdb.org/t/p/w500'

	return (
		<article className='m-4 max-w-sm overflow-hidden rounded shadow-lg'>
			<img
				className='w-full'
				src={URL_IMG + movie.poster_path}
				alt={`${movie.title} Poster`}
			/>
			<div className='px-6 py-4'>
				<div className='mb-2 text-xl font-bold'>{movie.title}</div>
				<p className='text-base text-gray-700'>{movie.overview}</p>
			</div>
			<div className='px-6 pb-2 pt-4'>
				<p className='text-sm text-gray-600'>
					<strong>Release Date:</strong> {movie.release_date}
				</p>
				<p className='text-sm text-gray-600'>
					<strong>Rating:</strong> {movie.vote_average} ({movie.vote_count}{' '}
					votes)
				</p>
			</div>
		</article>
	)
}
