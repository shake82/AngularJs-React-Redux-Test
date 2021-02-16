import angular from 'angular';
import store from './store/store';

const setupRoutes = ($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            resolve: {
                comments: (CommentService) => CommentService.queryComments(),
                authors: (AuthorService) => AuthorService.queryAuthors(),
            },
            controllerAs: '$ctrl',
            controller: function ($scope, $rootScope, comments) {
                console.log('$rootScope', $rootScope);
                this.comments = comments;
                $rootScope.store = store;
            },
            template: `
                <div style="padding:5px">
                    <h3>Hello World!</h3>
                    <div style="padding:5px">
                        <span>First Component with Redux</span>
                        <stateful-counter></stateful-counter>
                    </div>
                    <div style="padding:5px">
                        <span>Regular component</span>
                        <comment-list comments="$ctrl.comments"></comment-list>
                    </div>
                    <div style="padding:5px">
                        <span>Second Component with Redux</span>
                        <stateful-counter></stateful-counter>
                    </div>
                </div>
            `,
        });
};

const enableHtml5Mode = ($locationProvider) => {
    $locationProvider.html5Mode({ enabled: true });
};

module.exports = angular.module('ngReactExample', [
    require('angular-ui-router'),
    require('./services/CommentService').name,
    require('./services/AuthorService').name,
    require('./components/CommentList').name,
    require('./components/Counter').name,
])
    .config(enableHtml5Mode)
    .config(setupRoutes);

