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
import { IAsserts, IActions } from "../interfaces/Keywords";
import * as winston from "winston";

export class CustomLogger {
  static logFormat = winston.format.printf(info => {
    const formattedDate = info.timestamp.replace("T", " ").replace("Z", "");
    return `${formattedDate}|${info.level}|${info.message};`;
  });

  static logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      //winston.format.splat(),
      //winston.format.simple()
      winston.format.timestamp(),
      CustomLogger.logFormat
    ),
    transports: [
      // - Write to all logs with level `info` and above to `combined.log`
      //new winston.transports.File({ filename: "combined.log" }),
      // - Write all logs error (and above) to Console/terminal
      new winston.transports.Console()
    ]
  });
}

export abstract class PageBase {
  constructor() {}
  actions = new Actions(this);
}

class KeywordBase {
  protected startKeyword(keyword: string, ...args: any) {
    let str = "Starting Keyword: Actions." + keyword;
    let hasLoc = false;
    args.forEach(e => {
      if (e instanceof By) {
        hasLoc = true;
        let r = e as By;
        str = str + " - " + r;
      } else if (e instanceof ElementFinder) {
        hasLoc = true;
        let r = e as ElementFinder;
        str = str + " - " + r.parentElementArrayFinder.locator_;
      } else if (e instanceof WebElement) {
        hasLoc = true;
        let r = e as WebElement;
        str = str + " - " + r;
      } else {
        if (hasLoc) {
          str = str + ", " + JSON.stringify(e) + " ";
        } else {
          str = str + " - " + JSON.stringify(e) + " ";
        }
      }
    });
    CustomLogger.logger.info(str);
  }

  protected endKeyword(keyword: string): void {
    CustomLogger.logger.info("Ending Keyword: Actions." + keyword);
  }
}

class Actions extends KeywordBase implements IActions {
  b: PageBase;
  constructor(base: PageBase) {
    super();
    this.b = base;
  }

  private tst() {
    //browser.actions().click(protractor.Button.RIGHT).perform();
    //browser.actions().mouseMove(element(by.id("b")));
    browser.switchTo().alert();
  }

  click(el: ElementFinder | By): PageBase {
    this.startKeyword("click", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      el.click();
    } else {
      let b = el as By;
      element(b).click();
    }
    this.endKeyword("click");
    return this.b;
  }

  sendText(el: ElementFinder | By, txt: string): PageBase {
    this.startKeyword("sendText", el, { Text: txt });
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      el.sendKeys(txt);
    } else {
      let b = el as By;
      element(b).sendKeys(txt);
    }
    this.endKeyword("sendText");
    return this.b;
  }

  navigateTo(url: string): PageBase {
    this.startKeyword("navigateTo", { URL: url });
    browser.navigate().to(url);
    this.endKeyword("navigateTo");
    return this.b;
  }

  navigateBack(): PageBase {
    this.startKeyword("navigateBack");
    browser.navigate().back();
    this.endKeyword("navigateBack");
    return this.b;
  }
  navigateForward(): PageBase {
    this.startKeyword("navigateForward");
    browser.navigate().forward();
    this.endKeyword("navigateForward");
    return this.b;
  }
  navigateRefresh(): PageBase {
    this.startKeyword("navigateRefresh");
    browser.navigate().refresh();
    this.endKeyword("navigateRefresh");
    return this.b;
  }
  doubleClick(el: ElementFinder | By): PageBase {
    this.startKeyword("doubleClick", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      browser.actions().doubleClick(e);
    } else {
      let b = el as By;
      browser.actions().doubleClick(element(b));
    }

    this.endKeyword("doubleClick");
    return this.b;
  }
  hover(el: ElementFinder | By): PageBase {
    this.startKeyword("hover", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      browser
        .actions()
        .mouseMove(element(e))
        .perform();
    } else {
      let b = el as By;
      browser
        .actions()
        .mouseMove(element(b))
        .perform();
    }
    this.endKeyword("hover");
    return this.b;
  }
  mouseTo(el: ElementFinder | By): PageBase {
    this.startKeyword("mouseTo", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      browser
        .actions()
        .mouseMove(element(e))
        .perform();
    } else {
      let b = el as By;
      browser
        .actions()
        .mouseMove(element(b))
        .perform();
    }
    this.endKeyword("mouseTo");
    return this.b;
  }
  dragAndDrop(from: ElementFinder | By, to: ElementFinder | By): PageBase {
    this.startKeyword("dragAndDrop", from, to);
    if (from instanceof ElementFinder) {
      let e = from as ElementFinder;
      if (to instanceof ElementFinder) {
        let t = to as ElementFinder;
        browser
          .actions()
          .dragAndDrop(e, t)
          .perform();
      } else {
        let t = to as By;
        browser
          .actions()
          .dragAndDrop(e, element(t))
          .perform();
      }
    } else {
      let b = from as By;
      if (to instanceof ElementFinder) {
        let c = to as ElementFinder;
        browser
          .actions()
          .dragAndDrop(element(b), c)
          .perform();
      } else {
        let c = to as By;
        browser
          .actions()
          .dragAndDrop(element(b), element(c))
          .perform();
      }
    }
    this.endKeyword("dragAndDrop");
    return this.b;
  }
  dragAndDropCoordinate(from: ElementFinder | By, target: ILocation): PageBase {
    this.startKeyword("dragAndDropCoordinate", from, target.x, target.y);
    if (from instanceof ElementFinder) {
      let e = from as ElementFinder;
      browser
        .actions()
        .dragAndDrop(e, target)
        .perform();
    } else {
      let b = from as By;
      browser
        .actions()
        .dragAndDrop(element(b), target)
        .perform();
    }
    this.endKeyword("dragAndDropCoordinate");
    return this.b;
  }

  contextClick(el: ElementFinder | By): PageBase {
    this.startKeyword("contextClick", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      browser
        .actions()
        .mouseMove(e)
        .click(Button.RIGHT)
        .perform();
    } else {
      let b = el as By;
      browser
        .actions()
        .mouseMove(element(b))
        .click(Button.RIGHT)
        .perform();
    }
    this.endKeyword("contextClick");
    return this.b;
  }
  offsetClick(starting: By | Element, offset: ILocation): PageBase {
    this.startKeyword("offsetClick", starting, {
      offsetX: offset.x,
      offsetY: offset.y
    });
    if (starting instanceof ElementFinder) {
      let e = starting as ElementFinder;
      browser
        .actions()
        .mouseMove(e, offset)
        .click()
        .perform();
    } else {
      let b = starting as By;
      browser
        .actions()
        .mouseMove(element(b), offset)
        .click()
        .perform();
    }
    this.endKeyword("offsetClick");
    return this.b;
  }
  switchToFrame(elementOrIndex: Number | ElementFinder | By): PageBase {
    this.startKeyword("switchToFrame", elementOrIndex);
    if (elementOrIndex instanceof ElementFinder) {
      let e = elementOrIndex as ElementFinder;
      browser.switchTo().frame(e);
    } else if (elementOrIndex instanceof By) {
      let b = elementOrIndex as By;
      browser.switchTo().frame(element(b));
    } else {
      let c = elementOrIndex as number;
      browser.switchTo().frame(c);
    }
    this.endKeyword("switchToFrame");
    return this.b;
  }
  switchToDefaultContext(): PageBase {
    this.startKeyword("switchToDefaultContext");
    browser.switchTo().defaultContent();
    this.endKeyword("switchToDefaultContext");
    return this.b;
  }
  switchToWindow(nameOrHandle: string): PageBase {
    this.startKeyword("switchToWindow", { nameOrHandle: nameOrHandle });
    browser.switchTo().window(nameOrHandle);
    this.endKeyword("switchToWindow");
    return this.b;
  }
  switchToAlert(): AlertPromise {
    this.startKeyword("switchToAlert");
    let prom = browser.switchTo().alert();
    this.endKeyword("switchToAlert");
    return prom;
  }
  switchToActiveElement(): PageBase {
    this.startKeyword("switchToActiveElement");
    browser.switchTo().activeElement();
    this.endKeyword("switchToActiveElement");
    return this.b;
  }
  clearTextBox(el: ElementFinder | By): PageBase {
    this.startKeyword("clearTextBox", el);
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      el.clear();
    } else {
      let b = el as By;
      element(b).clear();
    }
    browser.sleep(500);
    this.endKeyword("clearTextBox");
    return this.b;
  }
  selectByText(el: ElementFinder | By, txt: string): PageBase {
    this.startKeyword("selectByText", el, { Text: txt });
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      e.$('[text="' + txt + '"]').click();
    } else {
      let b = el as By;
      element(b)
        .$('[text="' + txt + '"]')
        .click();
    }
    browser.sleep(500);
    this.endKeyword("selectByText");
    return this.b;
  }
  selectByIndex(el: ElementFinder | By, index: number): PageBase {
    this.startKeyword("selectByIndex", el, { Index: index });
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      e.all(By.tagName("option")).then(function(options) {
        options[index].click();
      });
    } else {
      let b = el as By;
      element(b)
        .all(By.tagName("option"))
        .then(function(options) {
          options[index].click();
        });
    }
    browser.sleep(500);
    this.endKeyword("selectByIndex");
    return this.b;
  }
  selectByValue(el: ElementFinder | By, value: string): PageBase {
    this.startKeyword("selectByValue", el, { Value: value });
    if (el instanceof ElementFinder) {
      let e = el as ElementFinder;
      e.$('[value="' + value + '"]').click();
    } else {
      let b = el as By;
      element(b)
        .$('[value="' + value + '"]')
        .click();
    }
    browser.sleep(500);
    this.endKeyword("selectByValue");
    return this.b;
  }
  selectRadioOptionByText(el: ElementFinder | By, text: string): PageBase {
    throw new Error("Method not implemented.");
  }
  selectRadioOptionByValue(el: ElementFinder | By, value: string): PageBase {
    throw new Error("Method not implemented.");
  }
  selectRadioOptionByIndex(el: ElementFinder | By, index: number): PageBase {
    throw new Error("Method not implemented.");
  }
}
