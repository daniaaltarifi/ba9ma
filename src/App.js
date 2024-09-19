import React,{useContext,useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './Pages/LandingPage.js';
import Courses from './Pages/Courses.js';
import Footer from './components/Footer.js';
import CourseDetails from './Pages/CourseDetails.js';
import WhoWeAre from './Pages/WhoWeAre.js';
import Blogs from './Pages/Blogs.js';
import BlogDetails from './Pages/BlogDetails.js';
import CardPrice from './Pages/CardPrice.js';
import SignUp from './Pages/SignUp.js';
import Login from './Pages/Login.js';
import Profile from './Pages/Profile.js';
import ContactUs from './Pages/ContactUs.js';
import Library from './Pages/Library.js';
import MyCourses from './Pages/MyCourses.js';
import AddBlog from './Pages/AddBlog.js';
import { UserProvider } from './UserContext';

import ForgotPassword from './Pages/ForgotPassword.js';
import ResetPassword from './Pages/ResetPassword.js';
import MyCourseDetail from './Pages/MyCourseDetail.js';
function App() {
    const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/Warning/.test(args[0])) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
  // const { user, updateUser, logout } = useAuth();
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: '',
    userName: '',
    img: '',
  });  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    const img = localStorage.getItem('img');
setUser({
  isLoggedIn: !!auth,
  userName: name || '',
  userId: id || '',
  img: img || '',
});
}, []);
  return (
    <UserProvider>

    <Router>
          <Navbar />
          <div className="App"dir='rtl'>
        <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path='/profile/:id' element={<Profile />} />
          <Route path="/" element={<LandingPage />} />
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/coursedetails/:id' element={<CourseDetails/>}/>
          <Route path='/whoweare' element={<WhoWeAre/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blogdetails/:id' element={<BlogDetails/>}/>
          <Route path='/addblog' element={<AddBlog/>}/>
          <Route path='/cardprice' element={<CardPrice/>}/>
          <Route path='/library' element={<Library/>}/>
          <Route path='/mycourses' element={<MyCourses /> }/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/mycoursedetails/:id' element={<MyCourseDetail/>}/>

        </Routes>
      </div>
      <Footer/>
    </Router>
    </UserProvider>
  );
}

export default App;
