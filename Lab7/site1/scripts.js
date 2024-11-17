const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes')
const hoursElement = document.getElementById('hours')
const daysElement = document.getElementById('days')


const due= "30th October 2024";
const dueDate = new Date(due);
console.log(dueDate);

const currentDate = new Date();
console.log(currentDate);

let diffTime = (dueDate-currentDate)/1000;
console.log(diffTime)

let days = Math.floor(diffTime / (24 * 3600));
let hours = Math.floor(diffTime % (24 * 3600)/3600);
let minutes = Math.floor((diffTime % (24 * 3600)%3600)/60);
let seconds =  Math.floor((diffTime % (24 * 3600)%3600)%60);
console.log("hours",hours,"minutes",minutes,"seconds",seconds);

secondsElement.innerHTML = seconds;
minutesElement.innerHTML = minutes;
hoursElement.innerHTML = hours;
daysElement.innerHTML = days;

countDown()
function countDown()
{
   const currentDate = new Date();
console.log(currentDate);

let diffTime = (dueDate-currentDate)/1000;
console.log(diffTime)

let days = Math.floor(diffTime / (24 * 3600));
let hours = Math.floor(diffTime % (24 * 3600)/3600);
let minutes = Math.floor((diffTime % (24 * 3600)%3600)/60);
let seconds =  Math.floor((diffTime % (24 * 3600)%3600)%60);
console.log("hours",hours,"minutes",minutes,"seconds",seconds);

secondsElement.innerHTML = seconds;
minutesElement.innerHTML = minutes;
hoursElement.innerHTML = hours;
daysElement.innerHTML = days;
}
countDown()
setInterval(countDown(),1000)