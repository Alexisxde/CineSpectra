import './NotFound.css'

export default function NotFound() {
	return (
		<div className='error-container'>
			<h1>Error 404</h1>
			<p className='error-message'>page not found</p>
			<span>
				go to{' '}
				<a href='/' className='home-link'>
					home
				</a>
			</span>
		</div>
	)
}
