class Reservation {
    constructor() {
        this.interval;
        this.display();
    }

    reservation() {

        this.localPrenom = localStorage.getItem('userPrenom');
        this.localNom = localStorage.getItem('userNom');
        if (this.localPrenom === null) {
            this.localPrenom = ""
        };
        if (this.localNom === null) {
            this.localNom = ""
        };

        document.getElementById('reserver').innerHTML =

            `<form>
        <p><label for="nom">Votre nom :</label>  <input type="text" name="nom" id="nom" value= "${this.localNom}" required/></p>
        <p><label for="prenom">Votre prénom :</label>  <input type="text" name="prenom" id="prenom" value= "${this.localPrenom}" required/></p>
        <input type="button" value="Confirmer" id="btn_confirmation" />  
    </form>`;
        canvasContainer.style.display = 'flex';
        document.getElementById('btn_confirmation').addEventListener('click', () => this.confirm());

    };

    confirm() {
        this.sigData = (document.getElementById('my-canvas').toDataURL());
        this.blankData = (document.getElementById('blank').toDataURL());

        if (document.getElementById('nom').value === "" || document.getElementById('prenom').value === "" || this.sigData === this.blankData) {
            alert("Veuillez indiquer vos nom, prénom et signer");
        } else {
            localStorage.setItem('userPrenom', document.getElementById('prenom').value);
            localStorage.setItem('userNom', document.getElementById('nom').value);
            sessionStorage.setItem('stationName', document.getElementById('station-nom').innerText);
            sessionStorage.setItem('timeStamp', Date.now());
            this.display();
        }
    };

    display() {
        this.timeStamp = sessionStorage.getItem('timeStamp');
        if (this.timeStamp) {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.elapsedTime(this.timeStamp), 1000);
        }
    };
    elapsedTime(value) {
        this.secondsLeft = (1200 - (Date.now() - value) / 1000);
        this.minutes = Math.floor(this.secondsLeft / 60);
        this.seconds = Math.floor(this.secondsLeft % 60);
        this.nameDisplay = sessionStorage.getItem('stationName');
        if (this.minutes <= 0 && this.seconds <= 0) {
            clearInterval(this.interval);
            document.getElementById('reservationText').innerHTML = "<p>Réservation expirée !</p>"
        } else if (this.minutes === 0) {
            document.getElementById('reservationText').innerHTML = `<p>${this.seconds} secondes restantes sur votre réservation à ${this.nameDisplay}`;
        } else {
            document.getElementById('reservationText').innerHTML = `<p>${this.minutes} minutes et ${this.seconds} secondes restantes sur votre réservation à ${this.nameDisplay}`;
        }
    };

};


const resa = new Reservation();