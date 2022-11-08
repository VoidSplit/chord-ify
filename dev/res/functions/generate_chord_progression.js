/**
 * @author Arthur Bordet <voidsplit.pro@gmail.com>
 * @version 1.0.1
 * @description Function that generates a list of all possible chord progressions with the circle of fifths from a given chord
 * @see {@link https://github.com/VoidSplit|Github}
 * @param {string} key
 * @returns {Array.<{progressions: Array.<{key: Array.<{string}>}>, fondamentale: string}>}
 */
const generate = key => {
    function strUcFirst(a) { return (a + '').charAt(0).toUpperCase() + a.substr(1) }
    key = strUcFirst(key)

    let result = { progressions: [], fondamentale: key }

    const keyLists = [
        ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"],
        ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm"],
        ["Bdim", "F#dim", "C#dim", "G#dim", "D#dim","A#dim", "Fdim", "Cdim", "Gdim", "Ddim", "Adim", "Edim"] // Extra
    ];

    let index = keyLists.filter(list => list.indexOf(key) >= 0)[0].indexOf(key);

    let chordsList = [];

    let possibilities = [
    "1234", "1254", "1264", "1324", "1354", "1364", "1524", "1534", "1564", "1624", "1634", "1654",
    "1235", "1245", "1265", "1325", "1345", "1365", "1425", "1435", "1465", "1625", "1635", "1645"
    ];

    chordsList.push(
        ((keyLists[0][index - 1]) ? keyLists[0][index - 1] : keyLists[0][keyLists[0].length - 1]),
        keyLists[0][index],
        ((keyLists[0][index + 1]) ? keyLists[0][index + 1] : keyLists[0][0]),
        ((keyLists[1][index - 1]) ? keyLists[1][index - 1] : keyLists[1][keyLists[1].length - 1]),
        keyLists[1][index],
        ((keyLists[1][index + 1]) ? keyLists[1][index + 1] : keyLists[1][0])
    );
    chordsList.sort();

    chordsList = chordsList.splice(chordsList.indexOf(key)).concat(chordsList);

    possibilities.forEach(p => {
        let formatedPossibility = p.split('');
        let solution = [];
        formatedPossibility.forEach(x => {
            solution.push(chordsList[x-1]);
        })
        solution.join(' ');
        result.progressions.push(solution);
    });

    return result;
}