function openFeatures() {
    let allElems = document.querySelectorAll('.elem');
    let fullElemPage = document.querySelectorAll('.fullElem');
    let fullElemPageBackBtn = document.querySelectorAll('.fullElem .back');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block';
        });
    });

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none';
        });
    });
}
openFeatures();

function todoList() {
    let currentTask = [];
    let savedTasks = localStorage.getItem('currentTask');
    if (savedTasks) {
        currentTask = JSON.parse(savedTasks);
    }

    function renderTask() {
        let allTask = document.querySelector('.allTask');
        let sum = '';
        currentTask.forEach(function (elem, idx) {
            sum = sum + '<div class="task"><h5>' + elem.task + ' <span class="' + elem.imp + '">imp</span></h5><button id="' + idx + '">Mark as Completed</button></div>';
        });
        allTask.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        let buttons = document.querySelectorAll('.task button');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1);
                renderTask();
            });
        });
    }
    renderTask();

    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form #task-input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckbox = document.querySelector('.addTask form #check');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked
        });
        renderTask();
        taskCheckbox.checked = false;
        taskInput.value = '';
        taskDetailsInput.value = '';
    });
}
todoList();

function dailyPlanner() {
    let dayPlanner = document.querySelector('.day-planner');
    let savedDataStr = localStorage.getItem('dayPlanData');
    let dayPlanData = {};
    if (savedDataStr) {
        dayPlanData = JSON.parse(savedDataStr);
    }

    let hours = [
        "6:00 - 7:00", "7:00 - 8:00", "8:00 - 9:00", "9:00 - 10:00", 
        "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", 
        "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", 
        "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", 
        "22:00 - 23:00", "23:00 - 24:00"
    ];

    let wholeDaySum = '';
    hours.forEach(function (elem, idx) {
        let savedData = dayPlanData[idx] || '';
        wholeDaySum = wholeDaySum + '<div class="day-planner-time"><p>' + elem + '</p><input id="' + idx + '" type="text" placeholder="..." value="' + savedData + '"></div>';
    });
    dayPlanner.innerHTML = wholeDaySum;

    let inputs = document.querySelectorAll('.day-planner input');
    inputs.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        });
    });
}
dailyPlanner();

function motivationalQuote() {
    let motivationQuoteContent = document.querySelector('.motivation-2 h1');
    let motivationAuthor = document.querySelector('.motivation-3 h2');

    async function fetchQuote() {
        try {
            let response = await fetch('https://dummyjson.com/quotes/random');
            let data = await response.json();
            motivationQuoteContent.innerHTML = data.quote;
            motivationAuthor.innerHTML = data.author;
        } catch (e) {
            motivationQuoteContent.innerHTML = "Do or do not. There is no try.";
            motivationAuthor.innerHTML = "Yoda";
        }
    }
    fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1');
    let startBtn = document.querySelector('.pomo-timer .start-timer');
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer');
    let resetBtn = document.querySelector('.pomo-timer .reset-timer');
    let session = document.querySelector('.pomodoro-fullpage .session');
    let isWorkSession = true;
    let totalSeconds = 25 * 60;
    let timerInterval = null;

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let minStr = String(minutes);
        let secStr = String(seconds);
        if (minStr.length < 2) {
            minStr = '0' + minStr;
        }
        if (secStr.length < 2) {
            secStr = '0' + secStr;
        }
        timer.innerHTML = minStr + ':' + secStr;
    }

    function startTimer() {
        clearInterval(timerInterval);
        if (isWorkSession) {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimer();
                } else {
                    isWorkSession = false;
                    clearInterval(timerInterval);
                    timer.innerHTML = '05:00';
                    session.innerHTML = 'Take a Break';
                    session.style.backgroundColor = 'var(--blue)';
                    totalSeconds = 5 * 60;
                }
            }, 10);
        } else {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimer();
                } else {
                    isWorkSession = true;
                    clearInterval(timerInterval);
                    timer.innerHTML = '25:00';
                    session.innerHTML = 'Work Session';
                    session.style.backgroundColor = 'var(--green)';
                    totalSeconds = 25 * 60;
                }
            }, 10);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        totalSeconds = 25 * 60;
        clearInterval(timerInterval);
        updateTimer();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}
pomodoroTimer();

function weatherFunctionality() {
    let apiKey = null;
    let city = 'Bikaner';

    let header1Time = document.querySelector('.header1 h1');
    let header1Date = document.querySelector('.header1 h2');
    let header2Temp = document.querySelector('.header2 h2');
    let header2Condition = document.querySelector('.header2 h4');
    let precipitation = document.querySelector('.header2 .precipitation');
    let humidity = document.querySelector('.header2 .humidity');
    let wind = document.querySelector('.header2 .wind');

    async function weatherAPICall() {
        try {
            if (!apiKey) {
                throw new Error("Missing Key");
            }
            let response = await fetch('http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city);
            if (!response.ok) {
                throw new Error("Failed request");
            }
            let data = await response.json();
            header2Temp.innerHTML = data.current.temp_c + '°C';
            header2Condition.innerHTML = data.current.condition.text;
            wind.innerHTML = 'Wind: ' + data.current.wind_kph + ' km/h';
            humidity.innerHTML = 'Humidity: ' + data.current.humidity + '%';
            precipitation.innerHTML = 'Heat Index : ' + data.current.heatindex_c + '%';
        } catch (error) {
            header2Temp.innerHTML = "36°C";
            header2Condition.innerHTML = "Sunny";
            wind.innerHTML = "Wind: 12 km/h";
            humidity.innerHTML = "Humidity: 30%";
            precipitation.innerHTML = "Precipitation: 5%";
        }
    }
    weatherAPICall();

    function timeDate() {
        let totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();
        let dayOfWeek = totalDaysOfWeek[date.getDay()];
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let tarik = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();

        header1Date.innerHTML = tarik + ' ' + month + ', ' + year;

        let hourStr = String(hours);
        let minStr = String(minutes);
        let secStr = String(seconds);
        if (hourStr.length < 2) hourStr = '0' + hourStr;
        if (minStr.length < 2) minStr = '0' + minStr;
        if (secStr.length < 2) secStr = '0' + secStr;

        if (hours > 12) {
            let pmHours = hours - 12;
            let pmHoursStr = String(pmHours);
            if (pmHoursStr.length < 2) pmHoursStr = '0' + pmHoursStr;
            header1Time.innerHTML = dayOfWeek + ', ' + pmHoursStr + ':' + minStr + ':' + secStr + ' PM';
        } else {
            header1Time.innerHTML = dayOfWeek + ', ' + hourStr + ':' + minStr + ':' + secStr + ' AM';
        }
    }

    setInterval(function () {
        timeDate();
    }, 1000);
}
weatherFunctionality();

function changeTheme() {
    let theme = document.querySelector('.theme');
    let rootElement = document.documentElement;
    let flag = 0;

    theme.addEventListener('click', function () {
        if (flag === 0) {
            rootElement.style.setProperty('--pri', '#292524');
            rootElement.style.setProperty('--sec', '#fafaf9');
            rootElement.style.setProperty('--tri1', '#d97706');
            rootElement.style.setProperty('--tri2', '#ffffff');
            rootElement.style.setProperty('--border', 'rgba(0, 0, 0, 0.08)');
            flag = 1;
        } else if (flag === 1) {
            rootElement.style.setProperty('--pri', '#f8fafc');
            rootElement.style.setProperty('--sec', '#0a0e17');
            rootElement.style.setProperty('--tri1', '#00b4d8');
            rootElement.style.setProperty('--tri2', '#172030');
            rootElement.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
            flag = 0;
        }
    });
}
changeTheme();

function dailyGoals() {
    let goalsContainer = document.querySelector('.allGoals');
    let goalForm = document.getElementById('goal-form');
    let goalInput = document.getElementById('goal-input');
    let currentGoals = [];

    let savedGoals = localStorage.getItem('currentGoals');
    if (savedGoals) {
        currentGoals = JSON.parse(savedGoals);
    }

    function renderGoals() {
        let sum = '';
        currentGoals.forEach(function (elem, idx) {
            let completedClass = '';
            if (elem.completed) {
                completedClass = 'completed';
            }
            let checkedAttr = '';
            if (elem.completed) {
                checkedAttr = 'checked';
            }
            sum = sum + '<div class="goal-item"><div class="goal-item-left ' + completedClass + '" id="goal-left-' + idx + '"><input type="checkbox" id="check-' + idx + '" ' + checkedAttr + '><span>' + elem.text + '</span></div><button class="delete-goal-btn" id="del-goal-' + idx + '"><i class="ri-delete-bin-line"></i></button></div>';
        });

        goalsContainer.innerHTML = sum;
        localStorage.setItem('currentGoals', JSON.stringify(currentGoals));

        currentGoals.forEach(function (elem, idx) {
            let leftEl = document.getElementById('goal-left-' + idx);
            if (leftEl) {
                leftEl.addEventListener('click', function () {
                    currentGoals[idx].completed = !currentGoals[idx].completed;
                    renderGoals();
                });
            }

            let delBtn = document.getElementById('del-goal-' + idx);
            if (delBtn) {
                delBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    currentGoals.splice(idx, 1);
                    renderGoals();
                });
            }
        });
    }

    if (goalForm) {
        goalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (goalInput.value.trim() === '') {
                return;
            }
            currentGoals.push({
                text: goalInput.value.trim(),
                completed: false
            });
            renderGoals();
            goalInput.value = '';
        });
    }

    renderGoals();
}
dailyGoals();