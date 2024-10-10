import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function PostData(data) {
    fetch("http://127.0.0.1:8000/api/degree/", {
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

function NewDegree() {
    const [name, setName] = useState("");
    const [shortcode, setShortcode] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        PostData({
            full_name: name,
            shortcode: shortcode
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>New Degree</h1>
            <div style={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label style={styles.label}>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Computing for Science"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={styles.label}>Shortcode:</Form.Label>
                        <Form.Control
                            type="text"
                            value={shortcode}
                            onChange={e => setShortcode(e.target.value)}
                            placeholder="COMSCI"
                            required
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

export default NewDegree;
