export function formatTime (time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return ('0' + minutes).slice(-2) + ' : ' + ('0' + seconds).slice(-2)
}
