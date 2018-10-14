/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  /**
   * Vue.config - Global Config
   * Vue.config is an object containing Vue's global configurations
   */
  const configDef = {}
  configDef.get = () => config
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  /**
   * Adds a property to a reactive object, ensuring the new property is
   * also reactive, so triggers view updates. This must be used to add
   * new properties to reactive objects, as Vue cannot detect normal
   * property additions (e.g. this.myObject.newProperty = 'hi').
   * The target object cannot be a Vue instance, or the root data object
   * of a Vue instance.
   */
  Vue.set = set
  /**
   * Delete a property on an object. If the object is reactive, ensure
   * the deletion triggers view updates. This is primarily used to
   * get around the limitation that Vue cannot detect property
   * deletions, but you should rarely need to use it.
   * The target object cannot be a Vue instance, or the root data object
   * of a Vue instance.
   */
  Vue.delete = del
  /**
   * Defer the callback to be executed after the next DOM update cycle.
   * Use it immediately after you’ve changed some data to wait for the
   * DOM update.
   */
  Vue.nextTick = nextTick

  /**
   * Vue.options
   */
  Vue.options = Object.create(null)
  /**
   * Options / Assets
   *
   * Vue.options.directives
   * A hash of directives to be made available to the Vue instance.
   *
   * Vue.options.filters
   * A hash of filters to be made available to the Vue instance.
   *
   * Vue.options.components
   * A hash of components to be made available to the Vue instance.
   */
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  extend(Vue.options.components, builtInComponents)

  // add global API: Vue.use
  initUse(Vue)
  // add global API: Vue.mixin
  initMixin(Vue)
  // add global API: Vue.extend
  initExtend(Vue)
  // add global API: Vue.component, Vue.directive, Vue.filter
  initAssetRegisters(Vue)
}
