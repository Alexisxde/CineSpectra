export default function Footer() {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className='m-4 rounded-lg bg-gray-900/40 shadow'>
			<div className='mx-auto w-full max-w-screen-xl p-4 md:py-8'>
				<div className='flex items-center justify-between'>
					<a
						href='/'
						className='flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse'>
						<span className='self-center whitespace-nowrap text-2xl font-semibold text-white'>
							CineSpectra
						</span>
					</a>
					<div className='flex flex-wrap items-center text-sm font-medium text-gray-400 sm:mb-0'>
						<a href='#' className='me-4 hover:underline md:me-6'>
							Github
						</a>
						<a href='#' className='hover:underline'>
							Contact
						</a>
					</div>
				</div>
				<hr className='my-6 border-gray-700 sm:mx-auto lg:my-8' />
				<span className='block text-sm text-gray-400 sm:text-center'>
					© {year}{' '}
					<a href='/' className='hover:underline'>
						CineSpectra
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	)
}
