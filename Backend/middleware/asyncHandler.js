//to handle promise that come from moogese
const asyncHandler = (fn) => (req, res, next) => {
  //high-order function that take another function as argument
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
