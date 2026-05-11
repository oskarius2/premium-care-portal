const duplicateProjectPrefixes = ["novumestik"];

const deploymentUrl = (process.env.VERCEL_URL ?? "").toLowerCase();
const productionUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").toLowerCase();

const matchesDuplicateProject = (prefix) =>
  deploymentUrl === `${prefix}.vercel.app` ||
  deploymentUrl.startsWith(`${prefix}-`) ||
  productionUrl === `${prefix}.vercel.app` ||
  productionUrl.startsWith(`${prefix}-`);

if (duplicateProjectPrefixes.some(matchesDuplicateProject)) {
  console.log(
    `Skipping duplicate Vercel project deployment (${deploymentUrl || productionUrl}).`
  );
  process.exit(0);
}

console.log(
  `Continuing canonical Vercel deployment (${deploymentUrl || productionUrl || "unknown project"}).`
);
process.exit(1);
