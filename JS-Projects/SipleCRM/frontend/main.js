//сам список

// let studentList = [
//     {
//         name: 'Иван',
//         surname: 'Иванович',
//         lastname: 'Иванов',
//         birthday: '1990-10-25',
//         startStud: '2017-9-1',
//         fuc: 'Math'
//     },
//     {
//         name: 'Василий',
//         surname: 'Васильевич',
//         lastname: 'Васильев',
//         birthday: '1987-10-21',
//         startStud: '2021-9-1',
//         fuc: 'Biology'
//     },
//     {
//         name: 'Петр',
//         surname: 'Петрович',
//         lastname: 'Петров',
//         birthday: '2000-10-12',
//         startStud: '2020-9-1',
//         fuc: 'Math'
//     },
//     {
//         name: 'Анна',
//         surname: 'Ивановна',
//         lastname: 'Иванова',
//         birthday: '1998-1-9',
//         startStud: '2019-9-1',
//         fuc: 'Math'
//     },
// ];

const SERVER_URL = 'http://localhost:3000'

async function serverAddStudent(obj) {              //ДОБАВЛЯЕМ СТУДЕНТА НА СЕРВЕР
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json();
    return data;
}

async function serverGetStudent() {                 //ПОЛУЧАЕМ ДАННЫЕ С СЕРВЕРА
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    return data;
}

async function serverDeleteStudent(id) {                 //ПОЛУЧАЕМ ДАННЫЕ С СЕРВЕРА
    let response = await fetch(SERVER_URL + '/api/students/' + id, {
        method: 'DELETE',
    })

    let data = await response.json();
    return data;
}

let serverStudentsList = await serverGetStudent();

let studentList = [];

if (serverStudentsList) {
    studentList = serverStudentsList;
}

let sortColumn = 'fio'

//форма

const $form = document.createElement('form'),
    $inputName = document.createElement('input'),
    $inputSurName = document.createElement('input'),
    $inputLastName = document.createElement('input'),
    $inputBirthday = document.createElement('input'),
    $inputStartStud = document.createElement('input'),
    $inputFuc = document.createElement('input'),
    $btnAccept = document.createElement('button');

    $form.classList.add('mb-3')
    $inputName.classList.add('form-control', 'mb-3');
    $inputSurName.classList.add('form-control', 'mb-3');
    $inputLastName.classList.add('form-control', 'mb-3');
    $inputBirthday.classList.add('form-control', 'mb-3');
    $inputStartStud.classList.add('form-control', 'mb-3');
    $inputFuc.classList.add('form-control', 'mb-3');
    $btnAccept.classList.add('btn', 'btn-primary');

    document.querySelector('.container').append($form);
    $form.id = 'form-id';
    $form.append($inputName, $inputSurName, $inputLastName, $inputBirthday, $inputStartStud, $inputFuc, $btnAccept);

    let today = new Date();
    function bMax (today) {
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if(dd < 10){
                dd = '0'+ dd
            } 
            if(mm < 10){
                mm = '0'+ mm
            } 
        return today = yyyy + '-' + mm + '-' + dd;
    }

    $inputName.id = 'form__name'; $inputName.type = 'text'; $inputName.placeholder = 'Имя';
    $inputSurName.id = 'form__surname'; $inputSurName.type = 'text'; $inputSurName.placeholder = 'Отчество';
    $inputLastName.id = 'form__lastname'; $inputLastName.type = 'text'; $inputLastName.placeholder = 'Фамилия';
    $inputBirthday.id = 'form__birthday'; $inputBirthday.type = 'date'; $inputBirthday.placeholder = 'Дата рождения'; $inputBirthday.min = '1900-01-01'; $inputBirthday.max = bMax(today);//КАК СДЕЛАТЬ ВИДИМЫМ PLACEHOLDER
    $inputStartStud.id = 'form__startstud'; $inputStartStud.type = 'date'; $inputStartStud.min = '2000-01-01'; $inputStartStud.max = bMax(today);
    $inputFuc.id = 'form__startstud'; $inputFuc.type = 'text'; $inputFuc.placeholder = 'Факультет';

    $btnAccept.textContent = 'Добавить'; $btnAccept.type = 'submit'

    // фильтр

const $filterForm = document.createElement('form'),
    $filterTitle = document.createElement('h2'),
    $filterFIO = document.createElement('input'),
    $filterFuc = document.createElement('input'),
    $filterStartStud = document.createElement('input'),
    $filterEndStud = document.createElement('input');

    $filterForm.classList.add('mb-3'); $filterForm.id = 'ff';
    $filterFIO.classList.add('form-control', 'mb-3'); $filterFIO.id = 'ff__fio'; $filterFIO.placeholder = 'ФИО';
    $filterFuc.classList.add('form-control', 'mb-3'); $filterFIO.id = 'ff__fuc'; $filterFuc.placeholder = 'Факультет';
    $filterStartStud.classList.add('form-control', 'mb-3'); $filterFIO.id = 'ff__start'; $filterStartStud.placeholder = 'Год начала обучения';
    $filterEndStud.classList.add('form-control', 'mb-3'); $filterFIO.id = 'ff__end'; $filterEndStud.placeholder = 'Год окончания обучения';
    $filterTitle.textContent = 'Фильтр'

    document.querySelector('.container').append($filterForm);
    $filterForm.append($filterTitle, $filterFIO, $filterFuc, $filterStartStud, $filterEndStud);

    
//таблица

const $tableCont = document.createElement('div');
$tableCont.classList.add('tableCont');
document.querySelector('.container').append($tableCont)

const $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),

    $tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThAge = document.createElement('th'),
    $tableHeadThStage = document.createElement('th'),
    $tableHeadThFuc = document.createElement('th');
  

    $table.classList.add('table', 'table-dark', 'table-striped')
    

    $tableHeadTr.append($tableHeadThFIO, $tableHeadThAge, $tableHeadThStage, $tableHeadThFuc);
    
    $tableHeadThFIO.textContent = 'ФИО'; $tableHeadThFIO.classList.add('pointer');
    $tableHeadThAge.textContent = 'Возраст'; $tableHeadThAge.classList.add('pointer');
    $tableHeadThStage.textContent = 'Дата поступления'; $tableHeadThStage.classList.add('pointer');
    $tableHeadThFuc.textContent = 'Факультет'; $tableHeadThFuc.classList.add('pointer');

    $tableCont.append($table);
    $table.append($tableHead);
    $table.append($tableBody);
    $tableHead.append($tableHeadTr);

// ПОДГОТОВКА   
    function render (arrData) {
        $tableBody.innerHTML = ''                                
        let copyStudentList = [...arrData];

        function getAge (student) {          //РАСЧЕТ ВОЗРАСТА

            student.birthday = new Date (student.birthday);
            let age = today.getFullYear() - student.birthday.getFullYear();
            let month = today.getMonth() - student.birthday.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < student.birthday.getDate())) {
                age--;
            }
            return age;
        }

        function getPeriod (student) {          //РАСЧЕТ СРОКА ОБУЧЕНИЯ
            
            student.studyStart = new Date (student.studyStart);
            let period = today.getFullYear() - student.studyStart.getFullYear();
            let month = today.getMonth() - student.studyStart.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < student.studyStart.getDate())) {
                period--;
            }
            return period;
        }

        for (const student of copyStudentList) {           //ЗАПОЛНЯЕМ ТАБЛИЦУ
            student.birthday = new Date(student.birthday)
            student.fio = student.name + ' ' + student.surname + ' ' + student.lastname;
            student.fbd =`${getAge(student)} года/лет (${bMax(student.birthday)})`;
            
            if (getPeriod(student) <= 4) {
                student.studInfo = getPeriod(student) + ' ' + 'курс' + ',' + ' ' + student.studyStart.getFullYear() + '-' + today.getFullYear()
            } else {
                student.studInfo = student.studyStart.getFullYear() + '-' + endStud (student) + ',' + ' ' + 'закончил(а)'
            };
        }

        copyStudentList = copyStudentList.sort(function(a, b) {   //СОРТИРОВКА
            if (a[sortColumn] < b[sortColumn]) return -1;
        })

        if ($filterFIO.value.trim() !== '') {                    //ФИЛЬТРАЦИЯ
            copyStudentList = copyStudentList.filter(function(student) { 
                if (student.fio.includes($filterFIO.value.trim())) return true;
            })
        }

        if ($filterFuc.value.trim() !== '') {                    
            copyStudentList = copyStudentList.filter(function(student) { 
                if (student.faculty.includes($filterFuc.value.trim())) return true;
            })
        }

        if ($filterStartStud.value.trim() !== '') {                    
            copyStudentList = copyStudentList.filter(function(student) { 
                if (student.studyStart.getFullYear() == $filterStartStud.value) return true;
            })
        }

        if ($filterEndStud.value.trim() !== '') {                    
            copyStudentList = copyStudentList.filter(function(student) { 
                if (endStud (student) == $filterEndStud.value.trim()) return true;
            })
        }

        function endStud (student) {
            let end = student.studyStart.getFullYear() + 5;
            return end;
        }

        function createStudentTr (student) {
            const $studentTr = document.createElement('tr'),
            $studentFIO = document.createElement('th'),
            $studentAge = document.createElement('th'),
            $studentStage = document.createElement('th'),
            $studentFuc = document.createElement('th'),
            $studentDelete = document.createElement('th'),

            $deleteBtn = document.createElement('button');
            $deleteBtn.classList.add('btn', 'btn-danger', 'w-100')
            $deleteBtn.textContent = 'Удалить'

            $studentFIO.textContent = student.fio;
            $studentAge.textContent = student.fbd;
            $studentStage.textContent = student.studInfo;
            $studentFuc.textContent = student.faculty;

            $studentDelete.append($deleteBtn)
            $studentTr.append($studentFIO);
            $studentTr.append($studentAge);
            $studentTr.append($studentStage);
            $studentTr.append($studentFuc);
            $studentTr.append($studentDelete);
            
            $deleteBtn.addEventListener('click', async function () {
                await serverDeleteStudent(student.id);
                $studentTr.remove();
            })

            return $studentTr
        }

        for (const student of copyStudentList) {
            const $newTr = createStudentTr(student)
            $tableBody.append($newTr);     
        }
    }

    render(studentList)

    //ДОБАВЛЯЕМ СТУДЕНТИКОВ

    $form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if ($inputName.value.trim() == '' || $inputSurName.value.trim() == '' || $inputLastName.value.trim() == '' || 
            $inputBirthday.value.trim() == '' || $inputStartStud.value.trim() == '' || $inputFuc.value.trim() == '') {
            alert('Заполните все поля');
            return;
        }

        let newStudentObj = {
            name: $inputName.value,
            surname: $inputSurName.value,
            lastname: $inputLastName.value,
            birthday: new Date ($inputBirthday.value),
            studyStart: new Date ($inputStartStud.value),
            faculty: $inputFuc.value,
        }

        let serverStudentObj = await serverAddStudent(newStudentObj);
        console.log(serverStudentObj); 

        studentList.push(serverStudentObj)

        render(studentList)

    })

    //СОРТИРОВКА ПО КЛИКУ
    $tableHeadThFIO.addEventListener('click', function() {
        sortColumn = 'fio'
        render(studentList)
    })

    $tableHeadThAge.addEventListener('click', function() {
        sortColumn = 'fbd'
        render(studentList)
    })

    $tableHeadThStage.addEventListener('click', function() {
        sortColumn = 'studInfo'
        render(studentList)
    })

    $tableHeadThFuc.addEventListener('click', function() {
        sortColumn = 'faculty'
        render(studentList)
    })

    //фильтрация

    $filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
    })

    $filterFIO.addEventListener('input', function() {
        render(studentList)
    })

    $filterFuc.addEventListener('input', function() {
        render(studentList)
    })

    $filterStartStud.addEventListener('input', function() {
        render(studentList)
    })

    $filterEndStud.addEventListener('input', function() {
        render(studentList)
    })