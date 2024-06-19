import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import Movie from '@pages/Movie'
import NotFound from '@pages/NotFound'

export default function App() {
	return (
		<div className='mx-auto my-0 max-w-[1920px]'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<Movie />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	)
}
