const eventMethod: string = window.addEventListener ? 'addEventListener' : 'attachEvent'
const crossPlatformMessageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
// @ts-ignore
const crossPlatformAddEvent = window[eventMethod]

const removeListenerMethod: string = window.removeEventListener ? 'removeEventListener' : 'detachEvent'
// @ts-ignore
const crossPlatformRemoveEvent = window[removeListenerMethod]


export {crossPlatformAddEvent, crossPlatformRemoveEvent, crossPlatformMessageEvent}
// window.addListener( messageEventMethod ) - postMessageEventer


