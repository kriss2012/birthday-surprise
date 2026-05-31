const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Target details
const ACCOUNTS = {
  Krishnapatil2006: {
    username: 'Krishnapatil2006',
    email: '141225260+Krishnapatil2006@users.noreply.github.com'
  },
  kriss2012: {
    username: 'kriss2012',
    email: '179607368+kriss2012@users.noreply.github.com'
  }
};

function run(cmd, cwd = process.cwd()) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe' }).toString().trim();
  } catch (err) {
    console.error(`Error executing: ${cmd}`);
    console.error(err.stderr ? err.stderr.toString() : err.message);
    throw err;
  }
}

async function main() {
  console.log("Checking GitHub CLI status...");
  let authStatus;
  try {
    authStatus = run('gh auth status');
    console.log(authStatus);
  } catch (e) {
    console.error("Please login to GitHub CLI first using: gh auth login");
    return;
  }

  // Get active username
  const activeUserMatch = authStatus.match(/Logged in to github.com account (\S+)/);
  if (!activeUserMatch) {
    console.error("Could not determine active logged-in user from gh auth status.");
    return;
  }
  const activeUser = activeUserMatch[1];
  console.log(`Active logged in user: ${activeUser}`);

  // Determine co-author
  let coAuthorName = '';
  let coAuthorEmail = '';

  if (activeUser.toLowerCase() === 'krishnapatil2006'.toLowerCase()) {
    coAuthorName = ACCOUNTS.kriss2012.username;
    coAuthorEmail = ACCOUNTS.kriss2012.email;
  } else if (activeUser.toLowerCase() === 'kriss2012'.toLowerCase()) {
    coAuthorName = ACCOUNTS.Krishnapatil2006.username;
    coAuthorEmail = ACCOUNTS.Krishnapatil2006.email;
  } else {
    console.error(`Unknown active user ${activeUser}. Expected kriss2012 or Krishnapatil2006.`);
    return;
  }

  const repoName = `github-badges-${activeUser.toLowerCase()}`;
  const tempDir = path.join(process.cwd(), repoName);

  // Clean up any existing local temp dir
  if (fs.existsSync(tempDir)) {
    console.log(`Cleaning up existing local directory ${repoName}...`);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(`Creating public repository: ${repoName}...`);
  try {
    run(`gh repo create ${repoName} --public --description "Unlocking GitHub achievements"`);
  } catch (e) {
    console.log("Repo might already exist on remote. We will try to proceed...");
  }

  // Clone repo
  console.log(`Cloning ${repoName}...`);
  run(`gh repo clone ${repoName}`);

  // Setup git config in the repo
  console.log("Setting up local git config...");
  run(`git config user.name "${activeUser}"`, tempDir);
  run(`git config user.email "${activeUser}@users.noreply.github.com"`, tempDir);

  // Initialize readme
  console.log("Creating initial commit...");
  fs.writeFileSync(path.join(tempDir, 'README.md'), `# Badges Repo\n\nUnlocked badges repository for ${activeUser}`);
  run(`git add README.md`, tempDir);
  run(`git commit -m "Initial commit"`, tempDir);
  run(`git branch -M main`, tempDir);
  run(`git push -u origin main`, tempDir);

  // Create PR 1
  console.log("Creating PR 1 (for YOLO, Pull Shark, Pair Extraordinaire, and Quickdraw)...");
  run(`git checkout -b pr-1`, tempDir);
  fs.writeFileSync(path.join(tempDir, 'test.txt'), `Hello World!\nCo-authored by ${coAuthorName}`);
  run(`git add test.txt`, tempDir);
  
  // Commit with Co-authored-by to unlock Pair Extraordinaire
  const commitMsg = `Add test file\n\nCo-authored-by: ${coAuthorName} <${coAuthorEmail}>`;
  fs.writeFileSync(path.join(tempDir, 'commit.txt'), commitMsg);
  run(`git commit -F commit.txt`, tempDir);
  fs.unlinkSync(path.join(tempDir, 'commit.txt'));

  // Push
  console.log("Pushing branch pr-1...");
  run(`git push origin pr-1`, tempDir);

  // Create and merge PR
  console.log("Opening PR on GitHub...");
  run(`gh pr create --title "PR 1 for badges" --body "Unlocking achievements" --head pr-1`, tempDir);
  console.log("Merging PR on GitHub immediately...");
  run(`gh pr merge --merge --delete-branch`, tempDir);

  // Create PR 2 (for Pull Shark x2)
  console.log("Creating PR 2 (to unlock Pull Shark x2)...");
  run(`git checkout main`, tempDir);
  run(`git pull`, tempDir);
  run(`git checkout -b pr-2`, tempDir);
  fs.writeFileSync(path.join(tempDir, 'test2.txt'), `Hello again!\nCo-authored by ${coAuthorName}`);
  run(`git add test2.txt`, tempDir);

  const commitMsg2 = `Add test2 file\n\nCo-authored-by: ${coAuthorName} <${coAuthorEmail}>`;
  fs.writeFileSync(path.join(tempDir, 'commit2.txt'), commitMsg2);
  run(`git commit -F commit2.txt`, tempDir);
  fs.unlinkSync(path.join(tempDir, 'commit2.txt'));

  console.log("Pushing branch pr-2...");
  run(`git push origin pr-2`, tempDir);

  console.log("Opening PR 2 on GitHub...");
  run(`gh pr create --title "PR 2 for badges" --body "Unlocking Pull Shark x2" --head pr-2`, tempDir);
  console.log("Merging PR 2 on GitHub immediately...");
  run(`gh pr merge --merge --delete-branch`, tempDir);

  // Cleanup local files
  console.log("Cleaning up local clone folder...");
  process.chdir(process.cwd()); // make sure we aren't in the directory we want to delete
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log("\n========================================================");
  console.log(`🎉 SUCCESS! Achievements triggered for ${activeUser}!`);
  console.log(`🤝 Pair Extraordinaire co-author credit sent to ${coAuthorName}!`);
  console.log("========================================================");
  console.log(`Created public repo: https://github.com/${activeUser}/${repoName}`);
  console.log("Please do NOT delete the repository immediately! Keep it public for at least 24 hours so GitHub processes and awards your badges.");
  console.log("\nTo unlock badges for the other account:");
  console.log("1. Switch GitHub CLI account by running: gh auth login");
  console.log("2. Run the script again: node unlock_badges.js");
}

main().catch(console.error);
