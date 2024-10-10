import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";



function PostData(data) {
    fetch("http://127.0.0.1:8000/api/cohort/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(() => {
            alert("Success!");
        })
        .catch(err => {
            console.log(err);
        });
}

function NewCohort() {
    const [id, setId] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [name, setName] = useState("");
    const [degreeList, setDegreeList] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        PostData({
            id: id,
            year: year,
            degree: degree,
            name: name
        });
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/`)
            .then(response => response.json())
            .then(data => {
                setDegreeList(data);
            })
            .catch(err => console.log(err));
    }, []);

    const displayDegreeList = () => {
        return degreeList.map(elem => (
            <option
                value={`http://127.0.0.1:8000/api/degree/${elem.shortcode}/`}
                key={`http://127.0.0.1:8000/api/degree/${elem.shortcode}/`}
            >
                {elem.full_name}
            </option>
        ));
    };

    const handleSelectChange = e => {
        setDegree(e.target.value);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create Cohort</h1>
            <div style={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label style={styles.label}>ID:</Form.Label>
                        <Form.Control
                            type="text"
                            value={id}
                            onChange={e => setId(e.target.value)}
                            placeholder="COMSCI"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Year:</Form.Label>
                        <Form.Control
                            type="number"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            placeholder="between 1-4"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="2nd Year Com Sci"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Degree:</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleSelectChange}
                            value={degree}
                            required
                        >
                            {displayDegreeList()}
                        </Form.Control>
                    </Form.Group>
                    <button type="submit" style={styles.button}>
                        Create
                    </button>
                </Form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#007bff"
    },
    formContainer: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px"
    },
    label: {
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    }
};

export default NewCohort;
