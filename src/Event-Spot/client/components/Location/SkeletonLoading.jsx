import React from 'react';
import {Skeleton } from '@mui/material';
import { Card } from 'react-bootstrap';

function SkeletonLoading() {
    // Define the number of times to repeat the content
    const repeatCount = 3;

    // Create an array with the desired length
    const cardArray = Array.from({ length: repeatCount }, (_, index) => index)

    return (
        <div style={{ margin: "-20px 5% 10px 5%" }}>
            <Skeleton                   animation="pulse"
          
 style={{ height: '400px' }} />
  
            
            <Skeleton               animation="wave"
 style={{ width: "100%", height: "100px", borderRadius: "10px",marginTop:"-60px" }} />


            <div style={{  display: "flex",justifyContent: "space-around",flexWrap:"wrap" }}>
            {cardArray.map((index) => (
                <div  key={index}>
                    <Card style={{ width: '18rem', border: '1px solid #0000001c' }}>
                        <Skeleton               animation="wave"
 style={{ width: "100%", height: "200px",margin:"-30px 0 -30px 0" }} />
                        <Card.Body style={{  marginTop: '10px' }}>
                            <Skeleton               animation="wave"
 style={{  fontWeight: 'bold', marginBottom: '10px' }} />
                            <Skeleton               animation="wave"
 style={{  marginBottom: '5px' }} />
                            <Skeleton               animation="wave"
 style={{  marginBottom: '5px' }} />
                            <Skeleton               animation="wave"
 style={{  marginBottom: '5px' }} />
                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SkeletonLoading;
