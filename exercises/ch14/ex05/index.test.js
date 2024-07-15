import { changeTemplateLiteralType } from "./index.js";

describe('', () => {
    it('string', () => {
        expect(changeTemplateLiteralType`aaaa${"A"}bbbb`).toEqual("aaaastringbbbb");
    });

    it('object', () => {
        expect(changeTemplateLiteralType`${{x: 1}}cccc`).toEqual("objectcccc");
    });

    it('number', () => {
        expect(changeTemplateLiteralType`d${2}`).toEqual("dnumber");
    });
    it('not template', () => {
        expect(changeTemplateLiteralType`ああ`).toEqual("ああ");
    });
});