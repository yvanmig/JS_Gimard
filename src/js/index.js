import '../css/app.scss';
import Background from './background';
import Class from './quote';


class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new Background();
      // new Class();

    }
}

new App();
