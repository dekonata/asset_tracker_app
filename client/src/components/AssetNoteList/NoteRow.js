import {useState} from 'react'


const NoteRow = ({note ,key}) => {
	const [edit, setEdit] = useState(false);

	const toggleEdit = () => {
		edit ? setEdit(false) : setEdit(true)
	}

	return (
		<div>
	        <tr
	            className="stripe-dark pointer"
	            key={key}
	            >
	                <td className="pa1 ws-normal w-50">{note?.note}</td>
	                <td className="pa1">{note?.capture_time}</td>
	                 <td 
	                    className="fw6 bold link dim center pointer tc"
	                    onClick={() => setEdit()}
	                    >Edit</td>
	        </tr>
		</div>
		)
} 

export default NoteRow