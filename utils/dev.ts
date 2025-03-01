class DevtoolChecker extends Error {
  override get message() {
    document.body.innerHTML = ''
    console.clear()
    return 'The site currently prohibits access to devtools. Please turn off devtools and reload the page'
  }
}

export const disableInspect = (strict = false) => {
  if (!window) return
  window.onkeydown = function (e) {
    if (
      e.key === 'F12'
      || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))
      || (e.ctrlKey && e.key === 'U')
    ) {
      return false
    }
  }
  if (strict) {
    console.log(new DevtoolChecker())
  }
}

export const disableContextMenu = () => {
  if (!window) return
  window.addEventListener('contextmenu', e => e.preventDefault())
}
