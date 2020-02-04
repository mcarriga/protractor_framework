let calculatorPage = function () {
    this.first = element(by.model('first'));
    this.second = element(by.model('second'));
    this.goBtn = element(by.css('[ng-click="doAddition()"]'));
    //this.result = element.all(by.cssContainingText('.ng-binding', '5')).first();
    //this.result = $('h2.ng-binding');
    this.result = element(by.css('h2.ng-binding'));

    this.calculate = function (firstNo, secondNo) {
        this.first.sendKeys(firstNo);
        this.second.sendKeys(secondNo);
        this.goBtn.click();
        return this;
    };

    this.verifyResult = function (expectedResult) {
        expect(this.result.getText()).toEqual(expectedResult);
        return this;
    }


};
module.exports = new calculatorPage();