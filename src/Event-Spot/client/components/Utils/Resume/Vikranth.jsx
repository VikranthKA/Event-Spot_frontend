import { CardActionArea } from '@mui/material'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

function Vikranth() {
    return (
        <CardActionArea style={{ backgroundColor: "whitesmoke", width: "94%", height: "1500px", margin: "30px 2% 30px 3%" }} >
            <Card style={{
                borderRadius: "20px 20px 0 0",
                width: "96%",
                height: "150px",
                margin: "-350px 2% 0 2%",
                backgroundImage: "url('https://camo.githubusercontent.com/3e95421342fa70af5fd6d50e59591da8c865e5a76432ab429286ce4d1d49ff8c/68747470733a2f2f63617073756c652d72656e6465722e76657263656c2e6170702f6170693f747970653d776176696e6726636f6c6f723d6772616469656e74266865696768743d3130302673656374696f6e3d686561646572')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>
            </Card>

            <Card style={{ backgroundColor: "white", borderRadius: "10px", width: "90%", height: "150px", margin: "-90px 5% 0 5%", boxShadow: "0 5px 5px 0 black", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div>
                    <Col>
                        VIKRANTH K A<br />
                        "Passionate programmer dedicated to continuous learning and innovation."
                    </Col>
                </div>

                <div>
                    <Col style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <span><img src="phone-icon.png" />7899193268</span>
                        <span><img src="location-icon.png" />Banglore, Kr puram</span>
                        <span><img src="email-icon.png" />vikranthka@gmail.com</span>
                        <a href='https://github.com/VikranthKA' target='_blank'><img src="github-icon.png" />GitHub</a>
                        <a href='https://linkedin.com/in/vikranth-ka-01b4702b3' target='_blank'><img src="linkedin-icon.png" />LinkedIn</a>
                    </Col>
                </div>
            </Card>

            <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "90%", height: "100px", margin: "30px 5% 0 5%", boxShadow: "0 5px 5px 0 black" }}>
                Hands-on experience in building fully fledged, responsive, token-based web applications. I worked with React
                hooks for efficient state management with reusable components. Redux for better global state management, along
                with the useReducer and Context APIs. Handle user authentication, authorization, and password encryption.


            </Card>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Col>


                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "150px", margin: "100px 5% 0 10%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>EDUCATION</span>
                        Bachelor of Computer Application<br />
                        Amrita Vishwa Vidyapeetham,Mysuru Nov 2020-June 2023



                    </Card>

                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "700px", margin: "100px 5% 0 10%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>RELEVANT SKLL</span>
                        <div style={{margin:"10px 0 0 0 "}}>
                            Programming Language
                            <ul>
                                <li>JavaScript ES5, ES6
                                </li>
                                <li>Front End Technologies
                                </li>
                                <li>HTML5 & CSS3
                                </li>
                                <li>React, Redux,
                                </li>
                                <li>Bootstrap, React Bootstrap ,Mui Material
                                </li>
                            

                            Back End Technologies
                                 <li>Node JS</li>
                                 <li>Express JS</li>

                            Database
                            <li>MongoDB</li>
                            Relevant Skill
                            
                                <li>React-router-dom</li>
                                <li>Async/await</li>
                                <li>Express & Joi-Validator</li>
                                <li>Multer</li>
                                <li>Formik & Yup</li>
                                <li>Mongoose</li>
                                <li>ES6 Promise</li>
                                <li>Context API</li>
                                <li>Ajax</li>
                                <li>JSON</li>
                                <li>REST API</li>
                                <li>Git & GitHub</li>
                                <li>Local Storage</li>
                                <li>Multer + S3</li>
                            </ul>

                        </div>


                    </Card>
                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "150px", margin: "100px 5% 0 10%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>RELEVANT SKLL</span>


                    </Card>
                </Col>
                <Col>
                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "150px", margin: "100px 0% 0 5%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>ABCD</span>


                    </Card>
                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "150px", margin: "100px 0% 0 5%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>ABCD</span>


                    </Card>
                    <Card style={{ backgroundColor: "white", borderRadius: "10px 10px 10px 10px", width: "85%", height: "150px", margin: "100px 0% 0 5%", boxShadow: "0 5px 5px 0 black" }}>
                        <span style={{ margin: "-40px 0 0 0 " }}>ABCD</span>


                    </Card>
                </Col>


            </div>

        </CardActionArea>
    )
}

export default Vikranth
