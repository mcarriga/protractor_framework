import {
  browser,
  element,
  ElementHelper,
  ElementFinder,
  ProtractorBy,
  Button
} from "protractor";
import {
  ILocation,
  Key,
  By,
  WebElement,
  AlertPromise
} from "selenium-webdriver";
import { PageBase } from "../pages/PageBase";

export interface IActions {
  click(el: ElementFinder | By): PageBase;
  sendText(el: ElementFinder | By, txt: string): PageBase;
  navigateTo(url: string): PageBase;
  navigateBack(): PageBase;
  navigateForward(): PageBase;
  navigateRefresh(): PageBase;
  doubleClick(el: ElementFinder): PageBase;
  hover(el: ElementFinder | By): PageBase;
  mouseTo(el: ElementFinder | By): PageBase;
  dragAndDrop(from: ElementFinder | By, to: ElementFinder | By): PageBase;
  dragAndDropCoordinate(from: ElementFinder | By, target: ILocation): PageBase;
  contextClick(el: ElementFinder | By): PageBase;
  offsetClick(starting: Element | By, offset: ILocation): PageBase;
  switchToFrame(elementOrIndex: ElementFinder | By | Number): PageBase;
  switchToDefaultContext(): PageBase;
  switchToWindow(nameOrHandle: string): PageBase;
  switchToAlert(): AlertPromise;
  switchToActiveElement(): PageBase;
  clearTextBox(el: ElementFinder | By): PageBase;
  selectByText(el: ElementFinder | By, txt: string): PageBase;
  selectByIndex(el: ElementFinder | By, index: number): PageBase;
  selectByValue(el: ElementFinder | By, value: string): PageBase;
  selectRadioOptionByText(el: ElementFinder | By, text: string): PageBase;
  selectRadioOptionByValue(el: ElementFinder | By, value: string): PageBase;
  selectRadioOptionByIndex(el: ElementFinder | By, index: number): PageBase;
}

export interface IAsserts {
  urlContains(expected: string): PageBase;
  urlEquals(expected: string): PageBase;
  elementExists(el: ElementFinder | By, shouldExist: boolean): PageBase;
  elementVisible(el: ElementFinder | By, shouldBeVisible: boolean): PageBase;
  elementEnabled(el: ElementFinder | By, shouldBeEnabled: boolean): PageBase;
  elementTextContains(el: ElementFinder | By, expected: string): PageBase;
  elementTextEquals(el: ElementFinder | By, expected: string): PageBase;
  alertIsPresent(trueOrFalse: boolean): PageBase;
  dropDownContainsOptions(): PageBase;
  dropDownContainsOptionsInORder(): PageBase;
  dropDownSelectedValueIs(): PageBase;
  dropDownSelectedTextIs(): PageBase;
  elementAttributeValue(): PageBase;
  elementAttributeValueContains(): PageBase;
  elementSelected(): PageBase;
  elementCountIs(): PageBase;
  elementCountGreaterThan();
  elementCountLessThan();
}
