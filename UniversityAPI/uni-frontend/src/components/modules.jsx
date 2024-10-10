import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Modules() {
    const [modules, setModules] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/module/")
            .then(response => response.json())
            .then(data => {
                setModules(data.map(e => e));
            })
            .catch(err => console.log(err));
    }, []);

    const filteredModules = modules.filter(
        elem =>
            elem.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            elem.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const showModules = () => {
        return filteredModules.map(elem => (
            <div key={elem.code} style={styles.moduleContainer}>
                <Link to={elem.code} style={styles.link}>
                    <p style={styles.text}>Code: {elem.code}</p>
                </Link>
                <p style={styles.text}>Name: "{elem.full_name}"</p>
                <p style={styles.text}>CA Split: [{elem.ca_split}]</p>
                <hr style={styles.hr} />
            </div>
        ));
    };

    return (
        <div>
            <h1 style={styles.heading}>Modules</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by code or name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            <button style={styles.createButton}>
                <Link to="/modules/newmodule" style={styles.createLink}>
                    Create Module
                </Link>
            </button>
            {showModules()}
        </div>
    );
}


const styles = {
    heading: {
        textAlign: "center",
        color: "blue",
        marginBottom: "20px"
    },
    searchContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px"
    },
    searchInput: {
        padding: "8px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "250px"
    },
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
    },
    moduleContainer: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    },
    text: {
        margin: "5px 0"
    },
    hr: {
        border: "none",
        borderTop: "1px solid #ccc",
        margin: "10px 0"
    }
};


export default Modules;
