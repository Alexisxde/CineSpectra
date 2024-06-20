import { useState, useEffect } from 'react'
import NavCategories from '@components/NavCategories'
import NavFav from '@components/NavFav'
import { HeartIcon, Bars3Icon } from '@heroicons/react/24/solid'

export default function Layout() {
	const [navCategories, setNavCategories] = useState(false)
	const [navFav, setNavFav] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	const toggleNavCategories = () => setNavCategories(!navCategories)
	const toggleNavFav = () => setNavFav(!navFav)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true)
			} else {
				setScrolled(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<header
				className={`sticky top-0 z-40 flex w-full items-center justify-between p-5 text-white transition-all duration-300 ${scrolled ? 'bg-[#131313]/40 backdrop-blur-md' : 'bg-[#131313]'}`}>
				<button className='cursor-pointer' onClick={toggleNavCategories}>
					<Bars3Icon className='size-6 text-white' />
				</button>
				<span>
					<strong>CINESPECTRA</strong>
				</span>
				<button className='cursor-pointer' onClick={toggleNavFav}>
					<HeartIcon className='size-6 text-red-500' />
				</button>
			</header>
			{navCategories && <NavCategories closeNav={toggleNavCategories} />}
			{navFav && <NavFav closeNav={toggleNavFav} />}
		</>
	)
}
