export function marriageYr(dob, gender) {
    const moment = require('moment');

    // Mapping origins to respective numbers
    const originMap = {
        1: [1, 4, 5, 7, 9],
        2: [1, 2, 5, 6, 8],
        3: [3, 6, 7, 9],
        4: [1, 2, 4, 7, 8],
        5: [2, 3, 5, 7, 9],
        6: [1, 2, 3, 5, 6, 9],
        7: [1, 2, 4, 8],
        8: [1, 2, 4, 6, 8],
        9: [1, 2, 3, 6, 7],
    };

    // Parsing birth date
    const birthDate = moment(dob, 'DD-MM-YYYY');
    if (!birthDate.isValid()) {
        console.log("Invalid date format. Please use 'DD-MM-YYYY'.");
        return [];
    }

    console.log(`Your Birth date is: ${birthDate.format('DD MMM YYYY')}`);
    const currentDate = moment();
    const age = currentDate.diff(birthDate, 'years');
    console.log(`Age: ${age}`);

    // Calculate psychic number
    const origin = getSum(birthDate.date());
    console.log("Psychic number: " + origin);

    // Calculate temp origin based on date and month
    const tempOrigin = calculateTempOrigin(birthDate.date(), birthDate.month() + 1);
    const OriginArr = originMap[origin];

    // Calculate temp origin
    function calculateTempOrigin(date, month) {
        let sum = getSum(date) + getSum(month);
        return sum;
    }

    // Utility function to calculate single-digit sum
    function getSum(number) {
        let sum = String(number)
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit), 0);
        while (sum > 9) {
            sum = getSum(sum);
        }
        return sum;
    }

    // Special case for "01-02-2000"
    if (birthDate.format('DD-MM-YYYY') === "01-02-2000") {
        console.log("Condition matched for special date: 01-02-2000");
        console.log(`Hey, Great News.. You'll be Single your whole Life.. 🥳`);
        return `Hey, Great News.. You'll be Single your whole Life.. 🥳`;
    }

    // Determine marriage years based on gender
    let finalAges;
    if (gender === 'm' || gender === 'M') {
        finalAges = boy();
    } else if (gender === 'f' || gender === 'F') {
        finalAges = girl();
    } else {
        console.log("Enter a valid gender (m/f).");
        return [];
    }

    // Compute marriage years for other cases
    const marriageYears = finalAges.map(
        (Yr) => `\n${Yr} (${birthDate.year() + Yr})`
    );
    console.log(
        `By Numerology calculation your expected marriage year's are: ${marriageYears}`
    );
    return marriageYears;

    // Calculate marriage years for boys
    function boy() {
        const MrespectiveCurrentYr = [];
        for (let i = 0; i < 12; i++) {
            MrespectiveCurrentYr.push(24 + i + birthDate.year());
        }

        const MrespectiveCurrentOrigin = [];
        for (let i = 0; i < 12; i++) {
            MrespectiveCurrentOrigin.push(
                getSum(getSum(MrespectiveCurrentYr[i]) + tempOrigin)
            );
        }

        const MmappedObj = {};
        MrespectiveCurrentYr.forEach((yr, index) => {
            MmappedObj[yr] = MrespectiveCurrentOrigin[index];
        });

        const Mvalues = Object.values(MmappedObj);
        const MmatchingIndices = [];
        for (let i = 0; i < 12; i++) {
            if (OriginArr.includes(Mvalues[i])) {
                MmatchingIndices.push(i);
            }
        }

        const MfinalAges = [];
        for (let i = 0; i < MmatchingIndices.length; i++) {
            MfinalAges.push(MrespectiveCurrentYr[MmatchingIndices[i]] - birthDate.year());
        }
        return MfinalAges;
    }

    // Calculate marriage years for girls
    function girl() {
        const FrespectiveCurrentYr = [];
        for (let i = 0; i < 12; i++) {
            FrespectiveCurrentYr.push(22 + i + birthDate.year());
        }

        const FrespectiveCurrentOrigin = [];
        for (let i = 0; i < 12; i++) {
            FrespectiveCurrentOrigin.push(
                getSum(getSum(FrespectiveCurrentYr[i]) + tempOrigin)
            );
        }

        const FmappedObj = {};
        FrespectiveCurrentYr.forEach((yr, index) => {
            FmappedObj[yr] = FrespectiveCurrentOrigin[index];
        });

        const Fvalues = Object.values(FmappedObj);
        const FmatchingIndices = [];
        for (let i = 0; i < 12; i++) {
            if (OriginArr.includes(Fvalues[i])) {
                FmatchingIndices.push(i);
            }
        }

        const FfinalAges = [];
        for (let i = 0; i < FmatchingIndices.length; i++) {
            FfinalAges.push(FrespectiveCurrentYr[FmatchingIndices[i]] - birthDate.year());
        }
        return FfinalAges;
    }
}

export function planet(origin) {
    switch (origin) {
        case 1:
            return `Number 1 persons represent Sun God. They are leaders, creative, and independent.`;

        case 2:
            return `Number 2, ruled by 'Moon', gives imagination, intuition, and creativity.`;

        case 3:
            return `Number 3, ruled by Jupiter (Guru), is connected with wealth, wisdom, and knowledge.`;

        case 4:
            return `Number 4, ruled by Uranus (Rahu), is associated with obsession and hard work.`;

        case 5:
            return `Number 5, ruled by Mercury, is dynamic, communicative, and adaptable.`;

        case 6:
            return `Number 6, ruled by Venus, symbolizes love, harmony, and luxury.`;

        case 7:
            return `Number 7, ruled by Neptune, fosters independence and spirituality.`;

        case 8:
            return `Number 8, ruled by Saturn, represents struggle, discipline, and rewards for perseverance.`;

        case 9:
            return `Number 9, ruled by Mars, is energetic, impulsive, and action-oriented.`;

        default:
            return `Invalid origin.`;
    }
}
