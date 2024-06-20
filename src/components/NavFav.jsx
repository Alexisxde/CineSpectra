import { XMarkIcon } from '@heroicons/react/24/solid'

export default function NavFav({ closeNav }) {
	return (
		<>
			<div className='fixed inset-0 z-50 flex cursor-default select-none items-center justify-center bg-[#131313] bg-opacity-75 font-semibold text-gray-600'></div>
			<div className='fixed right-0 top-0 z-50 flex h-full w-2/3 flex-col items-center justify-center bg-[#131313] text-white sm:w-1/3 lg:w-1/4'>
				<div className='h-14'>
					<button
						onClick={closeNav}
						className='absolute -top-1 right-0 m-5 cursor-pointer'>
						<XMarkIcon className='size-6 text-white' />
					</button>
				</div>
				<div className='size-full text-white'></div>
			</div>
		</>
	)
}
