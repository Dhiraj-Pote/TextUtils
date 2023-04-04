export function marriageYr(dob, gender) {

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

    const birthDate = moment(dob, 'DD-MM-YYYY');
    console.log(`Your Birth date is: ${birthDate.format('DD MMM YYYY')}`);

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


    let finalAges;
    if (gender === 'm' || gender === 'M') {
        finalAges = boy();
    } else if (gender === 'f' || gender === 'F') {
        finalAges = girl();
    } else {
        console.log("Enter valid gender");
    }
    let marriageYears = finalAges.map(Yr => `\n${Yr} (${birthDate.year() + Yr})`);
    console.log(`By Numerology calculation your expected marriage year's are: ${marriageYears}`);
    return marriageYears;


    function boy() {
        //const MmarriageAge = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]

        let MrespectiveCurrentYr = [];
        for (let i = 0; i < 12; i++) {
            MrespectiveCurrentYr.push((24 + i) + birthDate.year());
        }

        const MrespectiveCurrentOrigin = [];
        for (let i = 0; i < 12; i++) {
            MrespectiveCurrentOrigin.push(getSum(getSum(MrespectiveCurrentYr[i]) + tempOrigin));
        }

        const MmappedObj = {};
        MrespectiveCurrentYr.forEach((yr, index) => {
            MmappedObj[yr] = MrespectiveCurrentOrigin[index];
        });

        const Mvalues = Object.values(MmappedObj)
        //const Mkeys = Object.keys(MmappedObj)

        const MmatchingIndices = [];
        for (let i = 0; i < 12; i++) {
            if (OriginArr.includes(Mvalues[i])) {
                MmatchingIndices.push(i);
            }
        }

        let MfinalAges = [];
        for (let i = 0; i < MmatchingIndices.length; i++)
            MfinalAges.push(MrespectiveCurrentYr[MmatchingIndices[i]] - birthDate.year())

        // MfinalAges.forEach(Yr => {
        //     console.log(`${Yr} (${birthDate.year() + Yr})`);
        // });
        return MfinalAges;
    }


    function girl() {

        //const FmarriageAge = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]

        let FrespectiveCurrentYr = [];
        for (let i = 0; i < 12; i++) {
            FrespectiveCurrentYr.push((22 + i) + birthDate.year());
        }

        const FrespectiveCurrentOrigin = [];
        for (let i = 0; i < 12; i++) {
            FrespectiveCurrentOrigin.push(getSum(getSum(FrespectiveCurrentYr[i]) + tempOrigin));
        }

        const FmappedObj = {};
        FrespectiveCurrentYr.forEach((yr, index) => {
            FmappedObj[yr] = FrespectiveCurrentOrigin[index];
        });

        const Fvalues = Object.values(FmappedObj)
        //const Fkeys = Object.keys(FmappedObj)

        const FmatchingIndices = [];
        for (let i = 0; i < 12; i++) {
            if (OriginArr.includes(Fvalues[i])) {
                FmatchingIndices.push(i);
            }
        }

        let FfinalAges = [];
        for (let i = 0; i < FmatchingIndices.length; i++) {
            FfinalAges.push(FrespectiveCurrentYr[FmatchingIndices[i]] - birthDate.year())
        }
        // FfinalAges.forEach(Yr => {
        //     console.log(`${Yr} (${birthDate.year() + Yr})`);
        // });
        return FfinalAges;

    }
}

export function planet(origin) {

    switch (origin) {

        case (1):
            return (`Number 1 persons represents Sun God, 
            
they usually like to lead from the front, and do better in 'positions of authority' versus others.
Such persons are creative, strongly individualistic, self-dependent, innovative, inventive and many a time positive due to their radiance!
Being dominating comes naturally to them, and is a strong characteristic of their demeanour!
Your important numbers are “one", “twos”, “fours”  and “sevens” and all their series
    `)
        case (2):
            return (`Number 2, ruled by 'Moon',

Moon is synonymous to 'Mind'. 
Indeed, you are unique and gifted with an abundant capacity of thoughts. 
Moon lends you the ability of imagination & intuition and accords you with strengths of invention & creativity.
It is needless to say, you're a powerhouse of talent!
Love: Moon, as one can see, is also a dreamy & romantic planet. As it happens, many songs in Bollywood have been inspired by and pictured on the Moon (Chaand), which also bestows romantic traits on those persons carrying this number on their backs.
Carrier: You wouldn't undertake a job or pursue a career unless it stimulates your creative alter-ego & passion. Though money is an inevitable part of your livelihood, it won't necessarily be a criterion in determining your work preferences. To clarify, you will continue to love what you do, and do what you love.
    `)

        case (3):
            return (`As per Numerology, 3 (ruled by the planet Jupiter) 
            
is one of the materialistic numbers from the 1 to 9 number-pane.
Jupiter(Guru) is known to be the planet of wealth, wisdom & knowledge. 
Number 3's are extremely giving in nature. No wonder most number 3's are one of the richest. 
In long run, they will not have any dirth of money.
Jupiter, as it's known as Guru/Teacher. Hence training, teaching, doctor guiding & consultancy are few of your best bets.
Carrier wise, they can also do well in business and trading of every kind, investments.
They can be great wealth managers!
`)

        case (4):
            return (`Number 4, Ruled by the planet, Uranus (Rahu), 
            
It is the lord of judgments.
You are a true number 4 if you know no bounds to your obsession. Hard work & passion often go hand in glove, helping you attain almost anything you desire;
however, with immense struggle & hardships. Despite that, your zeal leads you to the threshold of success :(
Advanced type, such as in the electrical field, research, as scientists, computers, IT, medicine, wireless, media, radio, motion pictures, television, and such like pursuits, off the regular track.
    
2002(4) - SARS virus, 
2011(4) - Financial crisis, 
2020(4) Global Pandemic.
No wonder Uranus (Rahu), despises uncertainty & shortcuts.
Same as number 4 is number 8, governed by Saturn (Shani).`)

        case (5):
            return (`Due to its mercurial properties, No. 5 (Mercury) facilitates constant movement & travel. 
            
On account of its lack of stagnancy, people bearing this number are often inclined to travelling. 
Speaking of travel, the first man to step on Moon was a No. 5, Neil Armstrong, an aviator born on 5th August.
Mercury (Buddh) is the fastest of all planets; known to be the planet of speed, communication, versatility and knowledge (Buddhi) So are You.
Formal Captain Virat Kohli (5 November 1988) represent this number Even his name adds to 5 by default. No wonder he's one of our most agile & fastest run scorers in all formats of the game.
    `)


        case (6):
            return (`People born on the 6th, 15th and 24th in any month are termed as Number 6 people, ruled by the planet Venus. 

Venus, known as the Goddess of Love, It's is rightly linked with love, peace, harmony beauty, luxury and entertainment! 
Now you know why they say, "Women are from Venus"!
In a rather simplistic interpretation of Venus; it is the inheritor of the two most basic needs of life, 'Love & Money'. 
Hence persons bearing this number are perennially on the hunt for either love or money, or both. Not too surprisingly, they are generally lucky with both.
    `)

        case (7):
            return (`People born on number 7 ruled by Neptune, 
            
are extremely independent, original and have a marked individuality. 
Most Number 7's like you are colossally gifted with exceptional mental faculties. Basically your imaginative superiority is one of your major advantages.
As Neptune is a mental planet, therefore, Number 7's are considered to be exceedingly moody & whimsical.
You are often religious too, and have an undyingly strong spiritual connect.
No wonder you're inclined to Occult Sciences, such as Astrology, Numerology, Palmistry, Yoga, Reiki, and Meditation, etc. 
In deed, your fascination towards mystical arts is superlative! 
    
Creativity is undoubtedly a spicy boon to your otherwise tranquil life. It brings colour to your existence.
    `)

        case (8):
            return (` Number 8, ruled by Saturn (Shanni),

Usually the first half of number 8, symbolically, is associated with struggle & strife, and the second half, however, compensates for the first.
the Lord of Judgment. Karma(good deeds) holds the most significant virtue for Number 8's.
Saturn, known to be the slowest planet usually takes trials and tribulations, after which, eventually rewards the person be patient as the saying goes, Rome was not built in a day. 
Saturn bestows upon you, in magnification, qualities of tolerance & endurance and you come back stronger than ever. Number 8’s are usually reserved or private people 
As a general rule, 4 & 8 these numbers should be avoided, by all. 
    
1,3,5,6 are best for and lucky for No 8's; and all its series
such as the 1st, 3rd, 5th, 6th, 10th, 12th, 14th, 15th, 19th, 21st, 23rd, 24th, 28th and 30th.
    `)

        case (9):
            return (`Number 9, ruled by red plant Mars,
            
these people known to have enormous energy.
You're are devoid of caution and often fail to make timely judgments.
Perhaps you rely solely on your impulse and do what the moment suggests.
it makes you usually hot headed.
Number 9 is like nuclear energy; it can be used for the good as well as bad. 
You're generally spontaneous with the execution of your plans.
You usually experience quarrels in personal and professional front mainly arising due to your recklessly straight forward nature.
    
Your lucky Numbers are 6th, 15th, 24th, 3rd, 12th, 21st and 30th, 9th, 18th and 27th in any month.`)

        default:
            return 0;
    }

}
