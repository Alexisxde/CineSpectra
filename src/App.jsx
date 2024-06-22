import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import Movie from '@pages/Movie'
import NotFound from '@pages/NotFound'
import Navegation from '@components/Navegation'

export default function App() {
	return (
		<main className='mx-auto my-0 max-w-[1366px]'>
			<Navegation />
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<Movie />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</main>
	)
}
