// Project developed by Samuel Alberts
// University of Advancing Technology
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton'); 
	// The main functionality of the application running. it's CONSTANTLY RUNNING. But, this is mainly sharing functionality of the buttons to switch the start button on when the stop button is off and vice versa.

    const stopButton = document.getElementById('stopButton');
    const memeImage = document.getElementById('memeImage');
    const audio = document.getElementById('audio');
    let intervalId = null;
// start button functionality which uses an event listener as to whether or not a person clicks on the button. The start 
    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        stopButton.disabled = false;
        startMoving(); // the event happening when the button is clicked
    });
// stop button works when the start button is turned off and vice versa.
    stopButton.addEventListener('click', () => {
        startButton.disabled = false; // stop button starts with being enabled
        stopButton.disabled = true; 
        stopMoving(); // when the button is clicked this function stops the meme.
	audio.pause(); // pause audio when pressed.
    });
// the start moving function has a constant arrow. but it simply starts the "meme dance" when the function is called when the button on the screen is pressed.
    const startMoving = () => {
        intervalId = setInterval(() => { //intervalId = setInterval(); set interval is a function that has a pause when the function starts running. the Aarows above say to constantly call this function when the button is pressed for the meme to start moving. Below the memeImage is called from the styles.css sheet and implemented into the random interval to move across the screen at random stretches or intervals.
            memeImage.style.top = `${Math.random() * (window.innerHeight - 500)}px`; // calculating a random vertical position for the Memes movement. "-500px" to stay inside the screen!
            memeImage.style.left = `${Math.random() * (window.innerWidth - 500)}px`; // calculating the memes horizontal movement with the random stretch/interval. "-500px" to stay inside the screen!
		
		
            audio.play(); // the audio plays from the beginning of the function when the button is pressed.
        }, 1000); // this is the set interval for 1000 miliseconds for the setinterval function. So every 1000 miliseconds the image will move randomly rotating between vertical and horizontal movements.
    };
// this function stops the event! -- and stops the music with the event.
    const stopMoving = () => {
        clearInterval(intervalId);
        audio.pause();
        audio.currentTime = 0; // Reset audio to start
    };
});
// https://dev.to/daveguz97/adding-sound-to-a-react-project-51m3
// if someone would want to find the video to the background music, it is located at the link below
// https://youtu.be/ZgzPSw95MOQ
// the first import would be the React API which is part of the initialization of the evironment
