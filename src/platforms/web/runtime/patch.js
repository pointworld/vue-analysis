/* @flow */

// node-ops encapsulates a series of methods of DOM
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
// directive modules (hooks): ref, directives
import baseModules from 'core/vdom/modules/index'
// built-in modules (hooks): attrs, klass, events, domProps, style, transition
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

// nodeops and modules are related to platform
export const patch: Function = createPatchFunction({ nodeOps, modules })
