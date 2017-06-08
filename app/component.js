export default (text = 'Say Hello to my little friend: rat-ta-ta-ta-ta-ta') => {
    const element = document.createElement('div');

    element.innerHTML = text;

    return element;
};