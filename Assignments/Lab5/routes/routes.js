// I pledge my honor that I have abided by the Stevens Honor System.

//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'




export the router */

import { Router } from "express";
export const routerAbout = Router();
export const routerStory = Router();
export const routerEducation = Router();

let aboutMe = {
  firstName: "Mitchell",
  lastName: "Reiff",
  biography:
    "My name is Mitchell and I am currently in my 8th semester of Computer Engineering studying at Stevens Institute of Technology. Throughout my 8 semesters, I have taken courses in computer programming, electrical engineering, as well as general engineering.\nIn addition to my studies, I also currently work as an E-Commerce IT Technician at Conair LLC in the IT department assisting with e-commerce and IT projects. The scope of my work can vary widely, but normally consists of working with Salesforce Commerce Cloud and managing our external development teams to facilitate the creation of new sites, feature requests	, and bug fixes. Working full time and going to school full time has been a challenge, but who isn't up for a good challenge?",
  favoriteMovies: [
    "A Christmas Story",
    "Accidental Courtesy: Daryl Davis, Race & America",
    "The Simpsons Movie",
    "Tommy Boy",
    "One Piece Film: Red",
  ],
  hobbies: ["Programming", "Video Games", "3D Printing"],
  fondestMemory:
    "A memory I am particularly fond of is my first time visiting Las Vegas in 2018. It was the first time I had done any kind of traveling since I was very young, and had a great time there with my parents (even though I was too young to gamble at the time 😭",
};

routerAbout.route("/").get(async (req, res) => {
  try {
    res.json(aboutMe);
  } catch (e) {
    res.status(500).send(e);
  }
});

let story = {
  storyTitle: "The Story of Hoboken's Water",
  storyGenre: "Non-Fiction",
  story:
    "The day was February 27th, 2023. The weather was cold, with lows in the 30s and highs nearing 40, and an impending snow storm was slated to start in the evening. A local subcontractor, let's name him Joe as he has not been publically named and shamed yet, was doing his job as he normally would for the energy company PSE&G. Nothing seemed out of the ordinary, until Joe got a little too heavy handed and struck a water main in the late morning. What a f*****g idiot. With that one strike, most of the city of Hoboken lost access to running water.\nNot too long after, as more and more people begin to notice and start to think about what could possibly be going on, the city sent out an email update. In every effort to save face, they made sure to keep reminding us in almost all communications that this was caused by 'private construction', and that it 100% has nothing to do with the actions of the city. The city then proceeded to take well over 24 hours to 'isolate the exact location of the break', which any schmuck with eyes could have done since THERE WAS WATER GUSHING OUT OF THE GROUND WHERE THEY WERE DIGGING THAT DAY. The city also made sure to keep reminding the public that the fire department had a tank of water that people could use. This water, while not safe to put in your mouth and swallow, was apparently perfectly fine for 'dishwashing' and cleaning your utensils which would then touch all the food you are about to put in your mouth and swallow.\nOn the evening of February 28th, 2023, the break was finally located, and repairs began. As of the evening of March 1st, 2023, the city has running water again, but is under a boil order as the water is not safe to consume. Pray for Hoboken.",
};

routerStory.route("/").get(async (req, res) => {
  try {
    res.json(story);
  } catch (e) {
    res.status(500).send(e);
  }
});

let education = [
  {
    schoolName: "Stevens Institute of Technology",
    degreeEarned: "Bachelor of Engineering in Computer Engineering",
    numberOfYearsAttended: 4,
    favoriteClasses: [
      "CPE322: Engineering Design VI",
      "CS615: Systems Administration",
      "CS546: Web Programming",
      "CPE551: Engineering Programming Python",
      "CPE390: Microprocessor Systems",
    ],
    favoriteSchoolMemory:
      "On the day of my CAL 103 final exam, the fire alarm went off in my dorm and I ended up being late to the exam. While this is not my favorite memory, the stress was very memorable!",
  },
  {
    schoolName: "The Beacon School",
    degreeEarned: "H.S. Diploma",
    numberOfYearsAttended: 4,
    favoriteClasses: ["Physics", "A.P. Physics", "Algebra 2", "U.S. History"],
    favoriteSchoolMemory:
      "Instead of a homeroom, my school had a once a week advisory group meeting with our advisor, who we would stick with for all four years. One day, our advisor was talking about how some kids had been caught vaping in the bathroom. The memorable part stems from her response, where she said if you wanted to be cool you should 'just smoke a real cigarette like real man. I found this irrationally funny.",
  },
  {
    schoolName: "Manhattan East School for Arts & Academic", // putting middle school since I did not know what to use for a 3rd since I'm undergrad
    degreeEarned: "M.S. Diploma",
    numberOfYearsAttended: 3,
    favoriteClasses: ["U.S. History", "Earth Science", "Algebra 1"],
    favoriteSchoolMemory:
      "In 8th grade, some of my friends and I started playing Dungeons & Dragons with our 7th grade history teacher during our recess after lunch. It was very fun to learn how to play the game, and it was also fun to improvise depening on how we rolled the dice.",
  },
];

routerEducation.route("/").get(async (req, res) => {
  try {
    res.json(education);
  } catch (e) {
    res.status(500).send(e);
  }
});
