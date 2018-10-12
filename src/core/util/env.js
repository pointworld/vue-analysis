/* @flow */

// can we use __proto__?
export const hasProto = '__proto__' in {}

// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch

export let supportsPassive = false
try {
  const opts = {}
  Object.defineProperty(opts, 'passive', ({
    get () {
      /* istanbul ignore next */
      supportsPassive = true
    }
  }: Object)) // https://github.com/facebook/flow/issues/285
  window.addEventListener('test-passive', null, opts)
} catch (e) {}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    _isServer = false
  }
  return _isServer
}

/* istanbul ignore next */
export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  isNative(Symbol) &&
  isNative(Reflect.ownKeys)

let _Set
/* istanbul ignore if */ // $flow-disable-line
if (isNative(Set)) {
  // use native Set when available.
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = class Set implements SimpleSet {
    set: Object;
    constructor () {
      this.set = Object.create(null)
    }
    has (key: string | number) {
      return this.set[key] === true
    }
    add (key: string | number) {
      this.set[key] = true
    }
    clear () {
      this.set = Object.create(null)
    }
  }
}

interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): mixed;
  clear(): void;
}

export { _Set }
export type { SimpleSet }
