import { getAllCategories } from '@api/movies/api'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export default function NavCategories({ closeNav }) {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await getAllCategories()
				setCategories(data.genres)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getCategories()
	}, [])

	if (error) return <div>{error}</div>
	if (loading) return

	return (
		<>
			<div
				onClick={closeNav}
				className='fixed inset-0 z-50 cursor-default select-none bg-[#131313] bg-opacity-75 font-semibold text-gray-600'></div>
			<div className='fixed left-0 top-1 z-50 flex h-full w-2/3 flex-col items-center bg-[#131313] text-white sm:w-1/3 lg:w-1/4'>
				<div className='relative w-full'>
					<button
						onClick={closeNav}
						className='absolute -top-1 left-0 m-5 cursor-pointer'>
						<XMarkIcon className='size-7 text-white' />
					</button>
					<h2 className='p-4 text-center text-2xl font-bold'>Categorias</h2>
				</div>
				<div className='flex size-full flex-col gap-1 overflow-scroll pb-4 text-center'>
					{categories?.map(({ id, name }) => (
						<a key={id} href={`/categories/${id}`}>
							<div className='px-3 py-2 transition-colors hover:text-gray-400'>
								{name}
							</div>
						</a>
					))}
				</div>
			</div>
		</>
	)
}
