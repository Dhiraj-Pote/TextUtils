export function marriageYr() {

const moment = require('moment');

const originMap = {
    1: [1, 4, 5, 7, 9],
    2: [1, 2, 5, 6, 8],
    3: [3, 6, 7, 9],
    4: [1, 2, 4, 7, 8],
    5: [2, 3, 5, 7, 9],
    6: [1, 2, 3, 5, 6, 9],
    7: [1, 2, 4, 8],
    8: [1, 2, 4, 6, 8],
    9: [1, 2, 3, 6, 7]
};

const dob = prompt('Enter your Birth Date in "DD-MM-YYYY" Format: ');
const gender = prompt('Enter your gender ("f" or "m"): ');

const birthDate = moment(dob, 'DD-MM-YYYY');
console.log(`Birth date is: ${birthDate.format('DD MMM YYYY')}`);

const currentDate = moment();
const age = currentDate.diff(birthDate, 'years');
console.log(`Age: ${age}`);

const origin = getSum(birthDate.date());
console.log("Psychic number: " + origin);

const tempOrigin = calculateTempOrigin(birthDate.date(), birthDate.month() + 1);

const OriginArr = originMap[origin];

function calculateTempOrigin(date, month) {
    let sum = getSum(date) + getSum(month);
    return sum;
}

function getSum(number) {
    let sum = 0;
    sum = String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    while (sum > 9) {
        sum = getSum(sum);
    }
    return sum;
}


if (gender === 'm' || gender === 'M') boy();
else if (gender === 'f' || gender === 'F') girl();
else console.log("Enter valid gender")


function boy() {
    const MmarriageAge = [24, 25, 26, 27, 28, 29, 30, 31, 32]

    let MrespectiveCurrentYr = [];
    for (let i = 0; i < 9; i++) {
        MrespectiveCurrentYr.push((24 + i) + birthDate.year());
    }

    const MrespectiveCurrentOrigin = [];
    for (let i = 0; i < 9; i++) {
        MrespectiveCurrentOrigin.push(getSum(getSum(MrespectiveCurrentYr[i]) + tempOrigin));
    }

    const MmappedObj = {};
    MrespectiveCurrentYr.forEach((yr, index) => {
        MmappedObj[yr] = MrespectiveCurrentOrigin[index];
    });

    const Mvalues = Object.values(MmappedObj)
    const Mkeys = Object.keys(MmappedObj)

    const MmatchingIndices = [];
    for (let i = 0; i < 9; i++) {
        if (OriginArr.includes(Mvalues[i])) {
            MmatchingIndices.push(i);
        }
    }
    console.log('By Numerology calculation your expected marriage year\'s are: ')

    let MfinalAges = [];
    for (let i = 0; i < MmatchingIndices.length; i++)
        MfinalAges.push(MrespectiveCurrentYr[MmatchingIndices[i]] - birthDate.year())

    MfinalAges.forEach(Yr => {
        console.log(`${Yr} (${birthDate.year() + Yr})`);
    });
}


function girl() {

    const FmarriageAge = [22, 23, 24, 25, 26, 27, 28, 29, 30]

    let FrespectiveCurrentYr = [];
    for (let i = 0; i < 9; i++) {
        FrespectiveCurrentYr.push((22 + i) + birthDate.year());
    }

    const FrespectiveCurrentOrigin = [];
    for (let i = 0; i < 9; i++) {
        FrespectiveCurrentOrigin.push(getSum(getSum(FrespectiveCurrentYr[i]) + tempOrigin));
    }

    const FmappedObj = {};
    FrespectiveCurrentYr.forEach((yr, index) => {
        FmappedObj[yr] = FrespectiveCurrentOrigin[index];
    });

    const Fvalues = Object.values(FmappedObj)
    const Fkeys = Object.keys(FmappedObj)

    const FmatchingIndices = [];
    for (let i = 0; i < 9; i++) {
        if (OriginArr.includes(Fvalues[i])) {
            FmatchingIndices.push(i);
        }
    }

    console.log('By Numerology calculation your expected marriage year\'s are: ')
    let FfinalAges = [];
    for (let i = 0; i < FmatchingIndices.length; i++) {
        FfinalAges.push(FrespectiveCurrentYr[FmatchingIndices[i]] - birthDate.year())
    }
    FfinalAges.forEach(Yr => {
        console.log(`${Yr} (${birthDate.year() + Yr})`);
    });

}
}