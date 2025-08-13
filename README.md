# ⚠️ DISCLAIMER ⚠️

**THIS SCRIPT LOGS INTO YOUR ACCOUNT FROM A SERVER THAT BELONGS TO GITHUB**  
**THIS COULD RESULT IN PUNISHMENT FROM DUGOUT-ONLINE**  
**YOU COULD GET BANNED**
**USE AT YOUR OWN RISK**

# dugout-monday-bot

This project uses **GitHub Actions Workflows** to run an automated script on **GitHub’s servers** at scheduled times:

- **Every Monday at 12:00 UTC**
- **Every Tuesday at 00:00 UTC**

The script automatically logs into your account at the above times and moves players around accordingly to avoid brawls.

---

## ⚙️ How It Works

The workflow is scheduled using GitHub Actions’ `cron` syntax.  
It runs entirely on GitHub’s infrastructure, so **you don’t need your own server** — just set it up once and it will keep running as long as the repository stays active.

---

## 📋 Setup Instructions

1. Go to your repository on GitHub.
2. Navigate to **Settings → Secrets and variables → Actions**.
3. Click **New repository secret**.
4. Set the **Name** to: **CREDENTIALS**
5. Set the Value to your credentials in JSON format:
   {
   "username": "YOUR*USERNAME",
   "password": "YOUR_PASSWORD",
   "cookie": "PHPSESSID=\*\*\_A RANDOM STRING OF CHARS/NUMBERS*\*\*"
   }

## ⚠️ Important Note

GitHub automatically disables scheduled workflows after 60 days of inactivity (no commits, pull requests, or other activity in the repo).
To keep your workflow running:

- Make a small commit

- Merge a pull request
  ...or take any other action in the repo at least once every 60 days.
