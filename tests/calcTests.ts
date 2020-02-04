import { browser, element, by, By, ExpectedConditions } from "protractor";
import { calcPage } from "../pages/calcPage";
describe("Basic calculator test suite", () => {
  it("Should be able to do basic addition", () => {
    let calc = new calcPage();
    calc
      .get()
      .doCalculation("2", "3")
      .verifyResult("5");
  });
});
