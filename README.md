# Spot the Phish: Security Awareness Program

A lightweight static site (plain HTML/CSS/JS, no build step, about 20 KB) for a university phishing-awareness project.

**Flow:** consent → pre-quiz (Google Form) → learn → post-quiz (Google Form) → feedback.

## Setup (about 10 minutes)

1. **Create 3 Google Forms** (see suggested questions below).
2. In each Form: *Send → `<>` tab → copy the `src` URL*.
3. Paste the URLs and your contact email into the `CONFIG` block at the top of `script.js`.
4. Deploy: on vercel.com choose **Add New → Project → import this repo**. Leave all settings at the defaults. There is no build command and no output directory.

## Ethics and data (matches the assignment rules)

- **Informed consent:** the page shows a consent notice and keeps the forms locked until the box is ticked. The Google Forms don't even load before then.
- **Anonymity:** no names or emails are collected. In each Form, leave **"Collect email addresses" OFF** and **"Limit to 1 response / require sign-in" OFF** (this keeps responses anonymous). Participants may enter an optional nickname to link their pre and post answers.
- **Aggregate reporting only:** report group averages and counts, never individual rows. Delete the raw response sheet after the report is marked.
- **Adults only (18+):** the consent states this.
- **Accessibility:** semantic HTML, a skip link, keyboard-operable controls, visible focus, reduced-motion and dark-mode support, and no information carried by colour alone.
- **Safe content:** all examples are fictional. No real credentials are collected and no fake login pages are used.

## Suggested quiz design (use the same core questions in pre and post, reordered)

**Knowledge (scored, quiz mode ON, 1 point each)**
1. Which sender address is suspicious? (screenshots of 4 options)
2. What should you do first with an unexpected "password expired" email?
3. A link says `bank.com` but hovering shows another domain. This is: …
4. Which attachment type is most risky? (.pdf / .zip / .txt / .jpg)
5. Is it safe to give an OTP to a caller from "your bank"?
6. Spot the phish: 5 screenshots, each Real/Fake.

**Behaviour and confidence (1–5 scale, not scored)**
7. I check the sender's real address before clicking.
8. I hover over links before clicking.
9. I use 2FA on my main accounts.
10. How confident are you in spotting a phishing email?

**Optional nickname** (short answer, shown as "optional, any word you will remember").
**Pre only:** age group, year of study (broad bands, no identifiers).

## Feedback Form (post)
- Was the content clear? (1–5)
- What was most useful?
- What would you change?
- Any accessibility problems? (optional)

## Measuring social media (assignment section 3c and 5)
Record reach, likes, shares, comments and poll results from each platform's analytics after each post in a spreadsheet, and summarise them in the report. Don't name commenters in the report.
