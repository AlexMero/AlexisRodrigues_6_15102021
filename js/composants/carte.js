let props;
const DOM = document.createElement("article");
DOM.onclick = click;

// @ts-ignore
// DOM.onclick= ()=>window.changePage("12");

/**
 * [constructor description]
 *
 * @param   {Object}  properties      [properties description]
 * @param   {String}  properties.title
 * @param   {String}  properties.description
 * @param   {HTMLElement}  domTarget  [domTarget description]
 * @returns {void}
 */
export function carte(properties, domTarget) {
    props = properties;
    domTarget.appendChild(DOM);
    render();
}

function render() {
    DOM.innerHTML = `
        <h2 aria-label="">${props.title}</h2>
        <p>${props.description}</p>
        `;
}

function click() {
    props.title = "testTitle";
    render();
}