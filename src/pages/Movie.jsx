import { URL_IMG } from '@CONST/const'
import { getMovieTrailer, getOneMovie } from '@api/movies/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
	const { id } = useParams()
	const [movie, setMovie] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getMovie = async () => {
			try {
				const data = await getOneMovie(id)
				const trailer = await getMovieTrailer(id)
				setMovie({ movie: data, trailer })
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getMovie()
	}, [id])

	if (loading) {
		return
		// return (
		// 	<div className='flex justify-center pb-7'>
		// 		<div className='loader'></div>
		// 	</div>
		// )
	}
	if (error) return <div>{error}</div>

	const {
		backdrop_path,
		poster_path,
		title,
		overview,
		genres,
		release_date,
		vote_average
	} = movie.movie

	const release = new Date(release_date)
	const year = release.getFullYear()

	return (
		<section>
			<div className='animate-content relative w-full'>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black md:hidden'></div>
				<img
					className='w-full object-contain md:hidden'
					src={URL_IMG + backdrop_path}
					alt=''
				/>
			</div>
			<div className='animate-content flex w-full flex-col items-center justify-center gap-2 sm:-mt-12 md:flex-row md:px-10 md:pb-8 md:pt-6'>
				<img
					className='relative -top-9 h-auto w-44 sm:w-72 md:left-0 md:top-0 md:my-10 md:w-80'
					src={URL_IMG + poster_path}
					alt={`${title} Poster`}
					loading='lazy'
					// style={{ viewTransitionName: `movie-${id}` }}
				/>
				<div className='animate-content sm:animate-delay-90ms md:animate-delay-110ms flex w-full flex-col items-center justify-center gap-1 text-pretty px-4 md:max-w-[680px] md:p-0'>
					<span className='-mt-5 mb-2 rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300 sm:text-lg'>
						{year}
					</span>
					<h2 className='text-center text-2xl font-semibold uppercase sm:text-5xl md:text-4xl'>
						{title}
					</h2>
					<span
						className={`rounded px-2.5 py-0.5 text-xs font-medium sm:text-lg ${vote_average > 4 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>
						{vote_average.toFixed(1) == 0.0
							? 'No estrenado'
							: vote_average.toFixed(1)}
					</span>
					<div className='mt-2 inline-flex w-full justify-center gap-2'>
						{genres?.map(({ id, name }) => (
							<a
								href={`/categories/${id}`}
								className='rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300 sm:text-lg'
								key={id}>
								{name}
							</a>
						))}
					</div>
					<p className='animate-content animate-delay-110ms text-pretty p-3 text-center text-sm text-gray-300/50 md:text-base'>
						{overview}
					</p>
				</div>
			</div>
			{movie?.trailer && (
				<div className='animate-video m-8 mx-auto mb-12 w-3/4 lg:mb-28 lg:w-1/2'>
					<h3 className='my-8 text-center text-lg font-semibold uppercase sm:text-4xl md:text-3xl'>
						{title} - {movie.trailer.name}
					</h3>
					<iframe
						className='aspect-video w-full'
						src={`https://www.youtube.com/embed/${movie.trailer.key}`}
						allowFullScreen></iframe>
				</div>
			)}
		</section>
	)
}
