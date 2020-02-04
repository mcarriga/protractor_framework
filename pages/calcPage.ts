import { PageBase } from "./PageBase";
import { browser, element, by } from "protractor";
export class calcPage extends PageBase {
  constructor() {
    super();
  }
  first = element(by.model("first"));
  second = element(by.model("second"));
  goBtn = element(by.css('[ng-click="doAddition()"]'));
  //result = element.all(by.cssContainingText('.ng-binding', '5')).first();
  //result = $('h2.ng-binding');
  result = element(by.css("h2.ng-binding"));

  get(): calcPage {
    this.actions.navigateTo("http://juliemr.github.io/protractor-demo/");
    //browser.get("http://juliemr.github.io/protractor-demo/");
    return this;
  }

  doCalculation(firstNo: string, secondNo: string): calcPage {
    this.actions
      .sendText(this.first, firstNo)
      .actions.sendText(this.second, secondNo)
      .actions.click(this.goBtn);
    //this.first.sendKeys(firstNo);
    //this.second.sendKeys(secondNo);
    //this.goBtn.click();
    return this;
  }

  verifyResult(expectedResult: string): calcPage {
    expect(this.result.getText()).toEqual(expectedResult);
    return this;
  }
}
