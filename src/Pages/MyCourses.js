import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function MyCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const [courseId, setCourseId] = useState(null);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://ba9maacademy.kasselsoft.online/api/getApprovedCoursesForUser/${userId}`
        );
        setCourses(response.data);
        setSearchResults(response.data);
        if (response.data.length > 0) {
          setCourseId(response.data[0].course_id);
        }
      } catch (error) {
        console.error("Error fetching approved courses:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://ba9maacademy.kasselsoft.online/api/getApprovedCoursesForUser/${userId}`
        );
        const fetchedCourses = response.data;
  
        // Fetch additional data (student count and lesson count) for each course
        const coursesWithDetails = await Promise.all(
          fetchedCourses.map(async (course) => {
            try {
              const studentCountResponse = await axios.get(
                `https://ba9maacademy.kasselsoft.online/courses/users-counts/${course.course_id}`
              );
  
              const lessonCountResponse = await axios.get(
                `https://ba9maacademy.kasselsoft.online/courses/lesson-counts/${course.course_id}`
              );
  

               // Ensure we access the lesson_count correctly from the response
            const lessonCountData = lessonCountResponse.data;
            const lessonCount = Array.isArray(lessonCountData) && lessonCountData.length > 0
              ? lessonCountData[0].lesson_count
              : 0;


             return {
              ...course,
              student_count: studentCountResponse.data?.student_count || 0,
              lesson_count: lessonCount || 0,
            };
          } catch (error) {
            console.error(`Error fetching data for course ${course.course_id}:`, error);
            return {
              ...course,
              student_count: 0,
              lesson_count: 0,
              };
            }
          })
        );
  
        setCourses(coursesWithDetails);
        setSearchResults(coursesWithDetails);
      } catch (error) {
        console.error("Error fetching approved courses:", error);
      }
    };
  
    fetchCourses();
  }, [userId]);
  

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://ba9maacademy.kasselsoft.online/department");
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const filterCourses = () => {
      let filteredCourses = courses;

      // Filter by search query
      if (searchQuery) {
        filteredCourses = filteredCourses.filter((course) =>
          course.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by selected department
      if (selectedDepartment) {
        filteredCourses = filteredCourses.filter(
          (course) => course.department_id === parseInt(selectedDepartment)
        );
      }

      setSearchResults(filteredCourses);
    };

    filterCourses();
  }, [searchQuery, selectedDepartment]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartment = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <>
     {/* background image */}
     <div className="slide-item">
     <img
       src={require("../assets/coursat.jpeg")}
       alt={`Contact Video`}
       className="img_home"
     />
     <div className="overlay">
       <div className="overlay-content">
         <h1 style={{ fontWeight: "700", fontSize: "64px" }}>دوراتي</h1>
       </div>
     </div>
   </div>
   {/* End background image */}

   <section className="margin_section">
     <div className="container ">
       <div className="row ">
         <div className="col-lg-3 col-md-4 col-sm-12">
           <div className="navbar__search">
             <span>
               <i
                 className="fa-solid fa-magnifying-glass fa-sm"
                 style={{ color: "#833988" }}
               ></i>{" "}
             </span>
             <input
               type="text"
               placeholder="ابحث عن مادة"
               value={searchQuery}
               className="search_course"
               onChange={handleInputChange}
             />
             <a href="#" className="btn btn-s purple_btn search_btn">
               بحث{" "}
             </a>
          
           </div>
         </div>
         <div className="col-lg-3 col-md-4 col-sm-12">
           <select
             name="department"
             value={selectedDepartment}
             onChange={handleDepartment}
             id="lang"
             className="select_dep"
           >
             <option value="">اختر قسم</option>
             {department.map((dep) => (
               <option key={dep.id} value={dep.id}>
                 {dep.title}
               </option>
             ))}
           </select>
         </div>
         <div className="col-lg-6 col-md-4 col-sm-12"></div>
       </div>
     </div>
   </section>

   <div className="container">
     <div className="row d-flex flex-wrap justify-content-center align-items-center">
       {searchResults.map((course, index) => (
         <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
           <Link
             style={{ textDecoration: "none" }}
             to={`/mycoursedetails/${course.course_id}`}
           >
             <div className="card card_cont">
               <img
                 src={`https://ba9maacademy.kasselsoft.online/${course.img}`}
                 className="card-img-top img-fluid card_img"
                 alt={course.subject_name}
               />
               <div className="card-body">
                 <div>
                   <p className="card-text card_dep">
                     {course.department_name}
                   </p>
                 </div>
                 <div className="d-flex justify-content-between">
                   <p className="course_title_card">
                     {course.subject_name}
                   </p>
                   <p className="teacher_name_card">{course.teacher_name}</p>
                 </div>
                 <hr style={{ marginTop: "1px" }} />
                 <div className="d-flex justify-content-between">
                   <i
                     className="fa-solid fa-file card_icon"
                     style={{ color: "#F57D20" }}
                   ></i>
                   <p className="details_courses_card">
                     {course.student_count} طالب
                   </p>
                   <i
                     className="fa-solid fa-graduation-cap card_icon"
                     style={{ color: "#F57D20" }}
                   ></i>{" "}
                   <p className="details_courses_card">
                     {course.lesson_count} درس
                   </p>
                   <i
                     className="fa-solid fa-clock card_icon"
                     style={{ color: "#F57D20" }}
                   ></i>{" "}
                   <p className="details_courses_card">
                     {new Date(course.course_created_at).toLocaleDateString()}
                   </p>
                 </div>
               </div>
             </div>
           </Link>
         </div>
       ))}
     </div>
   </div>
 </>
);
}

export default MyCourses;