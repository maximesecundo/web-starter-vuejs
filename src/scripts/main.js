import gsap from 'gsap';
import Vue from 'vue';
import Router from '../core/router';
import App from '../containers/Application/App';
console.log(Router);
new Vue({
  Router,
  el: document.querySelector('#app'),
  render: h => h(App),
});
