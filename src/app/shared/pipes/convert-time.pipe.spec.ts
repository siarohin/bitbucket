import { ConvertTimePipe } from "./convert-time.pipe";

describe("SharedModule.ConvertTimePipe:", () => {
  const testCase: Array<{ value: number; expected: string }> = [
    { value: 180, expected: "3h 00min" },
    { value: 15, expected: "15min" },
    { value: 150, expected: "2h 30min" },
    { value: undefined, expected: "" },
  ];
  const pipe = new ConvertTimePipe();

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform value", () => {
    expect(pipe.transform(testCase[0].value)).toBe(testCase[0].expected);
    expect(pipe.transform(testCase[1].value)).toBe(testCase[1].expected);
    expect(pipe.transform(testCase[2].value)).toBe(testCase[2].expected);
    expect(pipe.transform(testCase[3].value)).toBe(testCase[3].expected);
  });
});
