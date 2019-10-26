import { UserEntityModel } from "./user-entity.model";

/**
 * UserEntity class that implements UserEntity iterface
 */
export class UserEntity implements UserEntityModel {
  /**
   * id of course item
   */
  public id: number;

  /**
   * user's first name
   */
  public firstName: string;

  /**
   * user's last name
   */
  public lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
