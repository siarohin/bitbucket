import first from "lodash/first";
import keys from "lodash/keys";
import sortBy from "lodash/sortBy";

import { DEFAULT_CONFIG, CourseItemModel } from "../../core/index";
import { OrderByPipe } from "./order-by.pipe";

describe("SharedModule.OrderByPipe:", () => {
  const testElement: CourseItemModel = first(DEFAULT_CONFIG);
  const testParameters: Array<string> = keys(testElement);
  const pipe = new OrderByPipe();

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform value if parameter was defined", () => {
    testParameters.forEach(value => {
      const actual: Array<CourseItemModel> = pipe.transform(DEFAULT_CONFIG, value);
      const expected: Array<CourseItemModel> = sortBy(DEFAULT_CONFIG, value);
      expect(actual).toEqual(expected);
    });
  });

  it("should transform value if parameter is not defined", () => {
    const sortedTestParameters: Array<string> = testParameters.sort();
    const actual: Array<CourseItemModel> = pipe.transform(DEFAULT_CONFIG);
    const expected: Array<CourseItemModel> = sortBy(DEFAULT_CONFIG, sortedTestParameters);
    expect(actual).toEqual(expected);
  });

  it("should not transform value if value is not defined", () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});
