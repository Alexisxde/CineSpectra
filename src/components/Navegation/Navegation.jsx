import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
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
				<div className='navegation__logo'>
					<a className='' href='/'>
						CINESPECTRA
					</a>
				</div>
				<form
					className='navegation__search'
					autoComplete='off'
					onSubmit={submitHandler}>
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
			</header>
		</>
	)
}
