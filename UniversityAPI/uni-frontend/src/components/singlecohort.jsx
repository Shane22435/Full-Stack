import React from "react";
import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

function SingleCohort() {
	
	const [cohort, setCohort] = useState("");
	const [cohorts, setCohorts] = useState([])
	const params = useParams();

	useEffect(()=>{
		fetch(`http://127.0.0.1:8000/api/cohort/${params.id}`)
			.then(response=>response.json())
			.then(data=>{
				setCohort(data)
			})
			.catch(err=>console.log(err))
		}, [params.id]
	);

	useEffect(()=>{
		fetch("http://127.0.0.1:8000/api/student/")
			.then(response=>response.json())
			.then(data=>{
				setCohorts(data.map(elem=>elem)) 
			})
			.catch(err=>console.log(err))	
		}, []
	);

	const displayCohorts = () => {
		const filteredCohorts = cohorts.filter(elem => elem.cohort.includes(params.id));
		return filteredCohorts.map(elem=>
				<div>
                    ID: {elem.student_id}<br></br>
					Name: "{elem.first_name} {elem.last_name}"<br></br>
					Email: {elem.email}
					<p>----------</p>
				</div>
		);
	}

	return (
		<div>
			<div>
				<h3>[{cohort.id}]</h3>
			</div>
			<div>
				{displayCohorts()}
			</div>
		</div>
	)
}

export default SingleCohort;
