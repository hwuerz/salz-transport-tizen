
import angular = require('angular');

const moduleName = 'Controller';
export default moduleName;

import DepartureController from "./DepartureController";
import NearController from "./NearController";

angular.module(moduleName, [
    DepartureController,
    NearController
]);