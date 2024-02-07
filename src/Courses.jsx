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
                // Send a request to the courses endpoint along with the token 
                const res = await axios.get(`${BASE_URL}/admin/courses`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                // Courses data extracted from the response and stored in setCourses
                setCourses(res.data.courses);
            };
            fetchData();
        }
        catch (error) {
            console.error('Error fetching courses:', error.message);
            console.error('Response data:', error.response.data);
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {courses.map(course => (
                <Course course={course} key={course._id} setCourses={setCourses} />
            ))}
        </div>
    );
}

export function Course({ course, setCourses }) {
    const navigate = useNavigate();

    // Function to handle the delete button click
    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`${BASE_URL}/admin/courses/${courseId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            // Filter out the deleted course from the current state
            setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
            <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
            <Typography textAlign={'center'} variant="subtitle1">{course.description}</Typography>
            <img src={course.imageLink} style={{ width: 300 }} alt={course.title} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: '#FCA311' }}
                    onClick={() => {
                        navigate('/course/' + course._id);
                    }}
                >
                    Edit
                </Button>
                <Button onClick={() => handleDelete(course._id)}>
                    <DeleteIcon style={{ color: '#960200' }}></DeleteIcon>
                </Button>
            </div>
        </Card>
    );
}

export default Courses;
