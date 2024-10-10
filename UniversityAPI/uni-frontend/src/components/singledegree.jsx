import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleDegree() {
    const [degree, setDegree] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${params.id}`)
            .then(response => response.json())
            .then(data => {
                setDegree(data);
            })
            .catch(err => console.log(err));
    }, [params.id]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
            })
            .catch(err => console.log(err));
    }, []);

    const displayCohorts = () => {
        const filteredCohorts = cohorts.filter(elem => elem.id.includes(params.id));
        return filteredCohorts.map(elem => (
            <div key={elem.id} style={styles.cohort}>
                <p><strong>Name:</strong> {elem.name}</p>
                <p><strong>Year:</strong> {elem.year}</p>
                <hr style={styles.hr} />
            </div>
        ));
    };

    return (
        <div style={styles.container}>
            <div style={styles.degreeInfo}>
                <h3 style={styles.heading}>[{degree.shortcode}] {degree.full_name}</h3>
            </div>
            <div style={styles.cohortsContainer}>
                {displayCohorts()}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px"
    },
    degreeInfo: {
        marginBottom: "20px"
    },
    heading: {
        color: "#007bff"
    },
    cohortsContainer: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px"
    },
    cohort: {
        marginBottom: "10px"
    },
    hr: {
        borderTop: "1px solid #ccc",
        width: "100%"
    }
};

export default SingleDegree;
