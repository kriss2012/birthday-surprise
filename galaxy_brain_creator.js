const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runGraphQL(query) {
  const tempFile = 'temp_query.graphql';
  fs.writeFileSync(tempFile, query);
  try {
    const result = execSync(`gh api graphql -F query=@${tempFile}`, { stdio: 'pipe' }).toString();
    return JSON.parse(result);
  } catch (err) {
    console.error(err.stderr ? err.stderr.toString() : err.message);
    throw err;
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

function runCmd(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    return null;
  }
}

async function main() {
  console.log("Checking GitHub CLI status...");
  const authStatus = runCmd('gh auth status');
  if (!authStatus) {
    console.error("Please login to GitHub CLI first using: gh auth login");
    return;
  }

  const activeUserMatch = authStatus.match(/Logged in to github.com account (\S+)/);
  if (!activeUserMatch) {
    console.error("Could not determine active logged-in user from gh auth status.");
    return;
  }
  const activeUser = activeUserMatch[1];
  console.log(`Active logged in user: ${activeUser}`);

  let otherUser = '';
  if (activeUser.toLowerCase() === 'krishnapatil2006'.toLowerCase()) {
    otherUser = 'kriss2012';
  } else if (activeUser.toLowerCase() === 'kriss2012'.toLowerCase()) {
    otherUser = 'Krishnapatil2006';
  } else {
    console.error(`Unknown user: ${activeUser}`);
    return;
  }

  const repoName = 'galaxy-brain-quest';

  // 1. Create repo if not exists
  console.log(`Checking if repository ${activeUser}/${repoName} exists...`);
  const repoCheck = runCmd(`gh repo view ${activeUser}/${repoName}`);
  if (!repoCheck) {
    console.log(`Creating repository ${repoName}...`);
    runCmd(`gh repo create ${repoName} --public --description "Quest for Galaxy Brain achievement"`);
  }

  // 2. Enable discussions
  console.log("Enabling discussions on repository...");
  runCmd(`gh repo edit ${activeUser}/${repoName} --enable-discussions`);

  // 3. Fetch repo & category IDs
  console.log("Fetching repository information and discussion categories...");
  const infoQuery = `
  query {
    repository(owner: "${activeUser}", name: "${repoName}") {
      id
      discussionCategories(first: 10) {
        nodes {
          id
          name
          isAnswerable
        }
      }
    }
  }
  `;
  const infoResponse = runGraphQL(infoQuery);
  const repoId = infoResponse.data.repository.id;
  const qaCategory = infoResponse.data.repository.discussionCategories.nodes.find(n => n.isAnswerable && n.name === 'Q&A');

  if (!qaCategory) {
    console.error("Could not find an answerable Q&A category in discussions!");
    return;
  }
  const categoryId = qaCategory.id;

  // 4. Check existing discussions
  console.log("Checking for existing discussions...");
  const discussionsQuery = `
  query {
    repository(owner: "${activeUser}", name: "${repoName}") {
      discussions(first: 10) {
        nodes {
          id
          title
          url
          comments(first: 10) {
            nodes {
              id
              author {
                login
              }
              isAnswer
            }
          }
        }
      }
    }
  }
  `;
  const discResponse = runGraphQL(discussionsQuery);
  let discussions = discResponse.data.repository.discussions.nodes;

  if (discussions.length < 2) {
    console.log("Creating 2 discussion threads under Q&A category...");
    for (let i = 1; i <= 2; i++) {
      const createMutation = `
      mutation {
        createDiscussion(input: {
          repositoryId: "${repoId}",
          categoryId: "${categoryId}",
          title: "Help needed on project topic ${i}",
          body: "Please help me resolve this question. Leave a comment below with your suggested solution!"
        }) {
          discussion {
            id
            url
          }
        }
      }
      `;
      const res = runGraphQL(createMutation);
      console.log(`Discussion ${i} created: ${res.data.createDiscussion.discussion.url}`);
    }

    console.log("\n========================================================");
    console.log(`🚀 Step 1 Complete! Discussions created successfully.`);
    console.log("========================================================");
    console.log(`Now, open the links printed above in your browser (or switch accounts)`);
    console.log(`while logged in as: ${otherUser}`);
    console.log(`Write a comment on BOTH discussions (e.g. "Here is the solution to problem ${activeUser}").`);
    console.log(`\nAfter leaving a comment on both, run this script again:`);
    console.log(`node galaxy_brain_creator.js`);
    return;
  }

  // If discussions exist, let's look for comments from otherUser to accept
  console.log("Checking if there are comments from the other user to accept...");
  let acceptedCount = 0;

  for (const disc of discussions) {
    const acceptedComment = disc.comments.nodes.find(c => c.isAnswer);
    if (acceptedComment) {
      console.log(`Discussion "${disc.title}" already has an accepted answer.`);
      acceptedCount++;
      continue;
    }

    const candidateComment = disc.comments.nodes.find(c => c.author && c.author.login.toLowerCase() === otherUser.toLowerCase());
    if (candidateComment) {
      console.log(`Found candidate comment from ${otherUser} in "${disc.title}". Marking as accepted answer...`);
      const acceptMutation = `
      mutation {
        markDiscussionCommentAsAnswer(input: { id: "${candidateComment.id}" }) {
          discussion {
            id
          }
        }
      }
      `;
      runGraphQL(acceptMutation);
      console.log(`Successfully marked comment in "${disc.title}" as accepted answer!`);
      acceptedCount++;
    } else {
      console.log(`No comment from ${otherUser} found yet in "${disc.title}".`);
      console.log(`Please go to: ${disc.url} and comment on it using account "${otherUser}".`);
    }
  }

  if (acceptedCount >= 2) {
    console.log("\n========================================================");
    console.log(`🎉 SUCCESS! 2 replies from ${otherUser} have been marked as accepted answers.`);
    console.log(`🏆 ${otherUser} is now eligible for the GALAXY BRAIN achievement!`);
    console.log("========================================================");
    console.log("It will take up to 24 hours for GitHub to award the badge.");
    console.log("\nTo earn Galaxy Brain for the other account:");
    console.log(`1. Run: gh auth login and log in as: ${otherUser}`);
    console.log(`2. Run: node galaxy_brain_creator.js`);
  } else {
    console.log(`\nCurrently ${acceptedCount}/2 accepted answers configured.`);
    console.log(`Please make sure you have commented on BOTH discussions with ${otherUser}.`);
  }
}

main().catch(console.error);
