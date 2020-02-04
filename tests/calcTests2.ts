import { browser, element, by, By, ExpectedConditions } from "protractor";
import { calcPage } from "../pages/calcPage";
describe("Another Basic calculator test suite", () => {
  it("Should be able to do basic addition", () => {
    let calc = new calcPage();
    calc
      .get()
      .doCalculation("3", "3")
      .verifyResult("6");
  });
});
