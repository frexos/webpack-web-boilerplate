import $ from 'jquery';

export default (text = 'Say Hello to my little friend: rat-ta-ta-ta-ta-ta') => {
    const element = document.createElement('div');

    element.className = 'fa fa-hand-spock-o fa-1g';
    element.innerHTML = text;

    return element;
};

$(document).ready(function() {
    console.log('hey');
});