import column from "./gooal-column";

function chartsInitialization(dom, options) {
    column(dom, options);
}

export default function (dom, options) {
    return chartsInitialization(dom, options);
}