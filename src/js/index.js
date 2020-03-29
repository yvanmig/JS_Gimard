import '../css/app.scss';
import Background from './background';
import Hero from './hero';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new Background();
      new Hero();

    }
}

new App();
