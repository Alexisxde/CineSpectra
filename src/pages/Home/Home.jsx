import { getAllCategories, getAllMoviesCategories } from '@api/movies/api'
// import MovieCard from '@components/MovieCard/MovieCard'
import Slider from '@components/Slider/Slider'
import { useEffect, useRef, useState } from 'react'
import './Home.css'

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
			<div className='animate-loader-container'>
				<div className='animate-loader'></div>
			</div>
		)
	}

	return (
		<>
			{categories?.map(({ id, name, movies }) => (
				<section key={id} className='movies'>
					<h2 className='movies__category'>
						<a href={`/categories/${id}`}>{name}</a>
					</h2>
					<div className='animate-scroll-section movies__slider'>
						{/* {!scrollPositions[index]?.isAtStart && (
							<button onClick={() => scroll(index, 'left')}>&lt;</button>
						)} */}
						<Slider movies={movies} />

						{/* {!scrollPositions[index]?.isAtEnd && (
							<button onClick={() => scroll(index, 'right')}>&gt;</button>
						)} */}
					</div>
				</section>
			))}
		</>
	)
}
