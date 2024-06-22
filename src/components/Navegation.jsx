import { useState } from 'react'
import NavCategories from '@components/NavCategories'
import NavFav from '@components/NavFav'
import { HeartIcon, Bars3Icon } from '@heroicons/react/24/solid'

export default function Layout() {
	const [navCategories, setNavCategories] = useState(false)
	const [navFav, setNavFav] = useState(false)

	const toggleNavCategories = () => setNavCategories(!navCategories)
	const toggleNavFav = () => setNavFav(!navFav)

	return (
		<>
			<header
				className={`sticky top-0 z-40 flex w-full items-center justify-between bg-black/40 p-5 text-white backdrop-blur-md transition-all duration-300`}>
				<button className='cursor-pointer' onClick={toggleNavCategories}>
					<Bars3Icon className='size-7 text-white' />
				</button>
				<span>
					<strong>CINESPECTRA</strong>
				</span>
				<button className='cursor-pointer' onClick={toggleNavFav}>
					<HeartIcon className='size-7 text-red-500' />
				</button>
			</header>
			{navCategories && <NavCategories closeNav={toggleNavCategories} />}
			{navFav && <NavFav closeNav={toggleNavFav} />}
		</>
	)
}
