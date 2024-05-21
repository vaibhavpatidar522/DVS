let states = ["Andhra Pradesh", "Maharashtra", "Tamil Nadu"];

let WALLET_CONNECTED = "";
let contractAddress = "0x86bd203A0CC7C0196A8280cAA4E7B3b4CE31780e";
let contractAbi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_stateNames",
        type: "string[]",
      },
      {
        internalType: "string[][]",
        name: "_cityNames",
        type: "string[][]",
      },
      {
        internalType: "string[][][]",
        name: "_candidateNames",
        type: "string[][][]",
      },
      {
        internalType: "string[][][]",
        name: "_candidateParties",
        type: "string[][][]",
      },
      {
        internalType: "string[][][]",
        name: "_candidateLogos",
        type: "string[][][]",
      },
      {
        internalType: "uint256",
        name: "_durationInMinutes",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "adharNo",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "stateIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityIndex",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.User[]",
        name: "_users",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stateIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cityIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_party",
        type: "string",
      },
      {
        internalType: "string",
        name: "_logoUrl",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllVotesOfCandidates",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stateIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cityIndex",
        type: "uint256",
      },
    ],
    name: "getCandidateVotesInCity",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_adharNo",
        type: "string",
      },
    ],
    name: "getCandidatesForVoter",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "adharNo",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "stateIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityIndex",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.User",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party",
            type: "string",
          },
          {
            internalType: "string",
            name: "logoUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStateCityInfo",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "string[][]",
        name: "",
        type: "string[][]",
      },
      {
        internalType: "uint256[][]",
        name: "",
        type: "uint256[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "states",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "adharNo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "stateIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cityIndex",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_adharNo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_stateIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cityIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_candidateIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const connectMetamask = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  WALLET_CONNECTED = await signer.getAddress();
  contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
  const element = document.getElementById("metamasknotification");
  // const listval = document.getElementById("p3");
  element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
  // listval.innerHTML = "Metamask is connected ";

  if (window.location.pathname == "/ListVoters.html") {
    loadStateCityDropdown(); // Load dropdowns after connection
  }
};

async function loadStateCityDropdown() {
  if (!contractInstance) {
    alert("Contract instance is not initialized.");
    return;
  }
  try {
    const [stateNames, stateIndices, cityNames, cityIndices] =
      await contractInstance.getStateCityInfo();
    const stateSelect = document.getElementById("stateSelect");
    const citySelect = document.getElementById("citySelect");

    stateSelect.innerHTML = "";
    for (let i = 0; i < stateNames.length; i++) {
      const option = document.createElement("option");
      option.value = stateIndices[i];
      option.text = stateNames[i];
      stateSelect.appendChild(option);
    }

    if (stateNames.length > 0) {
      citySelect.innerHTML = "";
      for (let i = 0; i < cityNames[0].length; i++) {
        const option = document.createElement("option");
        option.value = cityIndices[0][i];
        option.text = cityNames[0][i];
        citySelect.appendChild(option);
      }
    }

    stateSelect.addEventListener("change", updateCityDropdown);
    stateSelect.addEventListener("change", updateStateGraph);
    citySelect.addEventListener("change", updateCityGraph);

    updateStateGraph();
    updateCityGraph();

    updateOverallWinnerGraph();
  } catch (error) {
    console.error(error);
    alert("Failed to load state and city information. Please try again.");
  }
}

async function updateCityDropdown() {
  if (!contractInstance) {
    alert("Contract instance is not initialized.");
    return;
  }
  const stateIndex = document.getElementById("stateSelect").value;
  try {
    const [_, __, cityNames, cityIndices] =
      await contractInstance.getStateCityInfo();
    const citySelect = document.getElementById("citySelect");

    citySelect.innerHTML = "";
    for (let i = 0; i < cityNames[stateIndex].length; i++) {
      const option = document.createElement("option");
      option.value = cityIndices[stateIndex][i];
      option.text = cityNames[stateIndex][i];
      citySelect.appendChild(option);
    }

    updateCityGraph(); // Update city graph when city dropdown changes
  } catch (error) {
    console.error(error);
    alert("Failed to update city dropdown. Please try again.");
  }
}

async function updateStateGraph() {
  if (!contractInstance) {
    alert("Contract instance is not initialized.");
    return;
  }
  const stateIndex = document.getElementById("stateSelect").value;
  try {
    const stateVotes = await contractInstance.getCandidateVotesInCity(
      stateIndex,
      0
    );
    const stateParties = stateVotes[1];
    const stateVoteCounts = stateVotes[2].map((votes) => parseInt(votes));

    const statePartyVoteData = {};
    stateParties.forEach((party, index) => {
      if (!statePartyVoteData[party]) {
        statePartyVoteData[party] = 0;
      }
      statePartyVoteData[party] += stateVoteCounts[index];
    });

    const partyNames = Object.keys(statePartyVoteData);
    const partyVotes = Object.values(statePartyVoteData);

    // Update state party votes table
    const statePartyTable = document
      .getElementById("statePartyTable")
      .getElementsByTagName("tbody")[0];
    statePartyTable.innerHTML = "";
    for (let i = 0; i < partyNames.length; i++) {
      const row = statePartyTable.insertRow();
      const partyCell = row.insertCell();
      const votesCell = row.insertCell();
      partyCell.innerHTML = partyNames[i];
      votesCell.innerHTML = partyVotes[i];
    }

    // Draw chart
    const ctx = document.getElementById("stateBarGraph").getContext("2d");
    if (window.stateBarChart) {
      window.stateBarChart.destroy();
    }

    window.stateBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: partyNames,
        datasets: [
          {
            label: "Votes by Party",
            data: partyVotes,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Display winner party from the selected state
    const stateWinnerParty =
      partyNames[partyVotes.indexOf(Math.max(...partyVotes))];
    document.getElementById(
      "stateWinner"
    ).innerHTML = `Winner Party from Selected State: ${stateWinnerParty}`;
  } catch (error) {
    console.error(error);
    alert("Failed to load state results. Please try again.");
  }
}

async function updateCityGraph() {
  if (!contractInstance) {
    alert("Contract instance is not initialized.");
    return;
  }
  const stateIndex = document.getElementById("stateSelect").value;
  const cityIndex = document.getElementById("citySelect").value;
  try {
    const cityVotes = await contractInstance.getCandidateVotesInCity(
      stateIndex,
      cityIndex
    );
    const candidateNames = cityVotes[0];
    const candidateParty = cityVotes[1];
    const candidateVotes = cityVotes[2].map((votes) => parseInt(votes));

    // Update city candidate votes table
    const cityCandidateTable = document
      .getElementById("cityCandidateTable")
      .getElementsByTagName("tbody")[0];
    cityCandidateTable.innerHTML = "";
    for (let i = 0; i < candidateNames.length; i++) {
      const row = cityCandidateTable.insertRow();
      const candidateCell = row.insertCell();
      const partyCell = row.insertCell();
      const votesCell = row.insertCell();
      candidateCell.innerHTML = candidateNames[i];
      partyCell.innerHTML = candidateParty[i];
      votesCell.innerHTML = candidateVotes[i];
    }

    // Draw chart
    const ctx = document.getElementById("cityBarGraph").getContext("2d");
    if (window.cityBarChart) {
      window.cityBarChart.destroy();
    }

    window.cityBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: candidateNames,
        datasets: [
          {
            label: "Votes by Candidate",
            data: candidateVotes,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Display winner candidate from the selected city
    const cityWinnerCandidate =
      candidateNames[candidateVotes.indexOf(Math.max(...candidateVotes))];
    document.getElementById(
      "cityWinner"
    ).innerHTML = `Winner Candidate from Selected City: ${cityWinnerCandidate}`;
  } catch (error) {
    console.error(error);
    alert("Failed to load city results. Please try again.");
  }
}

function convertSecondsToDHMS(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
}

const getAllCandidatesForVote = async () => {
  if (WALLET_CONNECTED) {
    function isNumeric(input) {
      const numericPattern = /^[0-9]+(\.[0-9]+)?$/;
      return numericPattern.test(input);
    }

    // function isLengthNotEqualTo12(input) {
    //   return input.length !== 12;
    // }

    const p3 = document.getElementById("p3");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    const userAadharNumber = document
      .getElementById("aadharNumberInput")
      .value.trim();
    if (!userAadharNumber || !isNumeric(userAadharNumber)) {
      p3.innerHTML = "Please enter a valid Aadhar number";
      return;
    }

    p3.innerHTML =
      "Please wait, getting all the candidates from the voting smart contract";

    try {
      const [user, candidates] = await contractInstance.getCandidatesForVoter(
        userAadharNumber
      );
      console.log(userAadharNumber, user, candidates);

      const table = document
        .getElementById("myTable")
        .getElementsByTagName("tbody")[0];
      table.innerHTML = ""; // Clear any existing rows

      for (let i = 0; i < candidates.length; i++) {
        const row = table.insertRow();
        const idCell = row.insertCell();
        const logoCell = row.insertCell();
        const descCell = row.insertCell();
        const partyCell = row.insertCell();
        const buttonCell = row.insertCell();

        const logoImg = document.createElement("img");
        logoImg.src = candidates[i].logoUrl;
        logoImg.alt = candidates[i].name + " Logo";
        logoImg.height = 42;
        logoImg.width = 42;

        idCell.innerHTML = i;
        logoCell.appendChild(logoImg);
        descCell.innerHTML = candidates[i].name;
        partyCell.innerHTML = candidates[i].party;

        const voteButton = document.createElement("button");
        voteButton.className = "btn waves-effect waves-light";
        voteButton.type = "button";
        voteButton.name = "action";
        voteButton.value = i;
        voteButton.innerHTML = "Vote";
        voteButton.onclick = function () {
          addVote(user.adharNo, user.stateIndex, user.cityIndex, i);
        };

        buttonCell.appendChild(voteButton);
      }

      // const stateName = states[user.stateIndex].name;
      // const cityName = states[user.stateIndex].cities[user.cityIndex].name;

      p3.innerHTML = `List of Candidates Fetched Successfully. `;
    } catch (error) {
      console.log(error);
      p3.innerHTML = "Failed to retrieve candidates. Please try again.";
      const table = document
        .getElementById("myTable")
        .getElementsByTagName("tbody")[0];
      table.innerHTML = "";

      console.log("table cleared");
    }
  } else {
    var p3 = document.getElementById("p3");
    p3.innerHTML = "Please Connect to MetaMask First.";
  }
};

const addVote = async (aadharNumber, stateIndex, cityIndex, candidateIndex) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  try {
    const tx = await contractInstance.vote(
      aadharNumber,
      stateIndex,
      cityIndex,
      candidateIndex
    );
    await tx.wait();
    alert("Vote successfully cast!");
  } catch (error) {
    console.error(error);
    alert("Failed to cast vote. Please try again.");
  }
};

const getVotingStatus = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  try {
    const status = await contractInstance.getVotingStatus();
    const remainingTime = await contractInstance.getRemainingTime();
    const { days, hours, minutes, seconds } =
      convertSecondsToDHMS(remainingTime);
    document.getElementById(
      "status"
    ).innerHTML = `Voting Status: ${status}, Time Remaining: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  } catch (error) {
    console.error(error);
    alert("Failed to get voting status. Please try again.");
  }
};

const getAllCandidates = async () => {
  if (WALLET_CONNECTED) {
    const p3 = document.getElementById("p3");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    p3.innerHTML =
      "Please wait, getting all the candidates from the voting smart contract";
    const candidates = await contractInstance.getAllVotesOfCandidates();
    console.log(candidates);

    updatePieChart(candidates);
    const table = document
      .getElementById("myTable")
      .getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // Clear any existing rows

    for (let i = 0; i < candidates.length; i++) {
      const row = table.insertRow();
      const idCell = row.insertCell();
      const logoCell = row.insertCell();
      const descCell = row.insertCell();
      const statusCell = row.insertCell();
      console.log(candidates[i]);
      // Create img element and set its attributes
      const logoImg = document.createElement("img");
      logoImg.src = candidates[i].logoUrl; // Set the source of the image to the logo URL from the contract
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
    const p3 = document.getElementById("p3");
    p3.innerHTML = "Please connect metamask first";
  }
};

async function updateOverallWinnerGraph() {
  if (!contractInstance) {
    alert("Contract instance is not initialized.");
    return;
  }
  try {
    const [stateNames, stateIndices] =
      await contractInstance.getStateCityInfo();
    const overallPartyVotes = {};

    for (let i = 0; i < stateIndices.length; i++) {
      const stateVotes = await contractInstance.getCandidateVotesInCity(
        stateIndices[i],
        0
      );
      const stateParties = stateVotes[1];
      const stateVoteCounts = stateVotes[2].map((votes) => parseInt(votes));

      stateParties.forEach((party, index) => {
        if (!overallPartyVotes[party]) {
          overallPartyVotes[party] = 0;
        }
        overallPartyVotes[party] += stateVoteCounts[index];
      });
    }

    const partyNames = Object.keys(overallPartyVotes);
    const partyVotes = Object.values(overallPartyVotes);

    // Update overall party votes table
    const overallPartyTable = document
      .getElementById("overallPartyTable")
      .getElementsByTagName("tbody")[0];
    overallPartyTable.innerHTML = "";
    for (let i = 0; i < partyNames.length; i++) {
      const row = overallPartyTable.insertRow();
      const partyCell = row.insertCell();
      const votesCell = row.insertCell();
      partyCell.innerHTML = partyNames[i];
      votesCell.innerHTML = partyVotes[i];
    }

    // Draw chart
    const ctx = document.getElementById("overallWinnerGraph").getContext("2d");
    if (window.overallWinnerChart) {
      window.overallWinnerChart.destroy();
    }

    window.overallWinnerChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: partyNames,
        datasets: [
          {
            label: "Total Votes by Party",
            data: partyVotes,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Display overall winner party
    const overallWinnerParty =
      partyNames[partyVotes.indexOf(Math.max(...partyVotes))];
    document.getElementById(
      "overallWinner"
    ).innerHTML = `Overall Winner Party: ${overallWinnerParty}`;
  } catch (error) {
    console.error(error);
    alert("Failed to load overall results. Please try again.");
  }
}
