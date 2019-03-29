import ErrorMessages from "../ErrorMessages";

export default class PromiseInterrupt extends Error {
    constructor() {
        super(ErrorMessages.PromiseCancellation);
    }
}