import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className='-m-24 flex h-[100vh] flex-col items-center justify-center'>
			<h1 className='text-3xl'>Error 404</h1>
			<p className='animate-type pr-1.5 text-lg'>error permission denied</p>
			<span>
				go to{' '}
				<Link className='underline' to='/'>
					home
				</Link>
			</span>
		</div>
	)
}
