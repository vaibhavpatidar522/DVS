// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract Voting {
//     struct Candidate {
//         string name;
//         string party;
//         string logoUrl;
//         uint256 voteCount;
//     }

//     struct City {
//         string name;
//         Candidate[] candidates;
//     }

//     struct State {
//         string name;
//         City[] cities;
//     }

//     struct User {
//         string name;
//         string adharNo;
//         uint256 stateIndex;
//         uint256 cityIndex;
//     }

//     State[] public states;
//     mapping(string => User) public users;
//     mapping(string => bool) public voters;
//     uint256 public votingStart;
//     uint256 public votingEnd;

//     constructor(
//         string[] memory _stateNames,
//         string[][] memory _cityNames,
//         string[][][] memory _candidateNames,
//         string[][][] memory _candidateParties,
//         string[][][] memory _candidateLogos,
//         uint256 _durationInMinutes,
//         User[] memory _users
//     ) {
//         for (uint256 i = 0; i < _stateNames.length; i++) {
//             State storage state = states.push();
//             state.name = _stateNames[i];
//             for (uint256 j = 0; j < _cityNames[i].length; j++) {
//                 City storage city = state.cities.push();
//                 city.name = _cityNames[i][j];
//                 for (uint256 k = 0; k < _candidateNames[i][j].length; k++) {
//                     city.candidates.push(Candidate({
//                         name: _candidateNames[i][j][k],
//                         party: _candidateParties[i][j][k],
//                         logoUrl: _candidateLogos[i][j][k],
//                         voteCount: 0
//                     }));
//                 }
//             }
//         }

//         for (uint256 i = 0; i < _users.length; i++) {
//             users[_users[i].adharNo] = _users[i];
//         }

//         votingStart = block.timestamp;
//         votingEnd = votingStart + (_durationInMinutes * 1 minutes);
//     }

//     function addCandidate(
//         uint256 _stateIndex,
//         uint256 _cityIndex,
//         string memory _name,
//         string memory _party,
//         string memory _logoUrl
//     ) public {
//         states[_stateIndex].cities[_cityIndex].candidates.push(Candidate({
//             name: _name,
//             party: _party,
//             logoUrl: _logoUrl,
//             voteCount: 0
//         }));
//     }

//     function getStateCityInfo() public view returns (string[] memory, uint256[] memory, string[][] memory, uint256[][] memory) {
//         uint256 stateCount = states.length;
//         string[] memory stateNames = new string[](stateCount);
//         uint256[] memory stateIndices = new uint256[](stateCount);
//         string[][] memory cityNames = new string[][](stateCount);
//         uint256[][] memory cityIndices = new uint256[][](stateCount);

//         for (uint256 i = 0; i < stateCount; i++) {
//             stateNames[i] = states[i].name;
//             stateIndices[i] = i;
//             uint256 cityCount = states[i].cities.length;
//             cityNames[i] = new string[](cityCount);
//             cityIndices[i] = new uint256[](cityCount);

//             for (uint256 j = 0; j < cityCount; j++) {
//                 cityNames[i][j] = states[i].cities[j].name;
//                 cityIndices[i][j] = j;
//             }
//         }

//         return (stateNames, stateIndices, cityNames, cityIndices);
//     }

//     function getCandidateVotesInCity(uint256 _stateIndex, uint256 _cityIndex) public view returns (string[] memory, string[] memory, uint256[] memory) {
//         uint256 candidateCount = states[_stateIndex].cities[_cityIndex].candidates.length;
//         string[] memory candidateNames = new string[](candidateCount);
//         string[] memory candidateParties = new string[](candidateCount);
//         uint256[] memory votes = new uint256[](candidateCount);

//         for (uint256 i = 0; i < candidateCount; i++) {
//             candidateNames[i] = states[_stateIndex].cities[_cityIndex].candidates[i].name;
//             candidateParties[i] = states[_stateIndex].cities[_cityIndex].candidates[i].party;
//             votes[i] = states[_stateIndex].cities[_cityIndex].candidates[i].voteCount;
//         }

//         return (candidateNames, candidateParties, votes);
//     }

//     function getAllVotesOfCandidates() public view returns (string[] memory, uint256[] memory, uint256, uint256) {
//         uint256 totalVoted = 0;
//         uint256 partyCount = 0;
//         uint256 totalUsers = 0;
//         uint256 notVoted = 0;
        
//         // Using memory arrays to store party names and votes
//         string[] memory parties = new string[](100);  // Assuming max 100 different parties
//         uint256[] memory partyVotes = new uint256[](100);

//         for (uint256 i = 0; i < states.length; i++) {
//             for (uint256 j = 0; j < states[i].cities.length; j++) {
//                 for (uint256 k = 0; k < states[i].cities[j].candidates.length; k++) {
//                     Candidate storage candidate = states[i].cities[j].candidates[k];
//                     bool partyExists = false;
//                     for (uint256 l = 0; l < partyCount; l++) {
//                         if (keccak256(abi.encodePacked(parties[l])) == keccak256(abi.encodePacked(candidate.party))) {
//                             partyVotes[l] += candidate.voteCount;
//                             partyExists = true;
//                             break;
//                         }
//                     }
//                     if (!partyExists) {
//                         parties[partyCount] = candidate.party;
//                         partyVotes[partyCount] = candidate.voteCount;
//                         partyCount++;
//                     }
//                 }
//             }
//         }

//         for (uint256 i = 0; i < states.length; i++) {
//             for (uint256 j = 0; j < states[i].cities.length; j++) {
//                 for (uint256 k = 0; k < states[i].cities[j].candidates.length; k++) {
//                     if (voters[states[i].cities[j].candidates[k].name]) {
//                         totalVoted++;
//                     } else {
//                         notVoted++;
//                     }
//                 }
//             }
//         }

//         // Trimming arrays to the actual length
//         string[] memory finalParties = new string[](partyCount);
//         uint256[] memory finalVotes = new uint256[](partyCount);

//         for (uint256 l = 0; l < partyCount; l++) {
//             finalParties[l] = parties[l];
//             finalVotes[l] = partyVotes[l];
//         }

//         return (finalParties, finalVotes, totalVoted, notVoted);
//     }
// }











contract Voting {
    struct Candidate {
        string name;
        string party;
        string logoUrl;
        uint256 voteCount;
    }

    struct City {
        string name;
        Candidate[] candidates;
    }

    struct State {
        string name;
        City[] cities;
    }

    struct User {
        string name;
        string adharNo;
        uint256 stateIndex;
        uint256 cityIndex;
    }

    State[] public states;
    mapping(string => User) public users;
    mapping(string => bool) public voters;
    address owner;
    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(
        string[] memory _stateNames,
        string[][] memory _cityNames,
        string[][][] memory _candidateNames,
        string[][][] memory _candidateParties,
        string[][][] memory _candidateLogos,
        uint256 _durationInMinutes,
        User[] memory _users
    ) {
        require(
            _stateNames.length == _cityNames.length &&
            _stateNames.length == _candidateNames.length &&
            _stateNames.length == _candidateParties.length &&
            _stateNames.length == _candidateLogos.length,
            "Input array lengths mismatch"
        );

        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);

        for (uint256 i = 0; i < _stateNames.length; i++) {
            State storage newState = states.push();
            newState.name = _stateNames[i];

            for (uint256 j = 0; j < _cityNames[i].length; j++) {
                City storage newCity = newState.cities.push();
                newCity.name = _cityNames[i][j];

                for (uint256 k = 0; k < _candidateNames[i][j].length; k++) {
                    newCity.candidates.push(
                        Candidate({
                            name: _candidateNames[i][j][k],
                            party: _candidateParties[i][j][k],
                            logoUrl: _candidateLogos[i][j][k],
                            voteCount: 0
                        })
                    );
                }
            }
        }

        for (uint256 i = 0; i < _users.length; i++) {
            users[_users[i].adharNo] = _users[i];
            voters[_users[i].adharNo] = false; // Initialize as false to indicate they haven't voted yet
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function addCandidate(
        uint256 _stateIndex,
        uint256 _cityIndex,
        string memory _name,
        string memory _party,
        string memory _logoUrl
    ) public onlyOwner {
        require(_stateIndex < states.length, "Invalid state index");
        require(_cityIndex < states[_stateIndex].cities.length, "Invalid city index");
        states[_stateIndex].cities[_cityIndex].candidates.push(Candidate({
            name: _name,
            party: _party,
            logoUrl: _logoUrl,
            voteCount: 0
        }));
    }

    function getStateCityInfo() public view returns (string[] memory, uint256[] memory, string[][] memory, uint256[][] memory) {
        uint256 stateCount = states.length;
        string[] memory stateNames = new string[](stateCount);
        uint256[] memory stateIndices = new uint256[](stateCount);
        string[][] memory cityNames = new string[][](stateCount);
        uint256[][] memory cityIndices = new uint256[][](stateCount);

        for (uint256 i = 0; i < stateCount; i++) {
            stateNames[i] = states[i].name;
            stateIndices[i] = i;
            uint256 cityCount = states[i].cities.length;
            cityNames[i] = new string[](cityCount);
            cityIndices[i] = new uint256[](cityCount);

            for (uint256 j = 0; j < cityCount; j++) {
                cityNames[i][j] = states[i].cities[j].name;
                cityIndices[i][j] = j;
            }
        }

        return (stateNames, stateIndices, cityNames, cityIndices);
    }

    function getCandidateVotesInCity(uint256 _stateIndex, uint256 _cityIndex) public view returns (string[] memory, string[] memory, uint256[] memory) {
        uint256 candidateCount = states[_stateIndex].cities[_cityIndex].candidates.length;
        string[] memory candidateNames = new string[](candidateCount);
        string[] memory candidateParties = new string[](candidateCount);
        uint256[] memory votes = new uint256[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            candidateNames[i] = states[_stateIndex].cities[_cityIndex].candidates[i].name;
            candidateParties[i] = states[_stateIndex].cities[_cityIndex].candidates[i].party;
            votes[i] = states[_stateIndex].cities[_cityIndex].candidates[i].voteCount;
        }

        return (candidateNames, candidateParties, votes);
    }

    function getAllVotesOfCandidates() public view returns (string[] memory, uint256[] memory, uint256, uint256) {
        uint256 totalVoted = 0;
        uint256 partyCount = 0;
        uint256 totalUsers = 0;
        uint256 notVoted = 0;
        
        // Using memory arrays to store party names and votes
        string[] memory parties = new string[](100);  // Assuming max 100 different parties
        uint256[] memory partyVotes = new uint256[](100);

        for (uint256 i = 0; i < states.length; i++) {
            for (uint256 j = 0; j < states[i].cities.length; j++) {
                for (uint256 k = 0; k < states[i].cities[j].candidates.length; k++) {
                    Candidate storage candidate = states[i].cities[j].candidates[k];
                    bool partyExists = false;
                    for (uint256 l = 0; l < partyCount; l++) {
                        if (keccak256(abi.encodePacked(parties[l])) == keccak256(abi.encodePacked(candidate.party))) {
                            partyVotes[l] += candidate.voteCount;
                            partyExists = true;
                            break;
                        }
                    }
                    if (!partyExists) {
                        parties[partyCount] = candidate.party;
                        partyVotes[partyCount] = candidate.voteCount;
                        partyCount++;
                    }
                }
            }
        }

        for (uint256 i = 0; i < states.length; i++) {
            for (uint256 j = 0; j < states[i].cities.length; j++) {
                for (uint256 k = 0; k < states[i].cities[j].candidates.length; k++) {
                    if (voters[states[i].cities[j].candidates[k].name]) {
                        totalVoted++;
                    } else {
                        notVoted++;
                    }
                }
            }
        }

        // Trimming arrays to the actual length
        string[] memory finalParties = new string[](partyCount);
        uint256[] memory finalVotes = new uint256[](partyCount);

        for (uint256 l = 0; l < partyCount; l++) {
            finalParties[l] = parties[l];
            finalVotes[l] = partyVotes[l];
        }

        return (finalParties, finalVotes, totalVoted, notVoted);
    }

    function getCandidatesForVoter(string memory _adharNo) public view returns (User memory, Candidate[] memory) {
        require(users[_adharNo].stateIndex < states.length, "Invalid state index for user");
        require(users[_adharNo].cityIndex < states[users[_adharNo].stateIndex].cities.length, "Invalid city index for user");

        User memory user = users[_adharNo];
        City memory city = states[user.stateIndex].cities[user.cityIndex];
        return (user, city.candidates);
    }

    function vote(string memory _adharNo, uint256 _stateIndex, uint256 _cityIndex, uint256 _candidateIndex) external {
        require(voters[_adharNo] == false, "User has already voted with this Aadhar number");
        require(_stateIndex < states.length, "Invalid state index");
        require(_cityIndex < states[_stateIndex].cities.length, "Invalid city index");
        require(_candidateIndex < states[_stateIndex].cities[_cityIndex].candidates.length, "Invalid candidate index");

        states[_stateIndex].cities[_cityIndex].candidates[_candidateIndex].voteCount += 1;
        voters[_adharNo] = true;
    }

    function getVotingStatus() public view returns (string memory) {
        if (block.timestamp >= votingStart && block.timestamp <= votingEnd) {
            return "Voting is currently open";
        } else {
            return "Voting is finished";
        }
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingEnd) {
            return 0;
        } else {
            return votingEnd - block.timestamp;
        }
    }
}
