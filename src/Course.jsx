import { Card, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "./store/atoms/course";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "./store/selectors/course";
import { Loading } from "./Loading.jsx"
import { BASE_URL } from "./config.js";

//this component is used to show and edit a selected course

function Course() {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios(`${BASE_URL}/admin/courses/${courseId}`, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         })

    //         setCourse(res.data.course);
    //     }
    //     fetchData();
    // }, [])
    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/courses/${courseId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
    
            setCourse({ course: res.data.course, isLoading: false });
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    

    if (courseLoading) {
        return <Loading />
    }

    return <div>
        <GrayTopper></GrayTopper>
        <Grid container>
            <Grid item lg={6} md={12} sm={12}>
                <CourseCard course={setCourse}></CourseCard>
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
                <UpdateCard course={setCourse}></UpdateCard>
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

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
            <div style={{ padding: 20 }}>
                <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                <TextField
                    value={title}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    value={description}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    value={image}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />
                <TextField
                    value={price}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    style={{backgroundColor:"#6D326D"}}
                    onClick={async () => {
                        axios.put(`${BASE_URL}/admin/courses/` + courseDetails.course._id, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse = {
                            _id: courseDetails.course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        };
                        setCourse({ course: updatedCourse, isLoading: false });
                    }}
                > Update course</Button>
            </div>
        </Card>
    </div>
}

function Price(){
    const price= useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}
export default Course;