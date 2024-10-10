import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';


function postDataToApi(data) {
    fetch("http://127.0.0.1:8000/api/module/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create module");
        }
        return response.json();
    })
    .then(() => {
        alert("Module created successfully!");
    })
    .catch((err) => {
        console.error("Error creating module:", err);
    });
}

function NewModule() {
    const [codeValue, setCodeValue] = useState("");
    const [fullNameValue, setFullNameValue] = useState("");
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [caSplitValue, setCaSplitValue] = useState(0);
    const [cohortsList, setCohortsList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortsList(data);
            })
            .catch(err => {
                console.error("Error fetching cohorts:", err);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        postDataToApi({
            "code": codeValue,
            "full_name": fullNameValue,
            "delivered_to": selectedCohorts,
            "ca_split": parseInt(caSplitValue),
        });
    };

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedCohorts(selectedOptions);
    };

    const renderCohortOptions = () => {
        return cohortsList.map(cohort => (
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
            <h1 style={styles.heading}>Create a New Module</h1>
            <div style={styles.formContainer}>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                        <Form.Label style={styles.label}>Code:</Form.Label>
                        <Form.Control
                            type="text"
                            value={codeValue}
                            onChange={(e) => setCodeValue(e.target.value)}
                            placeholder="Enter module code"
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullNameValue}
                            onChange={(e) => setFullNameValue(e.target.value)}
                            placeholder="Enter module name"
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Cohorts:</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            onChange={handleSelectChange}
                            value={selectedCohorts}
                            style={styles.input}
                        >
                            {renderCohortOptions()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>CA Split:</Form.Label>
                        <Form.Control
                            type="number"
                            value={caSplitValue}
                            onChange={(e) => setCaSplitValue(e.target.value)}
                            placeholder="Enter CA split percentage"
                            style={styles.input}
                        />
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
        padding: "20px",
    
    },
    label: {
        fontWeight: "bold"
    },
    input: {
        marginBottom: "10px"
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

export default NewModule;
