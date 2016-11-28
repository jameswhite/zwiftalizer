import getAllMatches from './getAllMatches'

export default function mapBTLELines(str) {

  const regex = /^\[[^\]]*\]\s+(ant\s\s:\sble:|ble:|unknown ble|wheel rev:|crank rev:)\s+.*$/gim

  return getAllMatches(str, regex)
}