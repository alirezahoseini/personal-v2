// Import Classes
const html= new Html();

/*----------------------------------
* * * * * *  * Varibles  * * * * *  
-----------------------------------*/




document.addEventListener('DOMContentLoaded', () => {
    newTask();
    removeTask();
    search();
    filterTasks();
    popupNewTaskBtn();
    html.progressChart('firstLoaded');
});



/*--------------------------------------------
* * * * * * * * * * Functions  * * * * * * * * 
---------------------------------------------*/


/*---------------------
       New Task
----------------------*/
function newTask(){
    // access to the elements
    const newTaskBtn = document.querySelector('#new-task-btn'),
          newTaskForm = document.querySelector('#new-task-form'),
          bgBlur = document.querySelector('#new-task-form .background-blur'),
          container = document.querySelector('.container'),
          titleInput = document.querySelector('#title');
    let progressTasks = [];
    let completeTasks = [];


    // functions 
    loadTasks();
    openAndCloseForm();
    formValidation();
    createdCategory();


    // open and close form
    function openAndCloseForm(){
        // set click event on new task button
        newTaskBtn.addEventListener('click', () => {
            // show form blur container
            newTaskForm.classList.add('active');
            container.classList.add('blur');
            // Reset form
            html.resetNewTaskForm();
            // Push new id to browser history
            window.history.pushState({id:1}, 'id' ,'/projects/todo?id=CreatedNewTask');
        });
        // set click event on bgBlur
        bgBlur.addEventListener('click', () => {
            closer();
            // back to prev history
            window.history.back();
        });

        // access to closer button
        const closerBtn = newTaskForm.querySelector('.closer');
        closerBtn.addEventListener('click', () => {
            closer();
            // back to prev history
            window.history.back();
        });


        // if back button clicked
        window.addEventListener('popstate', () => {
            // close form 
            closer();
            // access to the category elements
            const bgBlur = document.querySelector('#categories-form .background-blur'),
            categoriesBox = document.querySelector('#categories-form');
            // hide category box
            categoriesBox.classList.remove('active');
            bgBlur.classList.remove('active');
            // set default url
            window.history.replaceState({id:1}, 'default url', '/projects/todo');
        });

        // close form
        function closer(){
            // hide form class on container
            newTaskForm.classList.remove('active');
            container.classList.remove('blur');
            
            // reset form
            html.resetNewTaskForm();
        }
    }

    // form validation
    function formValidation(){
        newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // access to the form inputs
            const title =  newTaskForm.querySelector('#title'),
                  category = newTaskForm.querySelector('input[name="select-category"]:checked'),
                  priority = newTaskForm.querySelector('input[name="priority"]:checked');
            // 
            progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
            
            // access to the task length
            let taskLength = JSON.parse(localStorage.getItem('progressTasks'));
            taskLength = taskLength.length;
                  
            // validattion title
            if(title.value == null || title.value == '' || title.value == ' '){
                html.showMessage('Please Enter a Titel');
                // validattion categories
            } else if(category == null){
                html.showMessage('Please Select a Category');
                // validattion priority
            } else if(priority == null){
                html.showMessage('Please Select a Priority');
            }else if(newTaskForm.classList.contains('edite')){
                // access to the task id
                const taskId = newTaskForm.getAttribute('taskId');

                // created task object
                const task = {
                    title: title.value,
                    category: category.getAttribute('id'),
                    priority:  priority.getAttribute('id'),
                    taskId: taskId,
                    complete: false
                }
                // EDITE
                html.editTaskFromDomAndLS(taskId, task);
            }else {
                // created task object
                const task = {
                    title: title.value,
                    category: category.getAttribute('id'),
                    priority:  priority.getAttribute('id'),
                    taskId: idGnrataor(),
                    complete: false
                }
                // hide form and remove blur class on container
                container.classList.remove('blur');
                newTaskForm.classList.remove('active');
                // Created New Task
                createdNewTask(task);
                // REST FORM
                html.resetNewTaskForm();

                // update progress chart
                html.progressChart('update');
            }
        })
    }

    // Created New Category
    function createdCategory(){
        // access to the elements
        const newCategoryBtn = document.querySelector('#new-category-btn'),
              newTaskForm = document.querySelector('#new-task-form'),
              bgBlur = document.querySelector('#categories-form .background-blur'),
              categoriesBox = document.querySelector('#categories-form'),
              form = document.querySelector('#categories-form form'),
              input = form.querySelector('#new-category-input');

        // Created ls categories
        let categories;

        // ------- Functions ------------ //
        getLocalStorageData();
        openAndCloseForm();
        create();



        // Acssess to the local storage Data
        function getLocalStorageData(){
            // first load data
            const lsData = localStorage.getItem('categories');
            // if ls data is nul === created empty array
            if(lsData === null || ''){
                localStorage.setItem('categories', '[]');
                categories = [];
            }
            else{
                // else set ls data to categories array and set data in DOM
                categories = JSON.parse(lsData);
                updateCategories();
            }
        }


        // open and close form
        function openAndCloseForm(){
            //  set click event on new category btn ----> open category box
            newCategoryBtn.addEventListener('click', () => {
                categoriesBox.classList.add('active');
                newTaskForm.classList.remove('active');
                container.classList.add('blur');
                // focus in input
                setTimeout(() => {
                    input.focus();
                }, 200);
            });
            // set click event on bg blur ----> close category box
            bgBlur.addEventListener('click', ()=>{
                categoriesBox.classList.remove('active');
                newTaskForm.classList.add('active');
            });
            // access to the closer
            const closerButton = document.querySelector('#categories-form .closer');
            closerButton.addEventListener('click', ()=>{
                categoriesBox.classList.remove('active');
                newTaskForm.classList.add('active');
            });

        }


        // created new category 
        function create(){
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                // access to the input value
                const inputValue = form.querySelector('input').value;

                // validation 
                const validation = isValid(inputValue);
                // Chack Exist Category in list
                const checkData = isExist(inputValue);
                if(validation){
                    html.showMessage('Space is not allowed')
                }else if(checkData === false){
                    // push input value in categoris array
                    categories.push(inputValue);
                    // add new category to localstorage
                    localStorage.setItem('categories', JSON.stringify(categories));
                    // update category list
                    updateCategories();
                    input.value = '';
                }else{
                    // show err message
                    html.showMessage('This Category Exist in list..!')
                }

            });


            // Chacking exist category
            function isExist(value){
                // search in categories
                const finder = categories.filter((category) => {
                    return category == value;
                });
                // if exist
                if(finder.length === 0){
                    return false;
                } else{
                    return true;
                }
            }

            // Validation inpute value
            function isValid(value){
                const pattern = /( )/;
                const result = pattern.test(value);
                return result;
            }
        }


        // Update categories
        function updateCategories(){
            // access to the lsData
            const lsData = JSON.parse(localStorage.getItem('categories'));

            
            // access to the elements
            const categoryFormList =  categoriesBox.querySelector('#category-list');
            const addNewTaskList = newTaskForm.querySelector('.task-categories');


            // Remove list options
            categoryFormList.innerHTML = '';
            addNewTaskList.innerHTML = '';
            
            // Each in categories
            lsData.forEach((category, index) => {


                // update categoryBox list
                upCtegoryBoxList();
                function upCtegoryBoxList(){

                    // created li tag
                    const li = document.createElement('li');
                    // set class list 
                    li.classList = 'category-option m-2 d-flex align-items-center justify-content-between py-2 px-3';
                    // set attr
                    li.setAttribute('category-id', category);
                    li.setAttribute('category-index', index);
                    // created html template
                    li.innerHTML = `
                        <span class="name">${category}</span>
                        <i class="fa-duotone fa-trash ml-3"></i>
                    `;
    
                    // append li to the list
                    categoryFormList.appendChild(li);
                }


                // update add new task list
                upNewTaskList();
                function upNewTaskList(){
                    // created div tag 
                    const div = document.createElement('div');
                    // set class list
                    div.classList = 'radio-group mx-2';
                    // set attr
                    div.setAttribute('category-id', category);
                    div.setAttribute('category-index', index);
                    // created html template
                    div.innerHTML = `
                    <input type="radio" name="select-category" id="${category}">
                    <label for="${category}" class="">${category}</label>
                    `;
    
                    // append div to the list
                    addNewTaskList.appendChild(div);
                }

            });

            // update remove category
            removeCategory();
        }

        
        // Remove Ctegory
        function removeCategory(){
            // access to the all categories
            const liTags = document.querySelectorAll('.category-option');
            // each in li tags
            liTags.forEach((liTag, index) => {
                // set click event on delete buttons
                liTag.children[1].addEventListener('click', () =>{
                    // remove li from categories array
                    categories.splice(index, 1);
                    // remove li from local storage
                    localStorage.setItem('categories', JSON.stringify(categories));
                    // update categories list
                    updateCategories();

                })
            });
        }
              
    }

    // Load Task From Local Storage
    function loadTasks(){
        // access to the progress tasks from LS
        const progressData = localStorage.getItem('progressTasks');
        // access to the complate tasks from LS
        const completeData = localStorage.getItem('completeTasks');


        // if  progress tasks is nul === created empty array
        if(progressData === null || progressData == '' || progressData == '[]'){
            localStorage.setItem('progressTasks', '[]');
            progressTasks = [];
        }
        else{
            // else set  progress tasks to categories array and set data in DOM
            progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
            html.loadProgressTasks(progressTasks);
        }


        // if  complete tasks is nul === created empty array
        if(completeData === null || completeData == '' || completeData == '[]'){
            localStorage.setItem('completeTasks', '[]');
            completeTasks = [];
        }
        else{
            // else set complete tasks to categories array and set data in DOM
            completeTasks = JSON.parse(localStorage.getItem('completeTasks'));
            html.updateCompleteTaskList(completeTasks);
        }
    }

    // Created New Task
    function createdNewTask(task){

        // push task to task array
        progressTasks.push(task);
        // set task array to local storage
        localStorage.setItem('progressTasks', JSON.stringify(progressTasks));
        // created task in DOM
        html.addNewTaskToList(task);
        
        
    }

    // Created Unique id
    function idGnrataor(){
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }  
}


/*---------------------
       Remove Task
----------------------*/
function removeTask(){
    // Access To the Elements
    const confirmBox = document.querySelector('#confirm-box'),
    container = document.querySelector('.container'),
    bgBlur = confirmBox.querySelector('.background-blur'),
    cancelBtn = confirmBox.querySelector('#cancel'),
    removeBtn = confirmBox.querySelector('#remove');

    // undo Task
    let removeTimeOut;
    undoTask();

   


    // Set click Event on Cancel Button
    cancelBtn.addEventListener('click', closer);


    // Set Click Event on Remove Button
    removeBtn.addEventListener('click', () => {
        // access to the indexes
        const taskIndexes = findIndex();
        // access to the Undo box and Set index
        const undoBox = document.querySelector('#undo-box');
        // Set Task Data in Undo Box
        undoBox.setAttribute('indexes', JSON.stringify(taskIndexes));

        // Access to the all task from DOM
        let allFromDom = '';
        if(taskIndexes.status == 'progress'){
            allFromDom = document.querySelectorAll(`#task-list .list-option`);
        }else{
            allFromDom = document.querySelectorAll(`#complete-list .list-option`);
        }

        
        

        /*-------------------------------
                Hide Task From Dom
        --------------------------------*/
        // Add Remove Class To Task Tag
        allFromDom[taskIndexes.dom].classList.add('remove');
        // Remove Task From Dom After .5s
        setTimeout(() => {
            // Undo Message Open
            undoBox.classList.add('active');
             // Hide Task From Dom
            allFromDom[taskIndexes.dom].classList.add('d-none');
            allFromDom[taskIndexes.dom].classList.remove('d-flex');
        }, 500);

        // Close Confirm Box
        closer();

    
        /*-------------------------------
              Remove Task After 3s
        --------------------------------*/
        /////// If NOT UNDO TASK after 3s remove task from dom and Localstorage
        removeTimeOut = setTimeout(() => {
            // hide undo box
            undoBox.classList.remove('active');
            // Remove task from dom
            allFromDom[taskIndexes.dom].remove();
            /*-------------------------------
                Remove Task From LOCALSTORAGE
            --------------------------------*/
            // access to tasks from LS
            let lsData = JSON.parse(localStorage.getItem(`${taskIndexes.status}Tasks`));
            // Remove Task from LS Task Array
            lsData.splice(taskIndexes.local, 1);
            // Stringify
            lsData = JSON.stringify(lsData);
            // Set LsData to LocalStorage
            localStorage.setItem(`${taskIndexes.status}Tasks`, lsData);

            
            // update progress chart
            html.progressChart('update');
        }, 3000);
    });


    // FIND TASK INDEX IN DOM AND LOCALSTORAGE
    function findIndex(){
        // created empty object
        let indexes = {
            local: null,
            dom: null,
            status: null
        }
        // Access to task id
        const taskId = confirmBox.getAttribute('task-id');
        // Access to status
        const status = confirmBox.getAttribute('status');


        // Access to The All task from localStorage
        const allFromLocal = JSON.parse(localStorage.getItem(`${status}Tasks`));
        // Find Local Index
        allFromLocal.forEach((lsTask, index) => {
            if(lsTask.taskId == taskId){
                indexes.local = index;
                indexes.status = status;
            }
        });


        // Access to the all task from DOM
        let allFromDom = '';
        if(status == 'progress'){
            allFromDom = document.querySelectorAll(`#task-list .list-option`);
        }else{
            allFromDom = document.querySelectorAll(`#complete-list .list-option`);
        }
        // Find DOM Index
        allFromDom.forEach((domTask, index) => {
            if(domTask.getAttribute('id') == taskId){
                indexes.dom = index;
            }
        });
        

        // Return Indexes
        return indexes;
    }
    
    // Box Closer
    function closer(){
        // Access To the Elements
        const container = document.querySelector('.container'),
        bgBlur = confirmBox.querySelector('.background-blur');

        container.classList.remove('blur');
        confirmBox.classList.remove('active');
        // set default url
        window.history.replaceState({id:1}, 'default url', '/projects/todo');
    }

    // UnDo Remove Task
    function undoTask(){
        // access to the Elements
        const undoBox = document.querySelector('#undo-box'),
              undoButton = undoBox.querySelector('button');

        

        // 
        undoButton.addEventListener('click', () => {
            // access to task indexes
            const taskIndexes = JSON.parse(undoBox.getAttribute('indexes'));

            // Access to the all task from DOM
            let allFromDom = '';
            if(taskIndexes.status == 'progress'){
                allFromDom = document.querySelectorAll(`#task-list .list-option`);
            }else{
                allFromDom = document.querySelectorAll(`#complete-list .list-option`);
            }

            // add display flex class to the task li tag
            allFromDom[taskIndexes.dom].classList.add('d-flex');
            allFromDom[taskIndexes.dom].classList.remove('d-none');
            // Add undo class after .2s ===> slide to left and back task with green effect
            setTimeout(() => {
                allFromDom[taskIndexes.dom].classList.add('undo');
                // remove slide effects class after .2s ===> remove and undo class
                setTimeout(() => {
                    allFromDom[taskIndexes.dom].classList.remove('undo');
                    allFromDom[taskIndexes.dom].classList.remove('remove');
                }, 300);
            }, 200);

    
            clearTimeout(removeTimeOut);
            undoBox.classList.remove('active');
        })
        
    }
  

}



/*------------------------
  Search in Progress Tasks
-------------------------*/
function search(){
    // Access to the elements
    const searchInput = document.querySelector('#search input');


    // functions 
    openAndCloser();
    changeInput();


    // Open and close search box
    function openAndCloser(){
        // Access to the elements
        const searchBox = document.querySelector('#search'),
              searchOpenerBtn = searchBox.querySelector('.search-icon'),
              searchCloserBtn = searchBox.querySelector('.close-search'),
              listTitle = document.querySelector('.list-title');

        // Open Searchbox
        searchOpenerBtn.addEventListener('click', () =>{
            searchBox.classList.add('active');
            setTimeout(() => {
                // focus in input
                searchInput.focus();
            }, 30);

            // access to the screen width
            const screenWidth = window.innerWidth;
            // hidde list title in mobile
            if(screenWidth <= 500){
                listTitle.classList.add('hidde');
            }

        });

        // Close Searchbox
        searchCloserBtn.addEventListener('click', () =>{
            searchBox.classList.remove('active');
            listTitle.classList.remove('hidde');

            //// --------- Reset search 
            // access to the all li tags
            const liTags = document.querySelectorAll('#list li');
            // clear search input value
            searchInput.value = '';
            // show all tags
            liTags.forEach(element => {
                element.classList.remove('hidde');
            });
        });
    }

    //
    function changeInput(){
        searchInput.addEventListener('input', () => {
            // access to the tasks
            const tasks = document.querySelectorAll('#list li');
            const value = searchInput.value.toLowerCase();
            // Each in tags
            tasks.forEach(liTag => {
                // check search value
                const checking = liTag.title.toLowerCase().includes(value);
                // Show tag
                if(checking){
                    liTag.classList.remove('hidde')
                }else{
                    // Hidde tag
                    liTag.classList.add('hidde')
                }
            });  
        })
    }
}



/*------------------------
  Filte in Progress Tasks
-------------------------*/
function filterTasks(){
    // Access to the elements
    const filterBox = document.querySelector('#filter-box');


    ///Functions 
    openAndCloser();
    selectFilter();


    // Open And colse filter box
    function openAndCloser(){
        // Access to the filter button
        const filterOpenerBtn = document.querySelector('.filter-opener');

        filterOpenerBtn.addEventListener('click', () => {
            // Access to the search box
            const searchBox = document.querySelector('#search');
            if(searchBox.classList.contains('active')){searchBox.classList.remove('active')}

            if(filterBox.classList.contains('active')){
                filterOpenerBtn.classList.replace('fa-xmark-circle','fa-filter');
            }else{
                filterOpenerBtn.classList.replace('fa-filter','fa-xmark-circle');
            }
            filterBox.classList.toggle('active');
            
        });


    }


    // Select Filter
    function selectFilter(){
        // access to the filter buttons
        const filterButtons = filterBox.querySelectorAll('li');

        filterButtons.forEach((button, index) =>{
            button.addEventListener('click', () => {
                const buttonId = button.getAttribute('data-id');

                if(buttonId === 'priority'){
                    sortTasksByPriority()
                }else if(buttonId === 'date'){
                    /// clear progress list
                    const progressList = document.querySelector('#list');
                    progressList.innerHTML = '';

                    const allTasks = JSON.parse(localStorage.getItem('progressTasks'));

                    allTasks.map((task)=> html.addNewTaskToList(task))

                }

                // active button
                const buttons = document.querySelectorAll('#filter-box li');
                buttons.forEach((button) => {button.classList.remove('active')});
                button.classList.add('active');

                // close filter box
                // Access to the filter button
                const filterOpenerBtn = document.querySelector('.filter-opener');
                filterOpenerBtn.classList.replace('fa-xmark-circle','fa-filter');
                filterBox.classList.remove('active')
            });
        })
    }


    // Sort Tasks by priority
    function sortTasksByPriority(){
        const allTasks = JSON.parse(localStorage.getItem('progressTasks'));

        let lowTasks = [];
        let mediumTasks = [];
        let highTasks = [];

        allTasks.forEach((task)=>{
            if(task.priority == 'Low'){
                lowTasks.push(task);
            }else if(task.priority == 'Medium'){
                mediumTasks.push(task);
            }else{
                highTasks.push(task);
            }
        });

        // push tasks to sorted array
        const sortedTasksArray = [];
        lowTasks.map((task) => sortedTasksArray.push(task));
        mediumTasks.map((task) => sortedTasksArray.push(task));
        highTasks.map((task) => sortedTasksArray.push(task));
        /// clear progress list
        const progressList = document.querySelector('#list');
        progressList.innerHTML = '';
        // show sorted task 
        sortedTasksArray.map((task)=> html.addNewTaskToList(task));
        
    }
}



/*------------------------
  Popup New task button
-------------------------*/
function popupNewTaskBtn(){
    // Access to the button
    const button = document.querySelector('#new-task-popup');

    // Show And hidde button
    window.addEventListener('scroll', (e) => {
        window.scrollY > 80 ? button.classList.remove('hidden') : button.classList.add('hidden')
    });

    button.addEventListener('click', () => {
         // access to the elements
        const newTaskForm = document.querySelector('#new-task-form'),
        bgBlur = document.querySelector('#new-task-form .background-blur'),
                container = document.querySelector('.container');


        // show form blur container
        newTaskForm.classList.add('active');
        container.classList.add('blur');
        // Reset form
        html.resetNewTaskForm();
        // Push new id to browser history
        window.history.pushState({id:1}, 'id' ,'/projects/todo?id=CreatedNewTask');
    });
}