import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export default function Search() {
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
		<form
			className='flex items-center justify-between rounded-md bg-white text-black'
			onSubmit={submitHandler}>
			<input
				type='text'
				id='search'
				name='keyword'
				placeholder='Search'
				className='w-20 max-w-72 bg-transparent px-2 focus:outline-none md:w-full'
				required
			/>
			<button
				className='flex items-center justify-center px-2 py-1 md:hidden'
				type='submit'>
				<MagnifyingGlassIcon className='size-5' />
			</button>
		</form>
	)
}
