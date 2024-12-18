const simpleGit = require("simple-git");
const cron = require("node-cron");
const fs = require("fs");

// Initialize Git in the current directory
const git = simpleGit();

// Configuration for the repository
const REPO_PATH = process.cwd();
const COMMIT_MESSAGE = "Automated commit";
const FILE_NAME = "auto-update.txt"; // File to be updated regularly
const BRANCH_NAME = "main"; // Branch to commit to

// Function to make changes and push commits
async function autoCommit() {
  try {
    console.log("Starting auto-commit process...");

    // Navigate to the repository
    process.chdir(REPO_PATH);

    // Add or update the file
    const timestamp = new Date().toISOString();
    fs.writeFileSync(FILE_NAME, `Last updated: ${timestamp}`, "utf8");

    console.log(`File "${FILE_NAME}" updated.`);

    // Stage changes
    await git.add(FILE_NAME);

    // Commit changes
    await git.commit(COMMIT_MESSAGE);

    // Push changes
    await git.push("origin", BRANCH_NAME);

    console.log("Changes pushed successfully.");
  } catch (error) {
    console.error("Error during auto-commit:", error);
  }
}

// Schedule the task
// This example runs the task every minute. Adjust the cron schedule as needed.
cron.schedule("* * * * *", () => {
  console.log("Running scheduled task...");
  autoCommit();
});
