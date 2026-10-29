/** Clock the sample data was built against. Use this instead of the wall clock. */
export const PORTAL_NOW_ISO = "2026-10-28T21:00:00.000Z"

export function portalNow() {
  return new Date(PORTAL_NOW_ISO)
}
