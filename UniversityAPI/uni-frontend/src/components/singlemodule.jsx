import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleModule() {
    const [module, setModule] = useState("");
    const [modules, setModules] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${params.code}`)
            .then(response => response.json())
            .then(data => {
                setModule(data);
            })
            .catch(err => console.log(err));
    }, [params.code]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/module/")
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(err => console.log(err));
    }, []);

    const displayModules = () => {
        const filteredModules = modules.filter(elem => elem.code.includes(params.code));
        return filteredModules.map(elem => (
            <div key={elem.code} style={styles.module}>
                <p><strong>Name:</strong> {elem.full_name}</p>
                <p><strong>CA Split:</strong> [{elem.ca_split}]</p>
            </div>
        ));
    };

    return (
        <div style={styles.container}>
            <div style={styles.moduleInfo}>
                <h3 style={styles.heading}>[{module.code}]</h3>
            </div>
            <div style={styles.modulesContainer}>
                {displayModules()}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px"
    },
    moduleInfo: {
        marginBottom: "20px"
    },
    heading: {
        color: "#007bff"
    },
    modulesContainer: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px"
    },
    module: {
        marginBottom: "10px"
    }
};

export default SingleModule;
    