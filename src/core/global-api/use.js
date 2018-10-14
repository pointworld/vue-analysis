/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  /**
   * Install a Vue.js plugin. If the plugin is an Object, it
   * must expose an install method. If it is a function itself,
   * it will be treated as the install method. The install method
   * will be called with Vue as the argument.
   *
   * This method has to be called before calling new Vue().
   *
   * When this method is called on the same plugin multiple times,
   * the plugin will be installed only once.
   */
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
