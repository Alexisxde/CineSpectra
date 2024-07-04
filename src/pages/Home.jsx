import { getAllCategories, getAllMoviesCategories } from '@api/movies/api'
import MovieCard from '@components/MovieCard'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const scrollRefs = useRef([])
	const [scrollPositions, setScrollPositions] = useState({})

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await getAllCategories()
				const categoriesWithMovies = await Promise.all(
					data.genres.map(async ({ id, name }) => {
						const movies = await getAllMoviesCategories(id, 2)
						return {
							id,
							name,
							movies
						}
					})
				)
				setCategories(categoriesWithMovies)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		getCategories()
	}, [])

	useEffect(() => {
		const handleScroll = index => {
			const container = scrollRefs.current[index]
			if (container) {
				const isAtStart = container.scrollLeft === 0
				const isAtEnd =
					container.scrollLeft >= container.scrollWidth - container.clientWidth

				setScrollPositions(prev => ({
					...prev,
					[index]: {
						isAtStart,
						isAtEnd
					}
				}))

				sessionStorage.setItem(
					`scrollPosition_${index}`,
					JSON.stringify(container.scrollLeft)
				)
			}
		}

		categories.forEach((_, index) => {
			const container = scrollRefs.current[index]
			if (container) {
				container.addEventListener('scroll', () => handleScroll(index))
				const savedPosition = JSON.parse(
					sessionStorage.getItem(`scrollPosition_${index}`)
				)
				if (savedPosition !== null) {
					container.scrollLeft = savedPosition
				}
				handleScroll(index)
			}
		})

		return () => {
			categories.forEach((_, index) => {
				const s = scrollRefs
				const container = s.current[index]
				if (container) {
					container.removeEventListener('scroll', () => handleScroll(index))
				}
			})
		}
	}, [categories])

	const scroll = (index, direction) => {
		if (scrollRefs.current[index]) {
			const container = scrollRefs.current[index]
			const scrollAmount = direction === 'left' ? -350 : 350
			const newPosition = container.scrollLeft + scrollAmount

			container.scrollTo({
				left: newPosition,
				behavior: 'smooth'
			})
		}
	}

	if (error) return <div>{error}</div>
	if (loading) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<div className='animate-loader'></div>
			</div>
		)
	}

	return (
		<>
			{categories?.map(({ id, name, movies }, index) => (
				<section
					key={id}
					className='animate-scroll-section p-4 md:px-12 md:py-4'>
					<h2 className='animate-content text-3xl font-bold md:text-2xl'>
						{name}
					</h2>
					<div className='animate-content animate-delay-90ms flex items-center'>
						{!scrollPositions[index]?.isAtStart && (
							<button
								onClick={() => scroll(index, 'left')}
								className='absolute left-3 z-10 hidden rounded-full bg-gray-900 p-2 lg:block'>
								&lt;
							</button>
						)}
						<div
							ref={el => (scrollRefs.current[index] = el)}
							className='flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-5 scrollbar-hide'>
							{movies?.map(
								movie =>
									movie.poster_path && (
										<MovieCard key={movie.id} movie={movie} />
									)
							)}
							<div className='flex items-center justify-center text-lg font-medium'>
								<Link
									to={`/categories/${id}`}
									className='mx-2 w-32 rounded-md bg-gray-900 px-6 py-2 text-center'>
									Ver más
								</Link>
							</div>
						</div>
						{!scrollPositions[index]?.isAtEnd && (
							<button
								onClick={() => scroll(index, 'right')}
								className='absolute right-3 z-10 hidden rounded-full bg-gray-900 p-2 lg:block'>
								&gt;
							</button>
						)}
					</div>
				</section>
			))}
		</>
	)
}
