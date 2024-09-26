import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom'
import './Navegation.css'

export default function Navegation() {
	const navigate = useNavigate()

	const submitHandler = e => {
		const keyword = e.currentTarget.keyword.value.trim()
		e.preventDefault()
		if (keyword === '') return
		navigate(`/search/${keyword}`)
		e.currentTarget.keyword.value = ''
	}

	return (
		<>
			<header className='navegation'>
				<div className='navegation__logo'>
					<a className="logo" href='/'>CINESPECTRA</a>
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
						required
					/>
				</form>
			</header>
		</>
	)
}
