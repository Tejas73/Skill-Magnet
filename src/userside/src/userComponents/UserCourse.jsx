import { Card, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../../../store/atoms/course";
import { courseDescription, courseDetails, courseImage, coursePrice, courseTitle, isCourseLoading } from "../../../store/selectors/course";

import { Loading } from "../../../Loading.jsx"
import { BASE_URL } from "../../../config.js";

//this component is used to show and edit a selected course

function UserCourse() {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    const fetchData = async () => {
        try {
            const res = await axios(`${BASE_URL}/user/courses/${courseId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            setCourse({ course: res.data.course, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (!courseLoading) {
        return <Loading />
    }

    return <div>
        <GrayTopper></GrayTopper>
        <Grid container>
            <Grid item lg={6} md={12} sm={12}>
                <CourseCard course={setCourse}></CourseCard>
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
                <ViewCard course={setCourse}></ViewCard>
            </Grid>
        </Grid>
    </div>
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const imageLink = useRecoilValue(courseImage);

    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{title}</Typography>
                <Price />
            </div>
        </Card>
    </div>
}

function ViewCard() {
    const title = useRecoilValue(courseTitle);
    const description = useRecoilValue(courseDescription);
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
            <div style={{ padding: 20 }}>
                <Typography style={{ marginBottom: 10 }}>{title}</Typography>
                <Typography>{description}</Typography>


                <Button
                    variant="contained"
                    style={{ backgroundColor: "#6D326D" }}
                    // add logic to buy a course
                > Buy this course</Button>
            </div>
        </Card>
    </div>
}

function Price() {
    const price = useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}
export default UserCourse;