import React from "react"
import { getCourse } from "../api/course";

export  const useCourse = () => {
    const [course, setCourse] = React.useState<number>(65);

    React.useEffect(() => {
        const getActualCourse = async () => {
            try {
                const course = await  (await getCourse()).json();
                setCourse(course?.quotes?.USDRUB || 65);
            } catch (error) {
                console.error(error);
            }
        };

        getActualCourse();

        const checkCourseInterval = setInterval(async () => await getActualCourse(), 120000);

        return () => clearInterval(checkCourseInterval);
    }, []);

    return course;
}