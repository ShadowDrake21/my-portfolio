const { writeFileSync } = require("fs");
const targetPath = "./src/environment.development.ts";

const envConfigFile = `
export const environment = {
  github_access_token: '${process.env.GIHUB_ACCESS_TOKEN}',
};
`;

writeFileSync(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Environment variables written to ${targetPath}`);
  }
});
