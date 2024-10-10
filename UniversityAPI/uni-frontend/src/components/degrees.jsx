import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllDegrees() {
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/degree/")
            .then(response => response.json())
            .then(data => {
                setDegrees(data.map(e => e));
            })
            .catch(err => console.log(err));
    }, []);

    const showDegrees = () => {
        return degrees.map(elem => (
            <Link
                key={elem.shortcode}
                id={elem.shortcode}
                to={elem.shortcode}
                style={{
                    textDecoration: "none",
                    color: "blue",
                    display: "block",
                    marginBottom: "10px"
                }}>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                    <p>Code: {elem.shortcode}</p>
                </div>
            </Link>
        ));
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "blue" }}>Degrees</h1>
            <button style={styles.createButton}>
                <Link to="/degrees/newdegree" style={styles.createLink}>
                    Create new Degree
                </Link>
            </button>
            {showDegrees()}
        </div>
    );
}

const styles = {
    createButton: {
        marginBottom: "20px",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    
    createLink: {
        textDecoration: "none",
        color: "#fff"
    }
};

export default AllDegrees;
