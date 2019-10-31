export function toType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

export function getStringValue(value) {
    let ret = null;

    switch (toType(value)) {
        case 'array':
        case 'object':
            ret = JSON.stringify(value);
            break;
        case 'boolean':
        case 'string':
        case 'number':
        default:
            ret = String(value);
            break;
    }

    return ret;
}

export function getTypedValue(value) {
    const initialType = toType(value);

    if (initialType === 'string') {
        // Null or Undefined
        if (value === 'null') {
            return null;
        }
        if (value === 'undefined') {
            return undefined;
        }

        // Boolean
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }

        // Number
        const numericValue = Number(value);
        if (!Number.isNaN(numericValue)) {
            return numericValue;
        }

        // Object or Array
        let jsonValue = null;
        try {
            jsonValue = JSON.parse(value);
        } catch (e) {
            return value;
        }

        return jsonValue;
    }
    return value;
}
