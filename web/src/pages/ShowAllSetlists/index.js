import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'

export default function ShowAllSetlists({ match }) {
	const [setlists, setSetlists] = useState([])

	async function getSetlists() {
		const { data } = await api.getSetlists()

		setSetlists(data)
	}

	useEffect(() => {
		getSetlists()
	}, [])

	function handleDelete(setlist) {
		const confirmation = window.confirm(`Delete the setlist ${setlist.name}?`)

		if (confirmation) {
			api.deleteSetlist(setlist._id)
		}

		getSetlists()
	}

	return (
		<div>
			<NavBar title="SETLISTS" leftItem="logo" />
			<div>
				<ul>
					{setlists.map(setlist => (
						<li key={setlist.name}>
							<Link to={`${match.path}/${setlist._id}`}>{setlist.name}</Link>
							<Link to={`${match.path}/edit/${setlist._id}`}>edit</Link>
							<i className="deleteIcon" onClick={() => handleDelete(setlist)}>delete</i>
						</li>
					))}
				</ul>
			</div>
			<Link to="/new_setlist">NEW SETLIST</Link>
		</div>
	);
}
