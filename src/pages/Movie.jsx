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
				setTimeout(() => {
					setLoading(false)
				}, 3000)
			}
		}
		getMovie()
	}, [id])

	if (loading) return <div className='loader'></div>
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
		<main className='md:pt-10'>
			<div className='relative -mt-20 w-full md:m-20'>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black md:hidden'></div>
				<img
					className='w-full object-contain md:hidden'
					src={URL_IMG + backdrop_path}
					alt=''
				/>
			</div>
			<div className='flex w-full flex-col items-center justify-center'>
				<img
					className='relative -top-9 h-auto w-44'
					src={URL_IMG + poster_path}
					alt=''
				/>
				<span className='-mt-5 mb-2 rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300'>
					{year}
				</span>
				<div className='flex w-full flex-col items-center justify-center text-pretty px-4'>
					<h2 className='text-center text-3xl font-semibold uppercase'>
						{title}
					</h2>
					<span className='rounded bg-yellow-900 px-2.5 py-0.5 text-xs font-medium text-yellow-300'>
						{vote_average.toFixed(1)}
					</span>
					<div className='mt-2 inline-flex w-full justify-center gap-2'>
						{genres.map(({ id, name }) => (
							<span
								className='rounded bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300'
								key={id}>
								{name}
							</span>
						))}
					</div>
					<p className='text-pretty p-3 text-center text-sm text-gray-300/50'>
						{overview}
					</p>
				</div>
			</div>
			{/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
		</main>
	)
}
