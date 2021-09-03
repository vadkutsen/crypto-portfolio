/* eslint-disable */
import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({html: localizeFilter(html)})
    }

    Vue.prototype.$error = function(html) {
      M.toast({html: `[Ошибка]: ${localizeFilter(html)}`})
    }
  }
}
