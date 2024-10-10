import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleStudent() {
    const [student, setStudent] = useState("");
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${params.student_id}`)
            .then(response => response.json())
            .then(data => {
                setStudent(data);
            })
            .catch(err => console.log(err));
    }, [params.student_id]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/student/")
            .then(response => response.json())
            .then(data => {
                setStudents(data.map(elem => elem));
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${params.student_id}`)
            .then(response => response.json())
            .then(data => {
                setGrades(data.map(elem => elem));
            })
            .catch(err => console.log(err));
    }, [params.student_id]);

    const DisplayStudents = () => {
        const filteredStudents = students.filter(elem =>
            elem.student_id.includes(params.student_id)
        );
        return filteredStudents.map(elem => (
            <div key={elem.student_id} style={styles.studentContainer}>
                Name: {elem.first_name} {elem.last_name}
            </div>
        ));
    };

    const ShowGrades = () => {
        const filteredGrades = grades.filter(elem =>
            elem.student.includes(params.student_id)
        );
        return filteredGrades.map(elem => (
            <div key={elem.id} style={styles.gradeContainer}>
                Module: {getModuleCode(elem.module)}
                <br />
                CA: [{elem.ca_mark}]
                <br />
                Exam: [{elem.exam_mark}]
                <br />
                Cohort: {getCohortCode(elem.cohort)}
                <br />
                Total: [{elem.total_grade}]
                <hr style={styles.hr} />
            </div>
        ));
    };

    const getModuleCode = url => {
        
        return url.split("/").slice(-2, -1)[0];
    };

    const getCohortCode = url => {
       
        return url.split("/").slice(-2, -1)[0];
    };

    return (
        <div style={styles.container}>
            <div>
                <div style={styles.header}>
                    <h3>[{student.student_id}]</h3>
                    <button style={styles.button}>
                        <Link to="/students/newstudent" style={styles.link}>
                            Create Student
                        </Link>
                    </button>
                    <button style={styles.button}>
                        <Link to="/grade" style={styles.link}>
                            Set Grade
                        </Link>
                    </button>
                </div>
                <div style={styles.content}>
                    {DisplayStudents()}
                    <h2 style={styles.heading}>Grades:</h2>
                    {ShowGrades()}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "10px"
    },
    link: {
        textDecoration: "none",
        color: "#fff"
    },
    content: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px"
    },
    heading: {
        color: "#007bff",
        marginBottom: "10px"
    },
    studentContainer: {
        marginBottom: "10px"
    },
    gradeContainer: {
        marginBottom: "20px"
    },
    hr: {
        border: "none",
        borderTop: "1px solid #ccc",
        margin: "10px 0"
    }
};

export default SingleStudent;
