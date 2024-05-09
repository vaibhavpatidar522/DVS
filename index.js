require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pump = promisify(pipeline);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const ethers = require('ethers');

var port = 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})


// app.post("/vote", async (req, res) => {
//     var vote = req.body.vote;
//     console.log('-----', vote)
//     async function storeDataInBlockchain(vote) {
//         console.log("Adding the candidate in voting contract...");
//         const tx = await contractInstance.addCandidate(vote);
//         await tx.wait();
//     }
//     const bool = await contractInstance.getVotingStatus();
//     if (bool == true) {
//         await storeDataInBlockchain(vote);
        
//         res.send("The candidate has been registered in the smart contract");
//     }
//     else {
//         res.send("Voting is finished");
//     }
// });


app.post("/vote", async (req, res) => {
    const name = req.body.name;
    const logo = req.files.logo;

    
    console.log("Received candidate name:", name);
    console.log("Received logo file:", logo);
    
    async function storeDataInBlockchain(name, logoUrl) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(name, logoUrl);
        await tx.wait();
    }

    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        // Save logo to storage (e.g., Amazon S3)
        const logoUrl = await saveLogoToStorage(logo);
        
        // Add candidate to blockchain with logo URL
        await storeDataInBlockchain(name, logoUrl);
        
        res.send("The candidate has been registered in the smart contract");
    } else {
        res.send("Voting is finished");
    }
});



async function saveLogoToStorage(logo) {
    const uniqueFilename = uuidv4(); // Generate unique filename
    const fileName = `${uniqueFilename}.jpg`; // Assuming JPG format
    const uploadDirectory = `./public/uploads/`; // Destination directory

    try {
        // Check if the upload directory exists, if not, create it
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }

        const uploadPath = `${uploadDirectory}${fileName}`;

        // Move the uploaded file to the destination directory
        await logo.mv(uploadPath);

        // Generate URL for the saved image (you may need to replace this with your actual storage service URL)
        const imageUrl = `./public/uploads/${fileName}`;

        return imageUrl;
    } catch (error) {
        console.error("Error saving logo:", error);
        throw error; // Rethrow the error for handling in the caller function
    }
}

app.listen(port, function () {
    console.log("App is listening on http://localhost:3000")
});
