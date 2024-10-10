import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Cohorts() {
    const [cohortList, setCohortList] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then(data => {
                setCohortList(data); 
            })
            .catch(error => {
                console.error("Error fetching cohorts:", error);
            });
    }, []);

    const renderCohorts = () => {
        return cohortList.map(cohort => (
            <CohortItem key={cohort.id}>
                <Link to={`/cohorts/${cohort.id}`}>
                    <CohortCode>Code: {cohort.id}</CohortCode>
                </Link>
                <p>Name: {cohort.name}</p>
                <Divider /> {}
            </CohortItem>
        ));
    };

    return (
        <CohortsContainer>
            <Heading>Cohorts</Heading>
            <CreateButton>
                <Link to="/degrees/newcohort" style={{ textDecoration: 'none', color: '#fff' }}>
                    Create New Cohort
                </Link>
            </CreateButton>
            {renderCohorts()}
        </CohortsContainer>
    );
}

const CohortsContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
    color: #333;
    text-align: center;
`;

const CreateButton = styled.button`
    margin-bottom: 20px;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
`;

const CohortItem = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const CohortCode = styled.p`
    font-weight: bold;
    color: #007bff;
`;

const Divider = styled.hr`
    border-top: 1px solid #ccc;
`;


export default Cohorts;
