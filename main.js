let WALLET_CONNECTED = "";
let contractAddress = "0xa2b970cA6d93ccf3EF895c4C5190ee9736007416";
let contractAbi = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidateNames",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "_candidateLogos",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_durationInMinutes",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_logoUrl",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "logoUrl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllVotesOfCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "logoUrl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRemainingTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotingStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingEnd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingStart",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const connectMetamask = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    WALLET_CONNECTED = await signer.getAddress();
    var element = document.getElementById("metamasknotification");
    element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
}
const updatePieChart = (candidates) => {
  const voteCounts = candidates.map(candidate => Number(candidate.voteCount)); // Convert BigNumber to number
  const candidateNames = candidates.map(candidate => candidate.name);
  
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: candidateNames,
          datasets: [{
              label: 'Vote Counts',
              data: voteCounts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)'
                  // Add more colors as needed
              ],
              borderWidth: 1
          }]
      },  
      options: {
          // Additional options for customization
      }
  });
}

const addVote = async(i) => {
  
    if(WALLET_CONNECTED != 0) {
        var name = document.getElementById("vote");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        var cand = document.getElementById("cand");
        cand.innerHTML = "Please wait, adding a vote in the smart contract⌚";
        try {
          
          const tx = await contractInstance.vote(i);
          const c = await tx.wait();
          cand.innerHTML = "Vote added !!!🎉🎉";
        }catch (e) {
          cand.innerHTML = "You aalready voted for this account!🧐";
        }
    }
    else {
        var cand = document.getElementById("cand");
        cand.innerHTML = "Please connect metamask first🤧";
    }
}

function convertSecondsToDHMS(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
}

const voteStatus = async() => {
    if(WALLET_CONNECTED != 0) {
        var status = document.getElementById("status");
        var remainingTime = document.getElementById("time");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        const currentStatus = await contractInstance.getVotingStatus();
        const time = await contractInstance.getRemainingTime();
        console.log(time);
        status.innerHTML = currentStatus == 1 ? "Voting is currently open" : "Voting is finished";
        const remainingTimeInSeconds = parseInt(time, 16);

        const { days, hours, minutes, seconds } = convertSecondsToDHMS(remainingTimeInSeconds);

        remainingTime.innerHTML = `Remaining time is ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        // remainingTime.innerHTML = `Remaining time is ${parseInt(time, 16)} seconds`;
    }
    else {
        var status = document.getElementById("status");
        status.innerHTML = "Please connect metamask first";
    }
}

// const getAllCandidates = async() => {
//     if(WALLET_CONNECTED != 0) {
//         var p3 = document.getElementById("p3");
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
//         p3.innerHTML = "Please wait, getting all the candidates from the voting smart contract";
//         var candidates = await contractInstance.getAllVotesOfCandidates();
//         console.log(candidates);
//         var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];

//         for (let i = 0; i < candidates.length; i++) {
//             var row = table.insertRow();
//             var idCell = row.insertCell();
//             var logoCell = row.insertCell();
//             var descCell = row.insertCell();
//             var statusCell = row.insertCell();


//             // Create img element and set its attributes
//             var logoImg = document.createElement("img");
//             logoImg.src = "images/bjp.png";
//             logoImg.alt = "BJP Logo";
//             logoImg.height = 42;
//             logoImg.width = 42;

//             // Append img element to logoCell
//             idCell.innerHTML = i;
//             logoCell.appendChild(logoImg);
//             descCell.innerHTML = candidates[i].name;
//             statusCell.innerHTML = candidates[i].voteCount;
//         }

//         p3.innerHTML = "The tasks are updated"
//     }
//     else {
//         var p3 = document.getElementById("p3");
//         p3.innerHTML = "Please connect metamask first";
//     }
// }
const getAllCandidates = async () => {
  if (WALLET_CONNECTED != 0) {
      var p3 = document.getElementById("p3");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      p3.innerHTML = "Please wait, getting all the candidates from the voting smart contract";
      var candidates = await contractInstance.getAllVotesOfCandidates();
      console.log(candidates);
      
      updatePieChart(candidates);
      var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];

      for (let i = 0; i < candidates.length; i++) {
          var row = table.insertRow();
          var idCell = row.insertCell();
          var logoCell = row.insertCell();
          var descCell = row.insertCell();
          var statusCell = row.insertCell();
          console.log(candidates[i])
          // Create img element and set its attributes
          var logoImg = document.createElement("img");
          logoImg.src =  candidates[i].logoUrl; // Set the source of the image to the logo URL from the contract
          logoImg.alt = candidates[i].name + " Logo"; // Set alt attribute for accessibility
          logoImg.height = 42; // Set height of the image
          logoImg.width = 42; // Set width of the image

          // Append img element to logoCell
          idCell.innerHTML = i;
          logoCell.appendChild(logoImg);
          descCell.innerHTML = candidates[i].name;
          statusCell.innerHTML = candidates[i].voteCount;
      }

      p3.innerHTML = "The tasks are updated";
  } else {
      var p3 = document.getElementById("p3");
      p3.innerHTML = "Please connect metamask first";
  }
}
const getAllCandidatesForVote = async() => {
    if(WALLET_CONNECTED != 0) {
        var p3 = document.getElementById("p3");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        p3.innerHTML = "Please wait, getting all the candidates from the voting smart contract";
        var candidates = await contractInstance.getAllVotesOfCandidates();
        console.log(candidates);
        var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];

        for (let i = 0; i < candidates.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell();
            var logoCell = row.insertCell();
            var descCell = row.insertCell();
            var buttonCell = row.insertCell();


            // Create img element and set its attributes
            var logoImg = document.createElement("img");
            logoImg.src = candidates[i].logoUrl; // Set the source of the image to the logo URL from the contract
            logoImg.alt = candidates[i].name + " Logo"; // Set alt attribute for accessibility
            logoImg.height = 42; // Set height of the image
            logoImg.width = 42; // Set width of the image
            
            // Append img element to logoCell
            idCell.innerHTML = i;
            logoCell.appendChild(logoImg);
            descCell.innerHTML = candidates[i].name;
            
          // Create button element
          var voteButton = document.createElement("button");
          voteButton.className = "btn waves-effect waves-light";
          voteButton.type = "button"; // Change type to "button" to prevent form submission
          voteButton.name = "action";
          voteButton.value = i; // Set the value of the button to the index
          voteButton.innerHTML = "Vote";
          
          // Attach onclick functionality to the button
          voteButton.onclick = function() {
              addVote(i); // Call addVote function with index i when button is clicked
          };

          // Append button element to buttonCell
          buttonCell.appendChild(voteButton);
        }

        p3.innerHTML = "The tasks are updated"
    }
    else {
        var p3 = document.getElementById("p3");
        p3.innerHTML = "Please connect metamask first";
    }
}

