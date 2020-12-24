import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
