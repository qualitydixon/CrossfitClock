export function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return {
    minutes: ('0' + minutes).slice(-2),
    seconds: ('0' + seconds).slice(-2),
  }
}
