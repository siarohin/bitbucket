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
  transform(source: Array<CourseItemModel>, parameter?: string, reverse?: boolean): Array<CourseItemModel> {
    if (isNil(source)) {
      return source;
    }

    if (!isNil(parameter)) {
      return reverse ? sortBy(source, [parameter]).reverse() : sortBy(source, [parameter]);
    }

    // sort by key names if parameter is not defined
    const firstElement: CourseItemModel = first(source);
    const firstElementKeys: Array<string> = keys(firstElement).sort();
    return sortBy(source, [...firstElementKeys]);
  }
}
