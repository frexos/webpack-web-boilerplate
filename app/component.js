export default (text = 'Hello motherfuckers') => {
    const element = document.createElement('div');

    element.innerHTML = text;

    return element;
};