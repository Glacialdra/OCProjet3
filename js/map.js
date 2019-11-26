class Map {
    constructor() {
        this.mymap = L.map('mapid').setView([49.44313, 1.09932], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZ3VpdnJlIiwiYSI6ImNrMGdsaWNtdDAwdTYzYnFsZTl2amczenIifQ.uJAEA50LPY46UuIf-xmT9g'
        }).addTo(this.mymap);
        this.colonneNom = document.getElementById('station-nom');
        this.colonneAdresse = document.getElementById('station-adresse');
        this.colonneStatut = document.getElementById('station-statut');
        this.colonneDispo = document.getElementById('station-dispo');
        this.colonneStands = document.getElementById('stands-dispo');
        this.boutonReserver = document.getElementById('reserver');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.stationsData();
    }

    displayStationInfos(velibStation) {

        this.colonneNom.innerHTML = velibStation.name;
        this.colonneAdresse.innerHTML = velibStation.address;
        this.colonneStatut.innerHTML = velibStation.status;
        this.colonneDispo.innerHTML = velibStation.available_bikes;
        this.colonneStands.innerHTML = velibStation.available_bike_stands;

        //velibStation.status = 'CLOSED'; 
        //velibStation.available_bikes = 0;


        if (velibStation.status !== 'OPEN') {
            this.boutonReserver.innerHTML = '<p id="errorStation">Station hors-service</p>';
        } else if (velibStation.available_bikes === 0) {
            this.boutonReserver.innerHTML = '<p id="errorStation">Pas de vélo disponible</p>';
        } else {
            this.boutonReserver.innerHTML = '<input type="submit" id="btn-reserv" class="btn" value="Réserver">';
        };

        document.getElementById('selection-station').innerHTML = '<th colspan="2" class="header-station">Station sélectionnée</th>';
        document.getElementById('btn-reserv').addEventListener('click', () => resa.reservation());
        canvasContainer.style.display = 'none';
    };

    stationsData = async () => {
        this.response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=c81998956a920064fd59d43c95a36c9f0c269c68');
        this.data = await this.response.json();
        this.data.map(station => {
            this.marker = new L.marker(station.position).addTo(this.mymap);
            this.marker.on('click', () => this.displayStationInfos(station));

        })
    };
}

const map = new Map();