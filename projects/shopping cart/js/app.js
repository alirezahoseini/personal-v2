// -----------------------------------------variables

// access to the courses list 
const coursesList = document.querySelector("#courses-list");

// access to the shoping cart tbody
const shopingCartTbody = document.querySelector("#shoping-cart > table > tbody");






// ----------------------------------------eventListeners
eventListeners();
function eventListeners(){

    
    // access to the user select course
    coursesList.addEventListener("click", buyCourse);

    // access to the user click to shoping cart
    shopingCartTbody.addEventListener("click", removeCourseAsShopingCartDom);

    // access to the clear cart button 
    document.querySelector(".clear-cart").addEventListener("click", clearCart);

    // onloaded courses from localStorage
    document.addEventListener("DOMContentLoaded", onloadCourseFromLocalStorage);

}





// ---------------- -------------------------- functions

// buy user selected course
function buyCourse(e){
    e.preventDefault();

    // delegation user click in the course list
    if(e.target.classList.contains("add-to-cart")){
        // access to the selected cart
        const course = e.target.parentElement.parentElement;
        
        // send course to getCourseInfo
        getCourseInfo(course);
    }
}

// set course info to the new object
function getCourseInfo(course){
    
    // created courseInfo object
    let courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h5").textContent,
        price: course.querySelector("p").textContent,
        id: course.querySelector("button").getAttribute("data-id")
    }

    // send courseInfo to addingCourseToDom shopingCart
    addingCourseToDom(courseInfo);
}


// adding new course to Soping cart DOM 
function addingCourseToDom(courseInfo){

    // created <tr> tag
    let row = document.createElement("tr");
    row.classList.add("tr");

    // created Html thamplate
    row.innerHTML = `
    <tr>
        <td>
            <img src="${courseInfo.image}">
        </td>
        <td>${courseInfo.title}</td>
        <td>
            ${courseInfo.price}
        </td>
        <td>
            <a class="remove" data-id ="${courseInfo.id}">x</a>
        </td>
    </tr>
    `

    // adding row <tr> tag to shopingCart tbody
    shopingCartTbody.appendChild(row);

    // add course to localStorage
    saveCourseToLocalStprage (courseInfo);

}

// add course to localStorage
function saveCourseToLocalStprage (course){

    // access to localStorege courses
    let courseList = checkingLocalStorageCourses();

    // pushing course to course list
    courseList.push(course);

    // set new item to localStorage
    localStorage.setItem("courses", JSON.stringify(courseList));

    // show success massege 
    alert("دوره به سبد خرید شما اضافه شد")

    
}

// cheking localStorage courses
function checkingLocalStorageCourses () {

    let courses;

    // check localStorage courses
    let coursesToLs = localStorage.getItem("courses"); 

    // if courses not exist
    if (coursesToLs === null){
        courses = []
    }else{
        courses = JSON.parse(coursesToLs);
    }

    return courses
}




// remove selected user course from DOM
function removeCourseAsShopingCartDom(e){
    // access to user removed course
    const userRemovedCourse = e.target.parentElement.parentElement; 

    // delegaition user click to shopig cart
    if(e.target.classList.contains("remove")){
        // delete course as shoping cart
        userRemovedCourse.remove();

        // show remove course massege
        alert("دوره از سبد خرید پاک شد")
    }
    
    // send data id user selected course to the remove course 
    removeCourseFromLocalStorage(userRemovedCourse.querySelector("a").getAttribute("data-id"));
}


// remove course from localStorage
function removeCourseFromLocalStorage(selectedCourse){
    // access to localStorage course
    const lsCourse = JSON.parse(localStorage.getItem("courses"));

    // deleted selected course as courses array
    lsCourse.forEach(function(course, index) {
        if(selectedCourse == course.id){
            lsCourse.splice(index, 1);
        }

        // set new courses to localStorage
        localStorage.setItem("courses", JSON.stringify(lsCourse));
        
    });
}



// clear shoping cart
function clearCart(e){
    // access to course list from shoping cart
    const courseList = document.querySelectorAll("tbody > tr");

    courseList.forEach(element => {
        element.remove();
        localStorage.clear();
    });
}



// onload courses from localStorage
function onloadCourseFromLocalStorage (){
    //add old course to shoping cart
    const getCoursesFromLs = JSON.parse(localStorage.getItem("courses"));

    // if localStorge not a null 
    if (getCoursesFromLs != null){
        getCoursesFromLs.forEach(function (courseInfo) {
            // created <tr> tag
            let row = document.createElement("tr");
            row.classList.add("tr");

            // created Html thamplate
            row.innerHTML = `
            <tr>
                <td>
                    <img src="${courseInfo.image}">
                </td>
                <td>${courseInfo.title}</td>
                <td>
                    ${courseInfo.price}
                </td>
                <td>
                    <a class="remove" data-id ="${courseInfo.id}">x</a>
                </td>
            </tr>
            `

            // adding row <tr> tag to shopingCart tbody
            shopingCartTbody.appendChild(row);
        });
    }else {
        console.log("courses is null");
    }

    // console.log(courses);
}