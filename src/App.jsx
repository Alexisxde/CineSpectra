import Categories from '@pages/Categories'
import Home from '@pages/Home/Home'
import Movie from '@pages/Movie/Movie'
import NotFound from '@pages/NotFound'
import Search from '@pages/Search'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export default function App() {
	return (
		<Router>
			<main className='main'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<Movie />} />
					<Route path='/categories/:id' element={<Categories />} />
					<Route path='/search/:keyword' element={<Search />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
		</Router>
	)
}
