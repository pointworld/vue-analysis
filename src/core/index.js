import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// add global API: config, util, set, delete, nextTick, options,
// directive, filter, component, use, mixin, extend to Vue
initGlobalAPI(Vue)

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

/**
 * Details: Provides the installed version of Vue as a string. This is
 * especially useful for community plugins and components, where you might
 * use different strategies for different versions.
 */
Vue.version = '__VERSION__'

export default Vue
