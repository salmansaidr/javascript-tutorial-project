const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
let perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('Timer Started!');
    },
    onTick() {
       circle.setAttribute('stroke-dashoffset', currentOffset);
       currentOffset = currentOffset - 1;
    },
    onComplete() {
        console.log('Timer is completed');
    }
});