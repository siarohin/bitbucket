import { TruncatePipe } from "./truncate.pipe";

describe("TruncatePipe:", () => {
  const testCase: Array<{
    value: string;
    length?: number;
    expected: string;
  }> = [
    {
      value: "Have you been wanting",
      length: 10,
      expected: "Have you b...",
    },
    {
      value: "Have you been wanting",
      expected: "Have you been wanting",
    },
    { value: " ", expected: " " },
  ];
  const pipe = new TruncatePipe();

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform value", () => {
    expect(
      pipe.transform(testCase[0].value, testCase[0].length),
    ).toBe(testCase[0].expected);
    expect(
      pipe.transform(testCase[1].value, testCase[1].length),
    ).toBe(testCase[1].expected);
    expect(pipe.transform(testCase[2].value)).toBe(
      testCase[2].expected,
    );
  });
});
