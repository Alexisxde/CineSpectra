import { useState } from 'react'
import HamburgerMenuOpen from '@icons/HamburgerMenuOpen'
import NavCategories from '@components/NavCategories'
import NavFav from '@components/NavFav'

export default function Layout() {
	const [navCategories, setNavCategories] = useState(false)
	const [navFav, setNavFav] = useState(false)

	const toggleNavCategories = () => setNavCategories(!navCategories)
	const toggleNavFav = () => setNavFav(!navFav)

	return (
		<>
			<header className='z-99 sticky flex w-full items-center justify-between bg-[#131313] p-5 text-white'>
				<button className='cursor-pointer' onClick={toggleNavCategories}>
					<HamburgerMenuOpen className='size-6' />
				</button>
				<span>
					<strong>CINESPECTRA</strong>
				</span>
				<button className='cursor-pointer' onClick={toggleNavFav}>
					❤
				</button>
			</header>
			{navCategories && <NavCategories closeNav={toggleNavCategories} />}
			{navFav && <NavFav closeNav={toggleNavFav} />}
		</>
	)
}
