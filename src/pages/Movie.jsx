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

	return (
		<>
			<div className='w-full'>
				<img src={URL_IMG + movie.backdrop_path} alt='' />
			</div>
			{/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
		</>
	)
}
