import Navegation from '@components/Navegation'
import Categories from '@pages/Categories'
import Home from '@pages/Home'
import Movie from '@pages/Movie'
import NotFound from '@pages/NotFound'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import Footer from '@components/Footer'

export default function App() {
	return (
		<main className='mx-auto my-0 max-w-[1920px]'>
			<Navegation />
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<Movie />} />
					<Route path='/categories/:id' element={<Categories />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
			{/* <Footer /> */}
		</main>
	)
}
