export function restrict(target, template) {

    let props = Object.keys(template);
    for (const key in target) {
        if (!props.find(x => x === key)) {
            delete target[key];
        }
    }
    return target;
}

// [{},{}]
export function substract(target, ...sources) {
    let props = [];
   
    // 全てのプロパティ列挙
    // let props = sources.reduce((x, y) => x.concat(Object.keys(y)), []);
    sources.forEach(s => props = props.concat(Object.keys(s)));
    for (const key in target) {
        if (props.find(x => x === key)) {
            delete target[key];
        }
    }
    return target;
}