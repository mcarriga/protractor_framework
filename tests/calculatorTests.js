let calc = require('../pages/calculatorPage');
describe('Demo calculator tests', function () {
    it('Basic addition test', function () {
        browser.get('http://juliemr.github.io/protractor-demo/');
        //browser.waitForAngular();
        expect(calc.goBtn.getText()).toEqual('Go!');
        calc.calculate('2', '3')
            .verifyResult('5');
    });

    it('Basic subtraction test', function () {
        browser.get('http://juliemr.github.io/protractor-demo/');
    })
});