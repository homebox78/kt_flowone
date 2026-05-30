import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

/**
 * KT FLOW1 CP Design System — Vuetify theme.
 * 컬러 값은 src/styles/tokens.css 와 1:1 동기화되어야 함 (절대 fork 금지).
 */

const ktTheme = {
  dark: false,
  colors: {
    // Brand
    primary:        '#6c71ff',  // --ds-fill-blue-500
    'primary-dark': '#5d63ed',  // 600
    secondary:      '#373e4d',  // gray-800
    accent:         '#6cb1ff',  // light-blue-500

    // Status
    error:          '#f23935',  // red-300
    warning:        '#f23935',
    info:           '#6cb1ff',
    success:        '#6c71ff',

    // Surfaces
    background:     '#f0f1f9',
    surface:        '#ffffff',
    'surface-variant': '#f4f5fa',

    // Vuetify on-* (text on color)
    'on-primary':    '#ffffff',
    'on-secondary':  '#ffffff',
    'on-background': '#212633',
    'on-surface':    '#212633',
    'on-error':      '#ffffff',
  },
  variables: {
    'border-color': '#d3d8e4',
    'border-opacity': 1,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.74,
    'disabled-opacity': 0.4,
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'ktTheme',
    themes: { ktTheme },
  },
  icons: {
    defaultSet: 'mdi',
  },
  // Vuetify 컴포넌트 기본값 — DS 컴포넌트가 내부에서 Vuetify를 쓸 때만 영향
  defaults: {
    VBtn: { variant: 'flat', density: 'comfortable', ripple: false },
    VTextField: { variant: 'outlined', density: 'compact', hideDetails: 'auto' },
    VSelect: { variant: 'outlined', density: 'compact', hideDetails: 'auto' },
    VAutocomplete: { variant: 'outlined', density: 'compact', hideDetails: 'auto' },
    VCombobox: { variant: 'outlined', density: 'compact', hideDetails: 'auto' },
    VTextarea: { variant: 'outlined', density: 'compact', hideDetails: 'auto' },
    VCheckbox: { color: 'primary', density: 'compact', hideDetails: 'auto', ripple: false },
    VRadio: { color: 'primary', density: 'compact', ripple: false },
    VRadioGroup: { density: 'compact', hideDetails: 'auto' },
    VSwitch: { color: 'primary', density: 'compact', hideDetails: 'auto', ripple: false },
    VCard: { elevation: 0 },
    VTooltip: { location: 'top' },
  },
})
