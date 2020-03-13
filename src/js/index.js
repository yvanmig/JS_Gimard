import '../css/app.scss';
import Background from './background';


class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new Background();

    }
}

new App();
