# AWS EC2 Deployment Notes — Personal Reference

## What we're doing
Deploying a Next.js app on an AWS EC2 instance, connected via VS Code Remote-SSH.

---

## Phase 1: AWS Setup

### Step 1 — AWS Account
- Need a free AWS account at aws.amazon.com
- Card/billing required even for free tier
- `t3.micro` = free tier eligible (750 hrs/month for 12 months on new accounts)

### Step 2 — Launch EC2 Instance
1. AWS Console → EC2 → "Launch Instance"
2. Name the instance (e.g. `PortfolioWebsite`)
3. AMI: **Amazon Linux 2023** (uses `yum` commands)
4. Instance type: `t3.micro` (free tier — t2.micro may not be available in all regions)
5. Key pair:
   - Create new → Name it (e.g. `portfolio-key`)
   - Type: RSA, Format: `.pem`
   - **Download immediately — AWS only lets you download once**
   - Save it somewhere you'll remember (e.g. inside the project folder)
6. Network / Security Group — allow these ports:
   - SSH — port 22 — Anywhere
   - HTTP — port 80 — Anywhere
   - Custom TCP — port 3000 — Anywhere (Next.js runs here)
7. Storage: 8 GiB default is fine
8. Click "Launch Instance"

### Step 3 — Get Connection Details
- EC2 → Instances → click your instance
- Copy the **Public IPv4 address**
- Username for Amazon Linux = `ec2-user`

---

## Phase 2: Connect via VS Code Remote-SSH

### Step 4 — Fix .pem File Permissions (Windows REQUIRED)
SSH on Windows refuses to use a .pem file if other users/groups can read it.
Run these in PowerShell every time you download a new .pem file:

```powershell
icacls "C:\path\to\your-key.pem" /inheritance:r
```
Word by word:
- `icacls` — Windows tool to view/change file permissions
- `"C:\path\to\your-key.pem"` — the file you want to fix
- `/inheritance:r` — REMOVE all inherited permissions (permissions passed down from the parent folder). After this, only explicitly set permissions remain.

```powershell
icacls "C:\path\to\your-key.pem" /remove "NT AUTHORITY\Authenticated Users" /remove "BUILTIN\Users" /grant:r "$($env:USERNAME):R"
```
Word by word:
- `icacls "C:\path\to\your-key.pem"` — target the key file
- `/remove "NT AUTHORITY\Authenticated Users"` — remove access for ALL logged-in Windows users (this is the group SSH complains about)
- `/remove "BUILTIN\Users"` — remove access for the built-in Users group as well
- `/grant:r "$($env:USERNAME):R"` — grant READ-only access exclusively to YOU (your current Windows username). The `:R` means Read permission.

> Rule of thumb: any new .pem from AWS needs these two commands before SSH will accept it on Windows.

### Step 5 — Configure SSH in VS Code
1. `Ctrl+Shift+P` → "Remote-SSH: Open SSH Configuration File" → pick default (`C:\Users\<you>\.ssh\config`)
2. Add this block (use forward slashes in the path):

```
Host portfolio-server
  HostName <YOUR_PUBLIC_IP>
  User ec2-user
  IdentityFile "D:/path/to/portfolio-key.pem"
```

Word by word:
- `Host portfolio-server` — a nickname you give this connection (can be anything, used in step 6)
- `HostName` — the actual public IP of your EC2 instance
- `User ec2-user` — the Linux username on the server (Amazon Linux always uses `ec2-user`)
- `IdentityFile` — path to your .pem key file (use forward slashes on Windows)

3. Save with `Ctrl+S`

> For a new instance in future: just update `HostName` to the new IP.
> For a different key: update `IdentityFile` path and run the icacls commands on the new .pem file.

### Step 6 — Connect
1. `Ctrl+Shift+P` → "Remote-SSH: Connect to Host" → select `portfolio-server`
2. Choose **Linux** if asked
3. Accept fingerprint on first connect
4. Terminal should show `[ec2-user@ip-xxx ~]$`

Verify with:
```bash
whoami
```
- `whoami` — prints the current logged-in username. Should print `ec2-user`.

---

## Phase 3: Server Setup

### Step 7 — Update System
```bash
sudo yum update -y
```
Word by word:
- `sudo` — run as superuser (admin). Required for system-level operations.
- `yum` — the package manager for Amazon Linux (like apt for Ubuntu, or npm for Node)
- `update` — check for and download newer versions of all installed packages
- `-y` — automatically answer "yes" to all prompts (so it doesn't pause and ask you)

### Step 8 — Install Git & Curl
```bash
sudo yum install -y git curl
```
Word by word:
- `sudo yum install` — install new packages using the package manager
- `-y` — auto-confirm all prompts
- `git` — version control tool (needed to clone your project from GitHub)
- `curl` — tool to make HTTP requests from terminal (needed to download the NVM installer in next step)

### Step 9 — Install Node.js via NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
Word by word:
- `curl` — makes an HTTP request to fetch the file at that URL
- `-o-` — output the response to stdout (the terminal) instead of saving to a file
- `https://...install.sh` — the NVM installer script URL
- `|` — pipe: takes the output of curl and passes it as input to the next command
- `bash` — runs the piped script using the bash shell

```bash
source ~/.bashrc
```
Word by word:
- `source` — execute a file in the current shell session (applies changes immediately without restarting)
- `~/.bashrc` — the bash config file in your home directory. NVM adds itself here; sourcing it activates NVM right now.

```bash
nvm install 18
```
- `nvm` — Node Version Manager (what we just installed)
- `install 18` — download and install Node.js version 18

```bash
nvm use 18
```
- `use 18` — switch the active Node version to 18

```bash
node -v
npm -v
```
- `node -v` — print the installed Node.js version (verify it worked)
- `npm -v` — print the installed npm version (npm comes bundled with Node)

> Why NVM and not system Node? Lets you switch Node versions per project, avoids needing sudo for global installs.

---

## Phase 4: Get Project onto Server

Two options — pick one:

### Option A — Git Clone (if project is on GitHub)
```bash
git clone <YOUR_REPO_URL>
```
Word by word:
- `git clone` — download a full copy of a git repository from a remote URL
- `<YOUR_REPO_URL>` — the HTTPS or SSH URL of your GitHub repo

```bash
cd <YOUR_PROJECT_FOLDER>
```
- `cd` — change directory (navigate into the folder)

### Option B — Upload from Local (if project is only local)
Run this from your **local** machine terminal (not the server):
```bash
rsync -avz --exclude 'node_modules' --exclude '.git' -e "ssh -i path/to/key.pem" ./local-project ec2-user@<IP>:~/
```
Word by word:
- `rsync` — tool to sync/copy files efficiently between machines
- `-a` — archive mode: preserves file structure, permissions, timestamps
- `-v` — verbose: shows each file being transferred
- `-z` — compress data during transfer (faster over network)
- `--exclude 'node_modules'` — skip node_modules folder (huge, unnecessary — server will install its own)
- `--exclude '.git'` — skip the git history folder
- `-e "ssh -i path/to/key.pem"` — use SSH with your key as the transfer method
- `./local-project` — your local project folder
- `ec2-user@<IP>:~/` — destination: home folder on the server

Verify:
```bash
ls
```
- `ls` — list files in current directory. Should show your project folder.

---

## Phase 5: Build & Run

### Step 11 — Install Dependencies
```bash
cd <project-folder>
npm install
```
Word by word:
- `cd <project-folder>` — navigate into your project directory
- `npm install` — reads package.json and downloads all required packages into node_modules

### Step 12 — Build
```bash
npm run build
```
Word by word:
- `npm run` — execute a script defined in package.json
- `build` — the script name. For Next.js this compiles and optimizes the app for production (creates the `.next` folder).

> Different from `npm run dev` which runs an unoptimized development server.

### Step 13 — Install PM2
```bash
npm install -g pm2
```
Word by word:
- `npm install` — install a package
- `-g` — globally (available as a terminal command anywhere, not just inside this project)
- `pm2` — Process Manager 2. Keeps your app running in the background even after you close SSH.

> Without PM2: app dies the moment you close the terminal. With PM2: app keeps running forever.

### Step 14 — Start with PM2
```bash
pm2 start npm --name "nextjs-app" -- start
```
Word by word:
- `pm2 start` — tell PM2 to launch and manage a process
- `npm` — the program to run (we're running npm, not node directly)
- `--name "nextjs-app"` — give this process a nickname in PM2's list
- `-- start` — the argument to pass to npm (so PM2 runs `npm start`, which runs Next.js)

```bash
pm2 save
```
- `pm2 save` — save the current list of running processes to disk so PM2 remembers them after a reboot

```bash
pm2 startup
```
- `pm2 startup` — generates a system command to make PM2 auto-start on server reboot. Copy-paste the `sudo` command it outputs and run it.

Verify:
```bash
pm2 list
```
- `pm2 list` — show all processes PM2 is managing. `nextjs-app` should show status `online`.

---

## Phase 6: Verify

### Step 15 — Open in Browser
Visit: `http://<PUBLIC_IP>:3000`

If it doesn't load, check:
- Security group has port 3000 open (Step 2)
- Run `pm2 logs nextjs-app` to see error output
- Check `package.json` start script — app must listen on port 3000

---

## Quick Reference — Common Commands on Server

```bash
pm2 list                    # see all running apps and their status
pm2 logs nextjs-app         # stream live logs from the app
pm2 restart nextjs-app      # restart the app (e.g. after code change)
pm2 stop nextjs-app         # stop the app without removing it from PM2

# Update app after a code change:
git pull                    # pull latest code from GitHub
npm install                 # install any new dependencies
npm run build               # rebuild the production bundle
pm2 restart nextjs-app      # restart so the new build is served
```

---

## Optional Next Steps
- Point a custom domain at the EC2 IP (Route 53 or any DNS provider)
- Install Nginx as reverse proxy (run on port 80 instead of exposing 3000 directly)
- SSL with Certbot (Let's Encrypt) for HTTPS
