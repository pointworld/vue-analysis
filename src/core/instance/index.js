import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'

function Vue (options) {
  this._init(options)
}

// add _init to Vue.prototype
initMixin(Vue)
// add $data, $props, $set, $delete, $watch to Vue.prototype
stateMixin(Vue)
// add $on, $once, $off, $emit to Vue.prototype
eventsMixin(Vue)
// add _update, $forceUpdate, $destory to Vue.prototype
lifecycleMixin(Vue)
// add $nextTick, _render to Vue.prototype
renderMixin(Vue)

export default Vue
