export const useHelpers = () => {
  const days = ['Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat', 'Sun']
  const CACHE_TTL = 1 * 60 * 1000

  return {
    days,
    CACHE_TTL,
  }
}
