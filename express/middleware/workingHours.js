// Monday=1 ... Sunday=0 per getDay()
// Working hours: 09:00 <= time < 17:00 (9–16 inclusive)
export default function workingHours(req, res, next) {
  const now = new Date();

  // OPTIONAL: lock to a timezone (e.g., Europe/Oslo)
  // const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Oslo" }));

  const day = now.getDay();
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const inHours = hour >= 9 && hour < 17;

  if (isWeekday && inHours) {
    return next();
  }

  // If outside working hours, render a friendly page
  res.status(403).send(`
    <html>
      <head>
        <title>Closed</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="closed">
        <div class="card">
          <h1>We’re closed 🔒</h1>
          <p>This site is only available Monday–Friday, 09:00–17:00.</p>
          <a class="btn" href="/">Try again later</a>
        </div>
      </body>
    </html>
  `);
}
