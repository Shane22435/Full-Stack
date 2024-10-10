import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function PostData(data) {
    fetch("http://127.0.0.1:8000/api/grade/", {
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

function NewGrade() {
    const [module, setModule] = useState("");
    const [exam_mark, setExamMark] = useState("");
    const [ca_mark, setCaMark] = useState("");
    const [cohort, setCohort] = useState("");
    const [student, setStudent] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [cohortList, setCohortList] = useState([]);
    const [moduleList, setModuleList] = useState([]);

    const displayModuleList = () => {
        return moduleList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/module/" + elem.code + "/"}
                key={"http://127.0.0.1:8000/api/module/" + elem.code + "/"}
            >
                {elem.full_name}
            </option>
        ));
    };

    const displayCohortList = () => {
        return cohortList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/cohort/" + elem.id + "/"}
                key={"http://127.0.0.1:8000/api/cohort/" + elem.id + "/"}
            >
                {elem.name}
            </option>
        ));
    };

    const displayStudentList = () => {
        return studentList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/student/" + elem.student_id + "/"}
                key={"http://127.0.0.1:8000/api/student/" + elem.student_id + "/"}
            >
                {elem.first_name} {elem.last_name}
            </option>
        ));
    };

    const handleSubmit = event => {
        event.preventDefault();
        PostData({
            module: module,
            ca_mark: ca_mark,
            exam_mark: exam_mark,
            cohort: cohort,
            student: student
        });
    };

    const handleSelectChangeStudent = e => {
        setStudent(e.target.value);
    };

    const handleSelectChangeCohort = e => {
        setCohort(e.target.value);
    };

    const handleSelectChangeModule = e => {
        setModule(e.target.value);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/`)
            .then(response => response.json())
            .then(data => {
                setModuleList(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/`)
            .then(response => response.json())
            .then(data => {
                setStudentList(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortList(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Set Student Grade</h1>
            <div style={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Module:</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleSelectChangeModule}
                            value={module}
                            required
                        >
                            {displayModuleList()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CA:</Form.Label>
                        <Form.Control
                            type="number"
                            value={ca_mark}
                            onChange={e => setCaMark(e.target.value)}
                            placeholder="0-100"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Exam:</Form.Label>
                        <Form.Control
                            type="number"
                            value={exam_mark}
                            onChange={e => setExamMark(e.target.value)}
                            placeholder="0-100"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cohort:</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleSelectChangeCohort}
                            value={cohort}
                            required
                        >
                            {displayCohortList()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Student:</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleSelectChangeStudent}
                            value={student}
                            required
                        >
                            {displayStudentList()}
                        </Form.Control>
                    </Form.Group>
                    <button type="submit" style={styles.button}>
                        Add Grade
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

export default NewGrade;
