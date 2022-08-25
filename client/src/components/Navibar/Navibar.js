import { useDispatch, useSelector } from 'react-redux';
import { setRoute, selectRoute } from './navibarSlice';

import logo from './albatros_logo.png'

const Navibar = ({onRouteChange}) => {
	const dispatch = useDispatch();
	const route = useSelector(selectRoute);

	const onLogout = async (e) => {
		e.preventDefault()

		dispatch(setRoute('login'))
		try {
			const url = 'http://localhost:5000/logout/'
			const options = {
				method: 'POST',
				credentials: 'include'
			}

			const result = await fetch(url, options)
			console.log("logged out", result)
		} catch(err) {
			alert('There was an error')
			console.log('Error:', err)
		}
	}

	return (
		<nav className="pa1 pa1-ns mw1 mw6-ns center bb">
			<div className="bg-black-20 pt2 pb2">
				<img src={logo} alt="LOGO" className="db center ma0"/>
			</div>
		  <div className="pb1 pl1" >
		    <p onClick={() => dispatch(setRoute('add'))} className={`link dim gray f6 f5-ns dib mr3 pointer mb0 mt1 ${route === 'add' ? 'b' : ''}`}>Add</p>
		    <p onClick={() => dispatch(setRoute('view_edit'))} className={`link dim gray f6 f5-ns dib mr3 pointer mb0 mt1 ${route === 'view_edit' ? 'b' : ''}`}>View/Edit</p>
		    <p onClick={() => dispatch(setRoute('reports'))} className={`link dim gray f6 f5-ns dib mr3 pointer mb0 mt1 ${route === 'reports' ? 'b' : ''}`}>Reports</p>
		    <p onClick={onLogout} className={'link dim black f6 f5-ns dib mr3 pointer mb0 mt1 fr'}> LOGOUT </p>
		  </div>
		</nav>
	);
}

export default Navibar