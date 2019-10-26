// tslint:disable:max-line-length
import { CourseItemModel } from "./models/index";

/**
 * Mock course's configuration
 */
export const DEFAULT_CONFIG: Array<CourseItemModel> = [
  {
    id: 1,
    title: "Book Club",
    creationDate: new Date(2019, 10, 29, 14, 0, 0, 0),
    duration: 20,
    description:
      "Have you been wanting to join a book club, but haven't been able to find one that is just right? Why not join an EPAM Book Club? A book club is a great way to meet your colleagues, make new friends, read inspirational stories, take them to your heart and share your ideas in English. Here you will have the chance to discuss unabridged short stories in a relaxed, supportive atmosphere.",
  },
  {
    id: 2,
    title: "The Game of Mafia",
    creationDate: new Date(2019, 11, 12, 18, 0, 0, 0),
    duration: 400,
    description:
      "The Game of Mafia is a group game where players try to discover the identity of a secret “mafia” amongst the group before they’re all eliminated. This is a  role-playing game of strategy, survival, and the ability to spot a fraud. During the event you will have plenty of speaking practice, learn functional language applicable in real life communication, you will be able to develop analytical and negotiation skills.",
  },
  {
    id: 3,
    title: "Drupal 8 School (Self-paced)",
    creationDate: new Date(2019, 11, 14, 14, 0, 0, 0),
    duration: 180,
    description:
      "This training is designed for Drupal and PHP developers who is willing to start learning Drupal as a primary skill. It contains all the necessary start knowledge and exercises to learn Drupal 8.",
  },
  {
    id: 4,
    title: "NodeJS Global Mentoring Program",
    creationDate: new Date(2020, 0, 15, 15, 0, 0, 0),
    duration: 1800,
    description:
      "Cross-country global mentoring program which aims at improving corresponding skills related to Node.js ecosystem and connected environment, giving a strong base of skill set required to have for a production-ready engineer. The program consists of 8 step by step practice tasks that will result in practical experience working with Node.js artifacts implementing partials of RESTful API web server and relevant components.",
  },
];
