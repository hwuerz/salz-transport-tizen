
import angular = require('angular');
import {Helper} from "../Helper";
import {Near} from "../model/Near";

declare var tau:any; // From Tizen SDK

interface IMainScope extends angular.IScope {
    error: string;
}

export class MainController {

    static $inject = ['$scope'];
    constructor(
        private $scope: IMainScope
    ) {
        this.$scope.error = "";
    }


}

const moduleName = 'MainController';
export default moduleName
angular.module(moduleName, [])
    .controller(moduleName, MainController);