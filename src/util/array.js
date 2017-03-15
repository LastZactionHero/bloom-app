export default {
  flatten(arr) { return arr.reduce(
    (acc, val) => acc.concat(
      Array.isArray(val) ? this.flatten(val) : val
    ),
    []
  )}
}