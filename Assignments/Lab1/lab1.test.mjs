// I pledge my honor that I have abided by the Stevens Honor System.

import * as lab1 from "./lab1.mjs";

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// Question one
console.log(lab1.questionOne([1, 2, 4]));                                       // { '73': true }
console.log(lab1.questionOne([10, 15]));                                        // { '4375': false }
console.log(lab1.questionOne([16, 201, 192, 18]));                              // { '15208417': false }
console.log(lab1.questionOne([75, 50, 18]));                                    // { '552707': true }
console.log(lab1.questionOne([12, 16, 18]));                                    // { '11656': false }


// Question two
console.log(lab1.questionTwo([1, 2, 3, 4, 2]));                                 // [ false, 3, 4 ]
console.log(lab1.questionTwo([7, 8, 9, 10, 11]));                               // [ true ]
console.log(lab1.questionTwo([10, 9, 11, 15]));                                 // [ false, 0, 1 ]
console.log(lab1.questionTwo([1, 7, 7, 8]));                                    // [ true ]
console.log(lab1.questionTwo([2019, 2020, 2021, 2022, 2023]));                  // [ true ]


// Question three
console.log(lab1.questionThree({x:1, y:2, z:3}, {y:7, w:99, x:1, z:8}));                // { x: true, y: true, z: true, w: false }
console.log(lab1.questionThree({hello:"world", bob:"I'm Bob"}, {hello:17}));            // { hello: true, bob: false }
console.log(lab1.questionThree({happy:"good", w2:"tax"}, {w2:"form", happy:"yay"}));    // { happy: true, w2: true }
console.log(lab1.questionThree({e:12, w:":)", a:[1,2]}, {a:1, e:8}));                   // { e: true, w: false, a: true }
console.log(lab1.questionThree({https:"443", http:"80"}, {ssh:"22", ftp:"21"}));        // { https: false, http: false, ssh: false, ftp: false }


// Question four
console.log(                                                                    // [ 'Matthew', 'Wade', 'ide402' ],[ 'Alex', 'Wellerstein', 'hhs130' ],[ 'Brunella', 'Taddeo', 'bio281' ]
  lab1.questionFour(`Matthew,Wade,ide402
Alex,Wellerstein,hhs130
Brunella,Taddeo,bio281`)
);

console.log(                                                                    // [ 'Kevin', 'Ryan', 'cpe551' ],[ 'Frank', 'Riccobono', 'ee552' ],[ 'Yousef', 'Abdelmalek', 'ee553' ]
  lab1.questionFour(`Kevin,Ryan,cpe551
Frank,Riccobono,ee552
Yousef,Abdelmalek,ee553`)
);

console.log(                                                                    // [ 'Dov', 'Kruger', 'cpe390' ],[ 'Mukund', 'Iyengar', 'cpe360' ],[ 'Denis', 'Ovchinnikov', 'ma134' ]
  lab1.questionFour(`Dov,Kruger,cpe390
Mukund,Iyengar,cpe360
Denis,Ovchinnikov,ma134`)
);

console.log(                                                                    // [ 'Chan', 'Yu', 'e120' ],[ 'Rami', 'Bashour', 'e121' ],[ 'Michael', 'Schoch', 'cal103' ]
  lab1.questionFour(`Chan,Yu,e120
Rami,Bashour,e121
Michael,Schoch,cal103`)
);

console.log(                                                                    // [ 'Kevin', 'Lu', 'cpe423' ],[ 'Jan', 'Schaumann', 'cs615' ],[ 'Joe', 'Mindak', 'ide400' ]
  lab1.questionFour(`Kevin,Lu,cpe423
Jan,Schaumann,cs615
Joe,Mindak,ide400`)
);
