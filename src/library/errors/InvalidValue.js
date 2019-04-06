export default class InvalidValue extends Error {
    constructor(invalidValue) {
        super("Invalid value :"+invalidValue);
    }
}