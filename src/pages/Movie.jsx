import { useParams } from 'react-router-dom'

export default function Movie() {
	const { id } = useParams()
	return (
		<div>
			<h1>Movie</h1>
			<p>Item ID: {id}</p>
		</div>
	)
}
