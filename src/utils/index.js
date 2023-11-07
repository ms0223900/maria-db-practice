function columnChecker(keys = ['id'], rawData = {}) {
    const missedKeys = []
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const val = rawData[key]
        if(val === undefined || val === null) {
            missedKeys.push(key);
        }
    }

    if(missedKeys.length > 0) {
        throw new Error(`${missedKeys.join(', ')} REQUIRED!!`)
    }
}

module.exports = {
    columnChecker,
}