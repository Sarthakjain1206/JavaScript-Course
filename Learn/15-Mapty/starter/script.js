'use strict';

class Workout {
    date = new Date();
    id = String(Date.now()).slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;       // [latitude, longitude]
        this.distance = distance;   // in KM
        this.duration = duration;   // in MINS
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
};

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/hr
        this.speed = this.distance / (this.duration / 60);
        return this.speed;

    }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1);

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        // Get user's position
        this._getPosition();

        // Get data from local Storage
        this._getLocalStorage();

        // Why we are binding function in this case ?
        // Remember that inside callback function of addEventListener this keyword points to the element on which we are listening to event.
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition() {
        //HEADLINE: Geolocation API 
        if (navigator.geolocation) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition(
                // this._loadMap,           // BUG
                this._loadMap.bind(this),   //FIXME
                function () {
                    alert("Could not get your position");
                }
            )
        }

    }

    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

        //HEADLINE: Displaying a map using Leaflet library
        /*
        * Go to https://leafletjs.com/download.html
        * ---Currently using hoisted version--- Include those links into index.html file
        */
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);
        //BUG: Initially if we do not bind _loadMap function to this keyword then we will get an error because this keyword is undefined. It is undefined because _loadMap() fn is being called by higher order function, we are not calling it ourself.
        // console.log(map);
        L.tileLayer(
            'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.#map);
        
        // Event handler of leaflet -- when user clicks on the map
        this.#map.on('click', this._showForm.bind(this));
        
        //INFO after getting data from local storage we might have data inside workouts array, so we are showing rendering markers on map once map is loaded.
        this.#workouts.forEach(work => this._renderWorkoutMarker(work))
        
    }

    _showForm(e) {
        this.#mapEvent = e;
        form.classList.remove('hidden');
        inputDistance.focus();    
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        form.style.display = 'none';        // to avoid animation of hidden property.
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) =>
        inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
          // preventing default behaviour of form submission i.e RELOADING
        e.preventDefault();
        
        // get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;
        // getting coordinates of position where user clicked on map
        const { lat, lng } = this.#mapEvent.latlng;

        // if activity is running, create a running object
        if (type === 'running') {
            const cadence = +inputCadence.value;    // convert it to Number type.
            // check if data is valid or not
            
            if (
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers');
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // if activity is cycling, create a cycling object
        if (type == 'cycling') {
            const elevation = +inputElevation.value;
            // check if data is valid or not
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert('Inputs have to be a positive number');
            
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // add new object to workout array
        this.#workouts.push(workout);
        
        // render workout on map as marker
        this._renderWorkoutMarker(workout);
        
        // render workout on list
        this._renderWorkout(workout);

        // hide form and clear input fields
        this._hideForm();

        // add this workout to local storage
        this._setLocalStorage();

    }

    _renderWorkoutMarker(workout) {
        // Creating marker at that particular position
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250, // All these properties are explained in leaflet documentation. https://leafletjs.com/reference-1.7.1.html#marker
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(`${workout.type === "running" ? '🏃‍♂️ ' : '🚴‍♀️ '}` + workout.description)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === "running" ? '🏃‍♂️ ' : '🚴‍♀️ '}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
                </li>
            `;

        }

        if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
                </li>
            `
        }
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        console.log(workoutEl);

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        // console.log(workout);

        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }
    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        //BUG:::: When we store the objects in local storage by converting it to strings and then we convert it back to object when we fetch the data from it.
        //BUG:::: In this state, we lose the prototypal inheritence properties from that object. After converting it just behaves as a simple regular object. you can verify it in console.
        const data = JSON.parse(localStorage.getItem('workouts'));
        // console.log(data);
        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => this._renderWorkout(work));
        
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
};


const app = new App();
// app.reset();