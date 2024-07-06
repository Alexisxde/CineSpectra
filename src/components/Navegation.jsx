import NavCategories from '@components/NavCategories'
import NavFav from '@components/NavFav'
import Search from '@components/Search'
import { Bars3Icon, HeartIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Layout() {
	const [navCategories, setNavCategories] = useState(false)
	const [navFav, setNavFav] = useState(false)

	const toggleNavCategories = () => setNavCategories(!navCategories)
	const toggleNavFav = () => setNavFav(!navFav)

	return (
		<>
			<header
				className={`sticky top-0 z-40 flex w-full items-center justify-between bg-black/40 p-5 text-white backdrop-blur-md`}>
				<div className='flex items-center gap-4'>
					<button onClick={toggleNavCategories}>
						<Bars3Icon className='size-7 text-white' />
					</button>
					<a className='font-bold' href='/'>
						CINESPECTRA
					</a>
				</div>
				<div className='flex gap-4'>
					<Search />
					<button
						onClick={toggleNavFav}
						className='flex items-center justify-center'
						type='submit'>
						<HeartIcon className='size-7 text-red-500' />
					</button>
					{/* <button onClick={toggleNavCategories}>
						<Bars3Icon className='size-7 text-white' />
					</button> */}
				</div>
			</header>
			{navCategories && <NavCategories closeNav={toggleNavCategories} />}
			{navFav && <NavFav closeNav={toggleNavFav} />}
		</>
	)
}
