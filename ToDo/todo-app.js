(function() {
    let deals = [];
    console.log(deals)

    function updateLocal(listname) {
        localStorage.setItem(listname, JSON.stringify(deals))
    }

    //создаем и возвращаем заголовок приложения
    function createAppTitle (title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList () {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem (task_obj, listname) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
    
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = task_obj.name;
        updateLocal (listname);

        if (task_obj.done)
            item.classList.add( 'list-group-item-success');

        item.id = task_obj.id;
    
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';
    
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        
        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title, listname) {
    
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
    
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        deals = JSON.parse(localStorage.getItem(listname));
        console.log(deals);

        if (deals) {
            for (let deal of deals) {
                let item = createTodoItem({id: deal.id, name: deal.name, done: deal.done}, listname);

                item.doneButton.addEventListener('click', function () {
                    item.item.classList.toggle('list-group-item-success');
                    deals.map(el=>el.id === Number(item.item.id) ? el.done = !el.done : null);
                    updateLocal(listname);
                });

                item.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        deals = deals.filter(el => el.id !== Number(item.item.id));
                        item.item.remove();
                        updateLocal(listname);
                    }
                });

                todoList.append(item.item);
            }
        }
        else{
            deals = []
        }

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let i = 0;
            if(deals){
                for(let deal of deals){
                    if (deal.id > i)
                        i = deal.id;
                }
            }

            deals.push({id: i + 1, name: todoItemForm.input.value, done: false});

            let item = createTodoItem({id: i, name: todoItemForm.input.value, done: false}, listname);

            item.doneButton.addEventListener('click', function () {
                item.item.classList.toggle('list-group-item-success');
                deals.map(el => el.done = !el.done);
                updateLocal(listname);
            });

            item.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    deals = deals.filter(el => el.id !== Number(item.item.id));
                    item.item.remove();
                    updateLocal(listname);
                }
            });

            todoList.append(item.item);

            todoItemForm.input.value = '';
        });
    }

    window.createTodoApp = createTodoApp;
})();

