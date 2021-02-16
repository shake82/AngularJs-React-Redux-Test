import angular from 'angular';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { mapValues } from 'lodash';

function render(element, Component, props, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Component { ...props } />
        </Provider>,
        element,
    );
}

function toBindings(propTypes) {
    return mapValues(propTypes, () => '<');
}

function toProps(propTypes, controller) {
    return mapValues(propTypes, (val, key) => {
        return controller[key];
    });
}

export function getAngularService(document, name) {
    const injector = angular.element(document.body).injector() || {};
    return injector.get(name);
}

export function reactToAngularComponent(Component) {
    const { propTypes = {} } = Component;
    const bindings = toBindings(propTypes);
    return {
        bindings: bindings,
        controller: /*@ngInject*/ function controller($scope, $rootScope, $element) {
            this.$onChanges = () => render($element[0], Component, toProps(propTypes, this), $rootScope.store);
            this.$onDestroy = () => ReactDOM.unmountComponentAtNode($element[0]);
        },
    };
}

