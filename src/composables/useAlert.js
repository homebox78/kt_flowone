import { reactive } from 'vue'

const state = reactive({
  visible: false,
  type: 'info',
  message: '',
  timeoutId: null,
})

export function useAlert() {
  function show(message, type = 'info', duration = 3000) {
    if (state.timeoutId) clearTimeout(state.timeoutId)
    state.message = message
    state.type = type
    state.visible = true
    state.timeoutId = setTimeout(() => {
      state.visible = false
    }, duration)
  }

  return {
    state,
    info: (m, d) => show(m, 'info', d),
    success: (m, d) => show(m, 'success', d),
    warning: (m, d) => show(m, 'warning', d),
    error: (m, d) => show(m, 'error', d),
  }
}
