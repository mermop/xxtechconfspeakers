var numeral = require('numeral');

class ConfListHelper {
    constructor() { }

    whoFormatter(confName, conf) {
        return `${confName} (${conf.year}) <a href='${conf.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`;
    }

    genderDiversityFormatter(diversity) {
        return numeral(diversity).format('0%')
    }

    rowIndexFormatter(cell, row, formatExtraData, rowIdx) {
        return numeral(rowIdx + 1).format('0')
    }
}

module.exports = ConfListHelper;