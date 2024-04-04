let display_hours = document.getElementById("time-hours");
let display_mins = document.getElementById("time-mins");
let display_secs = document.getElementById("time-secs");
let display_period = document.getElementById("time-period");

//Action to be performed when the page loads..
window.addEventListener("load", function() {
    this.document.getElementById("alarmList").innerHTML = `<p>No Alarms Set Yet!!</p>`
});

let alarmList = [];
let alarmRinging = false;

//function to add zero in front of single digit numbers..
function addZero(num){
    return num<10 ? `0${num}` : num;
}
//function to make the watch 12 hours format..
function addZeroH(num){
    if(num==12){
        num=12;
    }else{
        num=num%12;
    }
    return num<10 ? `0${num}` : num;
}
//setInterval method to perform operations on each time frame..
setInterval(()=>{
    let date = new Date();
    let timeHr = addZeroH(addZero(date.getHours()));
    let timeMin = addZero(date.getMinutes());
    let timeSec = addZero(date.getSeconds());
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    display_hours.textContent = timeHr;
    display_mins.textContent = timeMin;
    display_secs.textContent = timeSec;
    display_period.textContent = ampm;

    alarmList.forEach(alarm => {
        if (parseInt(alarm.hour) === parseInt(timeHr) && parseInt(alarm.minutes) === parseInt(timeMin) && alarm.period === ampm) {
            // console.log("Alarm ringing!");
            let alarmSound = document.getElementById('alarmSound');
            if(!alarmRinging){
                alarmRinging = true;
                alarmSound.play();
                setTimeout(()=>{
                    alarmRinging=false;
                },59000)
            }
        }
    });
},1000);
//function to delete an alarm from the alarm list..
function deleteAlarm(index){
    console.log("alarm deleted");
    alarmList.splice(index, 1);
    renderAlarms();
    console.log(alarmList);
}
//function to check the inputs given to set the alarm
function checkAlarm(hr, min, newAlarmTime){
    if(hr<1 || hr>12 || min<0 || min>59){
        alert("Alarm not set properly... Please set the correct values")
    }else{
        alarmList.push(newAlarmTime);
        renderAlarms();
    }
}
//function to display the list of alarms..
function renderAlarms(){
    let parentDiv = document.getElementById("alarmList");
    parentDiv.innerHTML='';

    alarmList.forEach((alarm,index)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div id="listItem">
                <p>${alarm.hour}:${alarm.minutes} ${alarm.period}</p>
                <button onclick="deleteAlarm(${index})">Delete</button>
            </div>
        `
        parentDiv.appendChild(newDiv);
    })
    if(alarmList.length <= 0){
        document.getElementById("alarmList").innerHTML = `<p>No Alarms Set Yet!!</p>`
    }
}
//function for setting an alarm..
function setAlarm(){
    console.log("alarm set");
    let hr = document.getElementById("hr").value;
    let setHr = hr.length<2 ? addZero(hr) : hr;
    let min =document.getElementById("min").value;
    let setMin = min.length<2 ? addZero(min) : min;
    let period = document.getElementById("mySelect").value;
    let newAlarmTime = {hour:setHr, minutes:setMin, period:period};
    checkAlarm(setHr, setMin, newAlarmTime);
    console.log(alarmList);
    document.getElementById("hr").value='';
    document.getElementById("min").value='';
}