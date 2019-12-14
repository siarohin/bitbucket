import { Injectable } from "@angular/core";

/**
 * Service that controls spinner behavior
 */
@Injectable()
export class SpinnerService {
  private visible = false;

  /**
   * is spinner visible
   */
  public isVisible(): boolean {
    return this.visible;
  }

  /**
   * hide spinner
   */
  public hide(): void {
    this.visible = false;
  }

  /**
   * show spinner
   */
  public show(): void {
    this.visible = true;
  }
}
