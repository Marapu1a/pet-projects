document.addEventListener('DOMContentLoaded', () => {

    //Открыть/закрыть модалку
    const openModal = () => document.getElementById('modalka').classList.add('open');
    const closeModal = () => document.getElementById('modalka').classList.remove('open');

    const crearModal = () => {
        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('second-name').value = '';

        document.getElementById('contacts-container').innerHTML = '';
    }

    document.getElementById('open-modalka').addEventListener('click', e => {
        e.preventDefault();

        openModal();
    })

    document.getElementById('close-modalka').addEventListener('click', e => {
        e.preventDefault();

        closeModal();
        crearModal();
    })

    //Добавление контактов
    let contactsCount = 0;

    const addContact = () => {
        if (contactsCount < 10) {
            const contactsContainer = document.getElementById('contacts-container'),
                contact = document.createElement('div'),
                contactItem = document.createElement('select'),
                contactInput = document.createElement('input'),
                deleteContactBtn = document.createElement('button');

            contactInput.placeholder = 'Введите значение';
            contact.classList.add('contact-item-container');

            deleteContactBtn.classList.add('delete-contact-btn')
            deleteContactBtn.innerHTML = `
            <svg width="20%" height="20%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2332 7.73332L21.2665 6.76665L14.4998 13.5333L7.73318 6.76668L6.76652 7.73335L13.5332 14.5L6.76654 21.2667L7.73321 22.2333L14.4998 15.4667L21.2665 22.2333L22.2332 21.2667L15.4665 14.5L22.2332 7.73332Z" fill="#B0B0B0"/>
            </svg>
            `

            contactItem.innerHTML = `
                <option>Телефон</option>
                <option>VK</option>
                <option>Facebook</option>
                <option>Email</option>
                <option>Другое</option>
            `;

            contact.append(contactItem, contactInput, deleteContactBtn);
            contactsContainer.append(contact);
            contactsCount++;

            deleteContactBtn.addEventListener('click', e => {
                e.preventDefault();

                contact.remove();
                contactsCount--;
            });

        } else {
            alert('Нельзя добавить больше 10 контактов')
        }
    }

    document.getElementById('add-contact').addEventListener('click', e => {
        e.preventDefault();

        addContact();
    })

    //Сохранение клиента на сервере и добавление в таблицу
    const clientData = () => {          //Получаем обьект клиента
        const name = document.getElementById('name').value,
            surname = document.getElementById('surname').value,
            lastName = document.getElementById('second-name').value;

        if (!name) {
            alert('Введите имя')
            return null;
        }

        if (!surname) {
            alert('Введите фамилию')
            return null;
        }

        if (!lastName) {
            alert('Введите отчество')
            return null;
        }

        const contactItem = document.getElementById('contacts-container')
            .querySelectorAll('.contact-item-container');

        let contacts = [];

        contactItem.forEach(contact => {
            const type = contact.querySelector('select').value,
                value = contact.querySelector('input').value;

            if (value) {
                contacts.push({ type, value })
            } else {
                alert('Введите значение');
                return null;
            }
        })

        return {
            name,
            surname,
            lastName,
            contacts,
        }
    }

    const addClientToServer = async client => {     //Загружаем обьект клиента на сервер
        const clientData = await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client),
        })

        const data = await clientData.json();

        return data;   //Возвращаем обьект клиента уже с сервера с ID, временем создания и изменения
    }

    // Добавляем клиента в таблицу
    let clientIdCount = 1;
    const addClientToTable = client => {
        const clientRow = document.createElement('tr');

        const contactsHTML = client.contacts.map(contact => {
            let icon, tooltipText;

            switch (contact.type) {
                case 'Телефон':
                    icon = `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.7">
                                <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                                <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                                </g>
                            </svg>
                    `;
                    tooltipText = `Телефон: ${contact.value}`;
                    break;
                case 'Email':
                    icon = `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
                            </svg>
                    `;
                    tooltipText = `Email: ${contact.value}`;
                    break;
                case 'VK':
                    icon = `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.7">
                                <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
                                </g>
                            </svg>
                    `;
                    tooltipText = `VK: ${contact.value}`;
                    break;
                case 'Facebook':
                    icon = `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.7">
                                <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
                                </g>
                            </svg>
                    `;
                    tooltipText = `Facebook: ${contact.value}`;
                    break;
                default:
                    icon = `
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
                            </svg>
                    `;
                    tooltipText = `${contact.type}: ${contact.value}`;
            }

            return `
            <span class="contact-icon" data-tooltip="${tooltipText}">
                ${icon}
            </span>
        `;
        }).join(''); // Преобразуем массив в строку

        const formatDate = (dateString) => { // Читаемый формат времени
            const date = new Date(dateString);
            return date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        };

        clientRow.innerHTML = `
            <td>${clientIdCount}</td>
            <td>${client.name} ${client.surname} ${client.lastName}</th>
            <td>${formatDate(client.createdAt)}</td>
            <td>${formatDate(client.updatedAt)}</td>
            <td class="tooltip-container">${contactsHTML}</td>
            <td>
                <button class="edit-btn" data-id="${client.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.7" clip-path="url(#clip0_121_2458)">
                        <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_121_2458">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>    
                    Изменить
                </button>
                <button class="delete-btn" data-id="${client.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.7" clip-path="url(#clip0_121_2468)">
                        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_121_2468">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    Удалить
                </button>
            </td>
        `

        document.getElementById('clients-list').append(clientRow);
        clientIdCount++;
    }

    let editingClientId = null;

    document.getElementById('save-client').addEventListener('click', async function (e) {
        e.preventDefault();

        const client = clientData(); // Собираем данные клиента

        if (!client) return; // Если данные невалидны, выходим

        if (editingClientId === null) {
            // Создаем нового клиента
            const result = await addClientToServer(client);
            addClientToTable(result);
        } else {
            // Обновляем существующего клиента
            await fetch(`http://localhost:3000/api/clients/${editingClientId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client) // Отправляем новые данные
            });
        }

        // Сбрасываем переменную и закрываем модалку
        editingClientId = null;
        closeModal();
    });

    const tableRender = () => {
        const data = fetch('http://localhost:3000/api/clients')
            .then(res => res.json())
            .then(res => res.map(item => addClientToTable(item)))

        return data;
    }

    // Кнопка "Удалить"
    document.getElementById('clients-list').addEventListener('click', async e => {
        e.preventDefault();

        if (e.target.classList.contains('delete-btn')) {
            const conf = confirm('Удалять?');

            if (conf) {
                const clientId = e.target.dataset.id;

                await fetch(`http://localhost:3000/api/clients/${clientId}`, {
                    method: 'DELETE',
                })

                e.target.closest('tr').remove();
            }
        }
    })

    // Кнопка "Изменить"
    document.getElementById('clients-list').addEventListener('click', async function (e) {
        e.preventDefault();

        if (e.target.classList.contains('edit-btn')) {
            const clientId = e.target.getAttribute('data-id');

            // Загружаем данные клиента
            const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
            const clientData = await response.json();

            // Заполняем поля модалки
            document.getElementById('name').value = clientData.name;
            document.getElementById('surname').value = clientData.surname;
            document.getElementById('second-name').value = clientData.lastName;

            // Очищаем и заполняем контакты
            const contactsContainer = document.getElementById('contacts-container');
            contactsContainer.innerHTML = ''; // Очищаем контейнер контактов
            contactsCount = 0; // Сбрасываем счетчик контактов
            clientData.contacts.forEach(function (contact) {
                addContact();
                const lastContact = contactsContainer.lastElementChild;
                lastContact.querySelector('select').value = contact.type;
                lastContact.querySelector('input').value = contact.value;
            });

            // Открываем модальное окно для редактирования
            openModal();

            // Устанавливаем clientId в переменную
            editingClientId = clientId;
        }
    });

    //Сортируем всякое
    const table = document.getElementById('client-table'); // Таблица
    const headers = table.querySelectorAll('th[data-sortable="true"]'); // Заголовки, которые можно сортировать
    let currentSortDirection = 'asc'; // Направление сортировки: 'asc' (по возрастанию) или 'desc' (по убыванию)
    let currentKey = 'id';
    const arrows = Array.from(document.querySelectorAll('.sort-icon')); // Массив всех иконок сортировки

    // Функция для преобразования времени обратно в объект Date состряпанная GPT
    function parseLocaleDate(dateString) {
        const [datePart, timePart] = dateString.split(', ');
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    }

    // Универсальная функция для сортировки по разным типам данных
    function sortTable(columnKey, direction) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Сортируем строки в зависимости от ключа
        rows.sort((rowA, rowB) => {
            let valA, valB;

            // Получаем значения в зависимости от типа столбца
            switch (columnKey) {
                case 'id':
                    valA = parseInt(rowA.cells[0].textContent);
                    valB = parseInt(rowB.cells[0].textContent);
                    break;
                case 'fio':
                    valA = rowA.cells[1].textContent.toLowerCase();
                    valB = rowB.cells[1].textContent.toLowerCase();
                    break;
                case 'created':
                case 'edited':
                    // Преобразуем строку с датой обратно в объект Date для сортировки
                    valA = parseLocaleDate(rowA.cells[columnKey === 'created' ? 2 : 3].textContent);
                    valB = parseLocaleDate(rowB.cells[columnKey === 'created' ? 2 : 3].textContent);
                    break;
                default:
                    return 0;
            }

            // Сравнение значений
            if (direction === 'asc') {
                return valA > valB ? 1 : -1;
            } else {
                return valA < valB ? 1 : -1;
            }
        });

        // Очищаем старые строки и добавляем отсортированные
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }

    // Функция для сброса всех иконок сортировки
    function resetSortIcons() {
        arrows.forEach(icon => {
            console.log(icon.querySelector('svg'))
            icon.querySelector('svg').classList.remove('rotated')
        });
    }

    // Обрабатываем клик на любой из заголовков
    headers.forEach((header) => {
        header.addEventListener('click', (e) => {

            // Находим ближайший svg элемент, избегаем ошибки с null
            const svgIcon = e.target.closest('svg');
            if (svgIcon) {
                const isRotated = svgIcon.classList.contains('rotated');
                if (!isRotated) {
                    resetSortIcons();
                    svgIcon.classList.toggle('rotated');
                } else {
                    svgIcon.classList.toggle('rotated');
                }

                // Определение ключа столбца для сортировки
                const columnKey = header.getAttribute('data-key');
                if (currentKey === columnKey) {
                    // Переключаем направление сортировки, если кликаем по тому же столбцу
                    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    // По умолчанию сортируем по возрастанию, если кликаем по новому столбцу
                    currentSortDirection = 'asc';
                    currentKey = columnKey;
                }

                // Сортируем таблицу по выбранному столбцу
                sortTable(columnKey, currentSortDirection);
            }
        });
    });

    // Функция для обновления данных таблицы
    function updateTableWithClients(clients) {
        const tbody = document.getElementById('clients-list');
        tbody.innerHTML = ''; // Очищаем таблицу

        clientIdCount = 1; // Сбрасываем счетчик перед рендерингом

        clients.forEach(client => addClientToTable(client)); // Добавляем клиентов с новыми ID
    }
    //Поиск по таблице
    const searchInput = document.getElementById('search');
    let searchTimeout = null;

    searchInput.addEventListener('input', e => {
        e.preventDefault();

        const query = e.target.value.trim();

        // Сбрасываем предыдущий таймер
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Устанавливаем новый таймер на 300 мс
        searchTimeout = setTimeout(async () => {
            // Если поле поиска пустое, загружаем все данные
            if (query === '') {
                const response = await fetch('http://localhost:3000/api/clients');
                const data = await response.json();
                updateTableWithClients(data); // Рендерим всех клиентов
            } else {
            // Делаем запрос к API с введённым поисковым запросом
                const response = await fetch(`http://localhost:3000/api/clients?search=${encodeURIComponent(query)}`);
                const data = await response.json();
                updateTableWithClients(data); // Рендерим найденных клиентов
            }
        }, 300); // Задержка 300 мс
    });

    sortTable('id', 'asc');
    tableRender();
});
