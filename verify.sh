#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Checks that the site is healthy. Run it AFTER the site is live somewhere.
#
#   Local test:   bash verify.sh http://localhost:8000
#   Production:   bash verify.sh
#
# It checks three things on every page:
#   1. the page loads               (HTTP status 200 = OK, 404 = missing)
#   2. its canonical tag points at a URL that also loads
#      ^ this is the bug that was breaking the old site
#   3. the navigation links are in the raw HTML, not added by JavaScript
#      ^ this is what makes the site readable to AI crawlers
# ---------------------------------------------------------------------------
BASE="${1:-https://www.rkconsulting.co.nz}"
PATHS=("/" "/airtable/" "/power-bi/" "/looker-studio/" "/spreadsheets/" \
       "/ai-consulting/" "/ai-automation/" "/contact/")
FAIL=0
echo "Checking $BASE"
echo
printf "%-18s %-8s %-12s %-10s %s\n" "PAGE" "LOADS?" "CANONICAL?" "NAV LINKS" "RESULT"
for p in "${PATHS[@]}"; do
  code=$(curl -sL -o /tmp/pg -w "%{http_code}" "$BASE$p")
  canon=$(grep -o 'rel="canonical" href="[^"]*"' /tmp/pg | head -1 | sed 's/.*href="//;s/"//')
  canon_local="${canon/https:\/\/www.rkconsulting.co.nz/$BASE}"
  ccode=$(curl -sL -o /dev/null -w "%{http_code}" "$canon_local")
  nav=$(grep -o 'href="/[a-z-]*/"' /tmp/pg | sort -u | wc -l | tr -d ' ')
  if [ "$code" = "200" ] && [ "$ccode" = "200" ] && [ "$nav" -ge 5 ]; then r="OK"; else r="** PROBLEM **"; FAIL=1; fi
  printf "%-18s %-8s %-12s %-10s %s\n" "$p" "$code" "$ccode" "$nav" "$r"
done
echo
echo "Supporting files:"
for f in robots.txt sitemap.xml llms.txt ai.txt; do
  printf "  %-14s %s\n" "/$f" "$(curl -sL -o /dev/null -w '%{http_code}' "$BASE/$f")"
done
printf "  %-14s %s\n" "old URL" "$(curl -sL -o /dev/null -w '%{http_code}' "$BASE/pages/airtable.html")"
echo
if [ $FAIL -eq 0 ]; then
  echo "PASS - everything checks out."
else
  echo "FAIL - see the rows marked PROBLEM above."
  echo "If a CANONICAL column is not 200, the main indexing bug is not fixed."
fi
exit $FAIL
