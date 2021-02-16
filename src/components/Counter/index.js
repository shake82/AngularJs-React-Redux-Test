import angular from 'angular';
import { reactToAngularComponent } from '../../services/AngularReactHelper';
import Counter from './presenter';

module.exports = angular.module('ngReactExample.statefulCounter', [
]).component('statefulCounter', reactToAngularComponent(Counter));
