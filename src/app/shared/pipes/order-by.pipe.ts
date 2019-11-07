import { Pipe, PipeTransform } from "@angular/core";
import isNil from "lodash/isNil";
import sortBy from "lodash/sortBy";
import first from "lodash/first";
import keys from "lodash/keys";

import { CourseItemModel } from "../../core/index";

/**
 *  OrderBy pipe for sorting {{Array<Object>}}
 */
@Pipe({
  name: "orderBy",
})
export class OrderByPipe implements PipeTransform {
  transform(
    source: Array<CourseItemModel>,
    parameter?: string,
  ): Array<CourseItemModel> {
    if (isNil(source)) {
      return source;
    }

    if (!isNil(parameter)) {
      return sortBy(source, [parameter]);
    }

    // sort by key names if parameter wasn't defined
    const firstElement: CourseItemModel = first(source);
    const firstElementKeys: Array<string> = keys(firstElement).sort();
    return sortBy(source, [...firstElementKeys]);
  }
}
