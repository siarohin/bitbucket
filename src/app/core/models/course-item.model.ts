/**
 * CourseItem interface
 */
export interface CourseItemModel {
  // id of course item
  id: number;

  // title of course
  title: string;

  // creation date
  creationDate: Date | number;

  // course's duration
  duration: number;

  // description for course item
  description: string;
}

/**
 * CourseItem class that implements CourseItem iterface
 */
export class CourseItem implements CourseItemModel {
  /**
   * id of course item
   */
  public id: number;

  /**
   * title of course
   */
  public title: string;

  /**
   * creation date
   */
  public creationDate: Date | number;

  /**
   * course's duration
   */
  public duration: number;

  /**
   * description for course item
   */
  public description: string;

  constructor(
    id: number,
    title: string,
    creationDate: Date | number,
    duration: number,
    description: string,
  ) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }
}
