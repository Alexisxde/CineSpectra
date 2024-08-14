import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon
} from '@heroicons/react/16/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navegation.css'

export default function Navegation() {
	const [menu, setMenu] = useState(false)
	const navigate = useNavigate()

	const submitHandler = e => {
		const keyword = e.currentTarget.keyword.value.trim()
		// const keyword = e.target.value.trim()
		e.preventDefault()
		if (keyword === '') return
		else {
			navigate(`/search/${keyword}`)
		}
	}

	return (
		<>
			<header className='navegation'>
				<div>
					<div className='navegation__logo'>
						<a className='' href='/'>
							CINESPECTRA
						</a>
					</div>
					<nav className='navegation__links'>
						<a href=''>Peliculas</a>
						<a href=''>Series TV</a>
						<a href=''>Novedades populares</a>
						<a href=''>Mi lista</a>
					</nav>
					<button
						onClick={() => setMenu(!menu)}
						className='navegation__hamburguer'>
						{menu ? (
							<XMarkIcon className='icon' />
						) : (
							<Bars3Icon className='icon' />
						)}
					</button>
				</div>
				<form className='navegation__search' onSubmit={submitHandler}>
					<MagnifyingGlassIcon className='icon' />
					<input
						type='text'
						id='search'
						name='keyword'
						placeholder='Buscar'
						className=''
						required
					/>
				</form>
				{menu && (
					<nav className='navegation__nav'>
						<a href=''>Peliculas</a>
						<a href=''>Series TV</a>
						<a href=''>Novedades populares</a>
						<a href=''>Mi lista</a>
					</nav>
				)}
			</header>
		</>
	)
}
