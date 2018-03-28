import $ = require('jquery');
import angular = require('angular');
import {IScope, ITimeoutService} from "angular";

declare var tau:any; // From Tizen SDK

const moduleName = 'postRender';
export default moduleName
angular.module(moduleName, [])
    .directive(moduleName, ['$timeout', function($timeout: ITimeoutService) {
        return function (scope: IScope, element: any, attrs: any) {
                $timeout(function() {
                    const lists = $(element).parent(".ui-listview").get();
                    if (lists.length > 0) {
                        console.log("PostRender", lists[0]);
                        tau
                            .widget
                            // .SnapListview(document.querySelector(".ui-listview"))
                            .SnapListview(lists[0])
                            .refresh();
                    }
                }, 500);
            };
    }]);