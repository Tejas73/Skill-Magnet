import axios from "axios";
import { Card, Typography, Button } from '@mui/material';
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export default function UserCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${BASE_URL}/user/courses`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setCourses(res.data.courses);
            }
            fetchData();
        }
        catch (e) {
            console.log("Fetching data", error.message);
            console.log("Response data", error.response.message);
        }
    }, [])

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {courses.map(course => {
            return <Course course={course} key={course._id} />
        })
        }
    </div>
}

export function Course({ course }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate("/course/" + course._id);
        }}>
            <Card style={{
                margin: 10,
                width: 300,
                minHeight: 200,
                padding: 20
            }}>
                <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
                <img src={course.imageLink} style={{ width: 300 }} ></img>
            </Card>
        </div>
    )
}
