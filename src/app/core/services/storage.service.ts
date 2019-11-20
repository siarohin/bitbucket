import { Injectable } from "@angular/core";
import assign from "lodash/assign";
import omit from "lodash/omit";
import isNil from "lodash/isNil";

/**
 * The prefix for bitbucket app to read and write data
 */
const STORAGE_KEY = "bitbucket";

/**
 * Local storage service
 */
@Injectable()
export class StorageService {
  /**
   * Read data from local storage
   * returns {{ any }}
   */
  public getItems(): { [key: string]: any } {
    const storage = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(storage);
  }

  /**
   * Read item by key in local storage
   * returns {{ any }}
   */
  public getItem(storageKey: string): any {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return !isNil(storage) ? storage[storageKey] : undefined;
  }

  /**
   * Add a data item to local storage by key
   * param {{ string }} storageKey
   * param {{ any }} value
   */
  public setItem(storageKey: string, value: any): void {
    const storage: { [key: string]: any } = this.getItems();
    const newStorage: { [key: string]: any } = assign({}, storage, { [storageKey]: value });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
  }

  /**
   * Remove all items from local storage by prefix
   */
  public clearAll(): void {
    return localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Remove item from local storage by keys
   * param {{ Array<string> }} storageKey
   */
  public removeItem(storageKey: Array<string>): void {
    const storage: { [key: string]: any } = this.getItems();
    const newStorage: { [key: string]: any } = omit(storage, [...storageKey]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
  }
}
