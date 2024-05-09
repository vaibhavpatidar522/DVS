async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(["BJP" , "CONGRESS"], ["./public/uploads/55f5a257-ed0d-4a63-ac5c-50474241f325.jpg" , "./public/uploads/c7fdf906-277b-48ac-a17e-3e144b40e7bc.jpg"] , 60);
  console.log("Contract address:", Voting_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });



//  npx hardhat compile
// npx hardhat run --network volta scripts/deploy.js