
import angular = require('angular');

const moduleName = 'Directive';
export default moduleName;

import PostRender from "./PostRender";

angular.module(moduleName, [
    PostRender
]);