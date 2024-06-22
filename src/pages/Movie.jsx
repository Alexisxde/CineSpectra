import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneMovie } from '@api/movies/api'
import { URL_IMG } from '@CONST/const'

export default function Movie() {
	const { id } = useParams()
	const [movie, setMovie] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getMovie = async () => {
			try {
				const data = await getOneMovie(id)
				setMovie(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getMovie()
	}, [id])

	if (loading) {
		return (
			<div className='flex justify-center pb-7'>
				<div className='loader'></div>
			</div>
		)
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
	} = movie

	const release = new Date(release_date)
	const year = release.getFullYear()

	return (
		<section>
			<div className='relative -mt-20 w-full sm:-mt-40 md:mt-0'>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black md:hidden'></div>
				<img
					className='w-full object-contain md:hidden'
					src={URL_IMG + backdrop_path}
					alt=''
				/>
			</div>
			<div className='flex w-full flex-col items-center justify-center gap-2 sm:-mt-12 md:flex-row md:px-10 md:py-8'>
				<img
					className='relative -top-9 h-auto w-44 sm:w-72 md:left-0 md:top-0 md:my-10 md:w-96'
					src={URL_IMG + poster_path}
					alt={title}
					style={{ viewTransitionName: `movie-${id}` }}
				/>
				<div className='flex w-full flex-col items-center justify-center gap-1 text-pretty px-4 md:max-w-[680px] md:p-0'>
					<span className='-mt-5 mb-2 rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300 sm:text-lg'>
						{year}
					</span>
					<h2 className='text-center text-2xl font-semibold uppercase sm:text-5xl md:text-4xl'>
						{title}
					</h2>
					<span
						className={`rounded px-2.5 py-0.5 text-xs font-medium sm:text-lg ${vote_average > 4 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>
						{vote_average.toFixed(1)}
					</span>
					<div className='mt-2 inline-flex w-full justify-center gap-2'>
						{genres?.map(({ id, name }) => (
							<span
								className='rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300 sm:text-lg'
								key={id}>
								{name}
							</span>
						))}
					</div>
					<p className='text-pretty p-3 text-center text-lg text-gray-300/50 md:text-xl'>
						{overview}
					</p>
				</div>
			</div>
			{/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
		</section>
	)
}
