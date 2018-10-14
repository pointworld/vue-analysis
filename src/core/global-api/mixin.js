/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  /**
   * Apply a mixin globally, which affects every Vue instance
   * created afterwards. This can be used by plugin authors to
   * inject custom behavior into components. Not recommended
   * in application code.
   */
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
