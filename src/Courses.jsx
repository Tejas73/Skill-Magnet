import { Card, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './config.js';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                //sent a req at courses endpoint along with token 
                const res = await axios.get(`${BASE_URL}/admin/courses`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                // courses was extracted from res and stored to the setCourses
                // console.log('Token:', localStorage.getItem('token'));
                setCourses(res.data.courses)
            }
            fetchData();
        }
        catch (e) {
            console.error('Error fetching courses:', error.message);
            console.error('Response data:', error.response.data);
        }
    }, [])

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => {
            return <Course course={course} key={course._id} />
        }
        )}
    </div>
}

//to render a Card in the Courses component. this code tells a how a Card should appear in the Courses(showCourses) component
export function Course({ course }) {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300 }} ></img>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" style={{ backgroundColor: "#FCA311" }} onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
            {/* <Button onClick={handleDelete} >
            {/* implement delete functionality in FE and BE */}
                {/* <DeleteIcon style={{color:"#960200"}}></DeleteIcon> 
            // </Button> */} 
        </div>
    </Card>

}

export default Courses;