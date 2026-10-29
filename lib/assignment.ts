/** Keep in sync with README.md § Your tickets and § What to hand back. */

export const assignmentSummary = {
  title: "Take-home assignment",
  intro: "One-hour exercise. Work on both product tickets below and stop at 60 minutes.",
  tickets: [
    "Merchants want the ability to search payments by the last 4 of the card number.",
    "Merchants want a way to visualize their card approval rates so they can understand how many payments are getting declined and how much revenue they are losing on card payments. They want to know the approval rates on count and on dollar amount.",
  ] as const,
  handback:
    "Leave a 3–4 sentence reply to your manager: what you built, what you assumed, and what you would do next. List unfinished ideas instead of rushing them in.",
}
