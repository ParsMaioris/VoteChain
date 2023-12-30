// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title Voting Contract
 * @dev This contract allows members to create and participate in votes.
 */
contract Voting {
    uint256 private _nextVoteId;

    struct Vote {
        string uri;
        address owner;
        uint256 endTime;
        uint256[] votes;
        mapping(address => bool) voted;
        uint256 options;
    }

    mapping(uint256 => Vote) private _votes;
    mapping(address => bool) public members;

    event MemberJoined(address indexed member, uint256 joinedAt);
    event VoteCreated(address indexed owner, uint256 indexed voteId, uint256 endTime);
    event Voted(address indexed voter, uint256 indexed voteId, uint256 option);

    modifier isMember() {
        require(members[msg.sender], "Not a member");
        _;
    }

    modifier validVote(uint256 voteId, uint256 option) {
        require(voteId < _nextVoteId, "Vote does not exist");
        require(option < _votes[voteId].options, "Invalid option");
        require(!_votes[voteId].voted[msg.sender], "Already voted");
        require(block.timestamp <= _votes[voteId].endTime, "Vote ended");
        _;
    }

    function join() external {
        require(!members[msg.sender], "Already a member");
        members[msg.sender] = true;
        emit MemberJoined(msg.sender, block.timestamp);
    }

    function createVote(string memory uri, uint256 endTime, uint256 options) external isMember {
        require(options >= 2 && options <= 8, "Options out of range");
        require(endTime > block.timestamp, "End time in the past");

        uint256 voteId = _nextVoteId++;
        Vote storage newVote = _votes[voteId];
        newVote.uri = uri;
        newVote.owner = msg.sender;
        newVote.endTime = endTime;
        newVote.options = options;
        newVote.votes = new uint256[](options);

        emit VoteCreated(msg.sender, voteId, endTime);
    }

    function vote(uint256 voteId, uint256 option) external isMember validVote(voteId, option) {
        Vote storage selectedVote = _votes[voteId];
        selectedVote.votes[option]++;
        selectedVote.voted[msg.sender] = true;
        emit Voted(msg.sender, voteId, option);
    }

    function getVote(uint256 voteId) public view returns (string memory, address, uint256[] memory, uint256) {
        Vote storage selectedVote = _votes[voteId];
        return (selectedVote.uri, selectedVote.owner, selectedVote.votes, selectedVote.endTime);
    }

    function didVote(address member, uint256 voteId) public view returns (bool) {
        return _votes[voteId].voted[member];
    }
}