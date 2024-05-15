const fs = require('fs');
const { ethers } = require("hardhat");

async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Read dummy data from JSON file
  const rawData = fs.readFileSync('./scripts/dummyData.json');
  const dummyData = JSON.parse(rawData);

  // Extract data from JSON object
  const stateNames = dummyData.stateNames;
  const cityNames = dummyData.cityNames;
  const candidateNames = dummyData.candidateNames;
  const candidateParties = dummyData.candidateParties;
  const candidateLogos = dummyData.candidateLogos;
  const durationInMinutes = dummyData.durationInMinutes;
  const users = dummyData.users.map(user => [user.name, user.adharNo, user.stateIndex, user.cityIndex]);

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(stateNames, cityNames, candidateNames, candidateParties, candidateLogos, durationInMinutes, users);
  await Voting_.deployed();
  console.log("Contract address:", Voting_.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
});
