import {expect} from "chai";
import * as Test from "../src/Test";

describe("Test", () => {
  it("test", () => {
    expect(Test.returnString()).to.equal("test");
  });
});