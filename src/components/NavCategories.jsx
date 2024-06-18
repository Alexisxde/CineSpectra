import HamburgerMenuClose from '@icons/HamburgerMenuClose'

export default function NavCategories({ closeNav }) {
	return (
		<>
			<div
				onClick={closeNav}
				className='z-99 fixed inset-0 flex cursor-default select-none items-center justify-center bg-[#131313] bg-opacity-75 font-semibold text-gray-600'></div>
			<div className='z-99 fixed left-0 top-0 flex h-full w-2/3 items-center justify-center bg-[#131313] text-white sm:w-1/3 lg:w-1/4'>
				<button
					onClick={closeNav}
					className='absolute -top-1 left-0 m-5 cursor-pointer'>
					<HamburgerMenuClose className='size-6' />
				</button>
			</div>
		</>
	)
}
