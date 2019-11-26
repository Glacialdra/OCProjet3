//JS pour slider

class Slider {
    constructor(eltImage) {
        this.eltImage = eltImage;
        this.eltNext = document.querySelector('.next');
        this.eltPrev = document.querySelector('.prev');
        this.picsTab = ['img/10.jpg', 'img/20.jpg', 'img/30.jpg'];
        this.init();
        this.count = 0;

    }


    init() {
        const intervalID = setInterval(() => this.next(), 5000);
        this.eltNext.addEventListener('click', () => this.next());
        this.eltPrev.addEventListener('click', () => this.prev());
        window.addEventListener('keydown', () => {
            if (event.key === 'ArrowLeft') {
                this.prev()
            }
            if (event.key === 'ArrowRight') {
                this.next()
            }
        });
        window.addEventListener('keydown', () => {
            if (event.key === ' ') {
                clearInterval(intervalID)
            }

        });
    };

    next() {
        this.count++;
        if (this.count >= this.picsTab.length) {
            this.count = 0
        };

        this.eltImage.src = this.picsTab[this.count];
    };

    prev() {

        this.count--;
        if (this.count < 0) {
            this.count = this.picsTab.length - 1
        };

        this.eltImage.src = this.picsTab[this.count];
    };


};

const slider1 = new Slider(document.querySelector('.slider'));