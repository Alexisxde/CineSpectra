import Navegation from '@components/Navegation'
import MovieList from '@components/MovieList'

export default function App() {
	return (
		// <div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
		// 	<Navegation />
		// 	<h1 className='p-5 text-center text-5xl font-bold text-white'>
		// 		CineSpectra Próximamente
		// 	</h1>
		// </div>
		<MovieList />
	)
}
