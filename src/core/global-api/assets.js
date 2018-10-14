/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    /**
     * Vue.component( id, [definition] )
     * Register or retrieve a global component. Registration
     * also automatically sets the component’s name with the
     * given id.
     *
     * Vue.directive( id, [definition] )
     * Register or retrieve a global directive.
     *
     * Vue.filter( id, [definition] )
     * Register or retrieve a global filter.
     */
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
