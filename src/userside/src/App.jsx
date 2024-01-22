import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userState } from '../../store/atoms/user';

import UserLanding from './userComponents/UserLanding';
import UserLogin from './userComponents/UserLogin';
import UserPurchasedCourses from './userComponents/UserPurchasedCourses';
import UserAppBar from './userComponents/UserAppbar'
import UserSignup from './userComponents/UserSignup';
import UserCourses from './userComponents/UserCourses';
import UserCourse from './userComponents/UserCourse';


function App() {

  return (
    <div >

      <Router>
        <UserAppBar></UserAppBar>
        <InitUser></InitUser>
        <Routes>
          <Route path="/" element={<UserLanding />} />
          <Route path="/courses" element={<UserCourses />} />
          <Route path="/course/:courseId" element={<UserCourse />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/userpurchasedcourses" element={<UserPurchasedCourses />} />
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

      const response = await axios.get(`${BASE_URL}/user/me`, {
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

export default App;
