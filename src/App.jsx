import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Appbar from "./Appbar.jsx";
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Courses from './Courses.jsx';
import Course from './Course.jsx';
import Landing from './Landing.jsx';
import AddCourse from './AddCourse.jsx';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { BASE_URL } from './config.js';
import { useEffect } from 'react';
import { userState } from './store/atoms/user.js';

function App() {

  return (
    <div > 
      <Router>
        <Appbar></Appbar>
        <InitUser></InitUser>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
        </Routes>
      </Router>
    </div>
  )
}

// InitUser is the friendly messenger making sure every component in your app knows who's currently using it.
function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {

      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }
      // else{                            //probably redundant
      // isLoading: true,
      // userEmail: null
      // }
    }
    catch (e) {
      setUser({
        isLoading: true,
        userEmail: null
      })
    }
  }

  useEffect(() => {
    init();
  }, [])

  return <></>
}

export default App
