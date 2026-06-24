# AWS EC2 + Next.js Deployment — Step-by-Step Learning Guide

**Purpose of this file:** This is a teaching checklist. Claude Code should go through this ONE STEP AT A TIME with the user (Yash) — explain what the step does, wait for confirmation that it's done (or help debug if it fails), then move to the next step. Do NOT dump all steps at once. Treat each `## Step` as a checkpoint.

**Context:** Yash is a final-year CS student, comfortable with Next.js/full-stack dev, but new to AWS EC2 deployment specifically. Explain AWS-specific concepts (security groups, key pairs, instance types) in plain language since this is new territory for him, but don't over-explain things he already knows (Node, npm, git, VS Code).

**Goal:** Deploy a simple Next.js app on an AWS EC2 instance, connected via VS Code Remote-SSH, end to end.

---

## Phase 1: AWS Account & EC2 Instance Setup

### Step 1 — AWS Account
- [ ] Confirm Yash has an AWS account (free tier is enough for this).
- [ ] Confirm billing/card is set up (AWS requires this even for free tier).
- Teach: free tier covers a `t2.micro` or `t3.micro` instance for 750 hrs/month for 12 months on new accounts.

### Step 2 — Launch an EC2 Instance
- [ ] Go to AWS Console → EC2 → "Launch Instance"
- [ ] Name the instance (e.g. `nextjs-test-server`)
- [ ] Choose AMI: **Amazon Linux 2023** (recommended — matches `yum` commands) or **Ubuntu 22.04** (uses `apt` instead — pick one and stay consistent)
- [ ] Instance type: `t2.micro` (free tier eligible)
- [ ] Create a new key pair:
  - Name it (e.g. `nextjs-key`)
  - Type: RSA, format: `.pem` (for VS Code/SSH; use `.ppk` only if using PuTTY)
  - **Download it immediately — AWS only lets you download once.**
- [ ] Network settings → Edit security group rules, allow:
  - SSH (port 22) — source: "My IP" (more secure) or "Anywhere" (easier for now)
  - HTTP (port 80)
  - Custom TCP, port 3000 (default Next.js dev/start port) — source: Anywhere, for testing
- [ ] Storage: default 8GB is fine for a simple app
- [ ] Click "Launch Instance"

Teach: explain what a security group is (a firewall — controls which ports/IPs can reach the server) and why port 22 (SSH) and 3000 (Next.js) need to be open.

### Step 3 — Get Connection Details
- [ ] Go to EC2 → Instances → click the instance → copy the **Public IPv4 address**
- [ ] Note the AMI type chosen in Step 2 (determines SSH username: `ec2-user` for Amazon Linux, `ubuntu` for Ubuntu AMIs)

✅ **Checkpoint:** Yash should now have: a running instance, a `.pem` file, a public IP, and a known username.

---

## Phase 2: Connect via VS Code (Remote-SSH)

### Step 4 — Set File Permissions on the Key (if on Mac/Linux/WSL)
```bash
chmod 400 path/to/nextjs-key.pem
```
(Skip if pure Windows without WSL — VS Code handles it fine.)

### Step 5 — Configure SSH in VS Code
- [ ] Ensure Remote-SSH extension is installed (already done)
- [ ] `Ctrl+Shift+P` → "Remote-SSH: Open SSH Configuration File" → pick the default config
- [ ] Add:
```
Host nextjs-server
  HostName <PUBLIC_IP_FROM_STEP_3>
  User ec2-user
  IdentityFile "C:/path/to/nextjs-key.pem"
```
- [ ] Save the file

### Step 6 — Connect
- [ ] `Ctrl+Shift+P` → "Remote-SSH: Connect to Host" → select `nextjs-server`
- [ ] Choose platform: Linux (if asked)
- [ ] Accept fingerprint prompt (`yes`) on first connect
- [ ] Open terminal in the new remote window, run `whoami` to confirm

✅ **Checkpoint:** `whoami` should print `ec2-user` (or `ubuntu`). This means SSH access works.

---

## Phase 3: Server Setup (Node, Git, PM2)

### Step 7 — Update System
```bash
sudo yum update -y
```
(Use `sudo apt update -y` instead if Ubuntu AMI)

### Step 8 — Install Git
```bash
sudo yum install -y git curl
```
(`sudo apt install -y git curl` for Ubuntu)

### Step 9 — Install Node.js via NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node -v
npm -v
```
Teach: explain why NVM is preferred over system Node (lets you switch Node versions easily, avoids permission issues with global installs).

✅ **Checkpoint:** `node -v` and `npm -v` return version numbers without error.

---

## Phase 4: Get the Project onto the Server

### Step 10 — Choose a Method
Two options — Claude Code should ask Yash which he prefers:
- **Option A (Git clone):** if the Next.js project is already pushed to GitHub. Simpler, recommended for a "simple test project."
  ```bash
  git clone <YOUR_REPO_URL>
  cd <YOUR_PROJECT_FOLDER>
  ```
- **Option B (Direct upload):** if the project only exists locally. Use VS Code's file explorer in the Remote-SSH window to drag files in, OR use `rsync`/`scp` from local terminal (excluding `node_modules` and `.git`):
  ```bash
  rsync -avz --exclude 'node_modules' --exclude '.git' -e "ssh -i path/to/key.pem" ./local-project ec2-user@<IP>:~/
  ```

✅ **Checkpoint:** Project folder exists on the server with `package.json` visible.

---

## Phase 5: Build & Run the App

### Step 11 — Install Dependencies
```bash
cd <project-folder>
npm install
```

### Step 12 — Build
```bash
npm run build
```
Teach: explain this compiles the production-optimized version of the Next.js app (different from `npm run dev`).

### Step 13 — Install PM2
```bash
npm install -g pm2
```
Teach: PM2 keeps the app running in the background and auto-restarts it if it crashes — without it, the app dies the moment you close the SSH session.

### Step 14 — Start the App with PM2
```bash
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```
- [ ] Run whatever command `pm2 startup` outputs (it's a `sudo` command — copy-paste and run it). This makes PM2 survive a server reboot.

✅ **Checkpoint:** `pm2 list` shows `nextjs-app` with status `online`.

---

## Phase 6: Verify Deployment

### Step 15 — Test in Browser
- [ ] Visit `http://<PUBLIC_IP>:3000` in a browser
- [ ] If it doesn't load, check:
  - Security group allows port 3000 inbound (Step 2)
  - `pm2 logs nextjs-app` for errors
  - App is actually listening on port 3000 (check `package.json` start script)

✅ **Final Checkpoint:** Next.js app loads successfully via the public IP.

---

## Phase 7 (Optional Stretch Goals — only if Yash wants to go further)

- [ ] Point a custom domain at the EC2 IP (Route 53 or any DNS provider)
- [ ] Install Nginx as a reverse proxy (so app runs on port 80/443 instead of exposing 3000 directly)
- [ ] Set up SSL with Certbot (Let's Encrypt) for HTTPS
- [ ] Set up a basic CI step (`git pull` + `npm install` + `npm run build` + `pm2 restart`) as an update workflow

---

## Notes for Claude Code (teaching style)
- Confirm completion of each checkbox before moving on — don't skip ahead.
- When Yash hits an error, ask for the exact error message/screenshot before suggesting a fix — don't guess.
- Explain AWS-specific concepts (security groups, AMIs, key pairs) since these are new to him; skip explaining things he already knows (npm, git basics, VS Code usage).
- This is a learning exercise — prioritize him understanding *why* each step matters, not just copy-pasting commands.