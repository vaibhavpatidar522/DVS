// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string logoUrl; // New field for candidate logo URL
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidateNames, string[] memory _candidateLogos, uint256 _durationInMinutes) {
        require(_candidateNames.length == _candidateLogos.length, "Number of names and logos must be equal.");
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                logoUrl: _candidateLogos[i], // Store the logo URL along with the candidate name
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name, string memory _logoUrl) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            logoUrl: _logoUrl,
            voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }
             
    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }
}
