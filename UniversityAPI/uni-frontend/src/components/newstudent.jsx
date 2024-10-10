import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';


function postDataToApi(data) {
    fetch("http://127.0.0.1:8000/api/student/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create student");
        }
        return response.json();
    })
    .then(() => {
        alert("Student created successfully!");
    })
    .catch((err) => {
        console.error("Error creating student:", err);
    });
}

function NewStudent() {
    const [student_id, setStudentId] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [cohort, setCohort] = useState("");

    const [cohortList, setCohortList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortList(data);
            })
            .catch(err => {
                console.error("Error fetching cohorts:", err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        postDataToApi({
            "student_id": student_id,
            "first_name": first_name,
            "last_name": last_name,
            "cohort": cohort,
        });
    };

    const handleSelectChange = (e) => {
        setCohort(e.target.value);
    };

    const renderCohortOptions = () => {
        return cohortList.map(cohort => (
            <option
                value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
                key={`cohort_${cohort.id}`}
            >
                {cohort.name}
            </option>
        ));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create Student</h1>
            <div style={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label style={styles.label}>ID:</Form.Label>
                        <Form.Control
                            type="text"
                            value={student_id}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="22462732"
                            required
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Shane"
                            required
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Last Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Whelan"
                            required
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Cohort:</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleSelectChange}
                            value={cohort}
                            required
                            style={styles.input}
                        >
                            {renderCohortOptions()}
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
        padding: "25px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "25px",
        color: "light blue"
    },
    formContainer: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        color: "green"
    },
    label: {
        fontWeight: "bold"
    },
    input: {
        marginBottom: "10px"
    },
    button: {
        backgroundColor: "light blue",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    }
};

export default NewStudent;
