// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voteasy {
    enum Status {
        active,
        scheduled,
        finalized,
        canceled
    }

    struct Candidate {
        uint id;
        string name;
        uint number; 
        string party; 
        uint votes;
    }

    struct Voting {
        uint id;
        string name;
        string description;
        uint startDate;
        uint endDate;
        Status status;
        uint winnerIndex;
    }

    uint public votingCount;
    mapping(uint => Voting) public votings;
    mapping(uint => Candidate[]) public candidates;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event VotingCreated(uint indexed id, string name, uint startDate, uint endDate, Status status);
    event CandidateAdded(uint indexed votingId, uint indexed candidateId, string name);
    event VoteCast(uint indexed votingId, uint indexed candidateId, address voter);
    event VotingStatusUpdated(uint indexed votingId, Status newStatus);

    modifier validDates(uint _startDate, uint _endDate) {
        require(_startDate > block.timestamp, "A data de inicio deve ser no futuro");
        require(_endDate > _startDate, "A data de fim deve ser posterior a de inicio");
        _;
    }

    modifier votingIsActive(uint _votingId) {
        require(votings[_votingId].status == Status.active, "Esta votacao nao esta ativa");
        require(votings[_votingId].status != Status.canceled, "A votacao foi cancelada");
        _;
    }

    function createVoting(
        string memory _name,
        string memory _description,
        uint _startDate,
        uint _endDate,
        string[] memory _candidateNames,
        uint[] memory _candidateNumbers,
        string[] memory _candidateParties,
        Status _status
    ) public validDates(_startDate, _endDate) {
        require(_candidateNames.length > 1, "A votacao deve ter pelo menos dois candidato");

        uint votingId = votingCount++;

        votings[votingId] = Voting({
            id: votingId,
            name: _name,
            description: _description,
            startDate: _startDate,
            endDate: _endDate,
            status: _status,
            winnerIndex: type(uint).max // Inicialmente sem vencedor
        });

        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates[votingId].push(Candidate({
                id: i,
                name: _candidateNames[i],
                number: _candidateNumbers[i],
                party: _candidateParties[i],
                votes: 0
            }));

            emit CandidateAdded(votingId, i, _candidateNames[i]);
        }

        emit VotingCreated(votingId, _name, _startDate, _endDate, _status);
    }

    function updateVotingStatus(uint _votingId, Status _newStatus) public {
        require(votings[_votingId].status != Status.finalized, "Nao pode alterar uma votacao finalizada");
        require(votings[_votingId].status != Status.canceled, "Nao pode alterar uma votacao cancelada");

        votings[_votingId].status = _newStatus;

        if (_newStatus == Status.finalized) {
            // Calcular o vencedor no momento da finalização
            uint winnerIndex = _calculateWinner(_votingId);
            votings[_votingId].winnerIndex = winnerIndex;

            emit VotingStatusUpdated(_votingId, _newStatus);
        } else {
            emit VotingStatusUpdated(_votingId, _newStatus);
        }
    }

    function _calculateWinner(uint _votingId) internal view returns (uint) {
        uint maxVotes = 0;
        uint winnerIndex = type(uint).max;

        for (uint i = 0; i < candidates[_votingId].length; i++) {
            if (candidates[_votingId][i].votes > maxVotes) {
                maxVotes = candidates[_votingId][i].votes;
                winnerIndex = i;
            }
        }

        return winnerIndex;
    }

    function getWinner(uint _votingId) public view 
        returns (uint id, string memory name, uint number, string memory party, uint votes) 
    {
        require(votings[_votingId].status == Status.finalized, "Votacao nao finalizada");
        require(votings[_votingId].status != Status.canceled, "A votacao foi cancelada");

        uint winnerIndex = votings[_votingId].winnerIndex;
        require(winnerIndex != type(uint).max, "Nenhum vencedor encontrado");

        Candidate memory winner = candidates[_votingId][winnerIndex];
        return (winner.id, winner.name, winner.number, winner.party, winner.votes);
    }


    function vote(uint _votingId, uint _candidateId) public votingIsActive(_votingId) {
        require(!hasVoted[_votingId][msg.sender], "Voce ja votou nesta votacao!");
        require(block.timestamp >= votings[_votingId].startDate && block.timestamp <= votings[_votingId].endDate,
        "Votacao fora do periodo permitido");
        require(_candidateId < candidates[_votingId].length, "Candidato invalido");

        candidates[_votingId][_candidateId].votes++;
        hasVoted[_votingId][msg.sender] = true;

        emit VoteCast(_votingId, _candidateId, msg.sender);
    }

    function getCandidate(uint _candidateId, uint _votingId) public view 
    returns (uint id, string memory name, uint number, string memory party, uint votes) {
        Candidate memory candidate = candidates[_votingId][_candidateId];
        return (candidate.id, candidate.name, candidate.number, candidate.party, candidate.votes);
    }

    function getCandidatesByVoting (uint _votingId) public view returns (Candidate[] memory){
        Candidate[] memory candidateList = new Candidate[](candidates[_votingId].length); // Use o array da votação específica
        for (uint i = 0; i < candidates[_votingId].length; i++) {
            candidateList[i] = candidates[_votingId][i];
        }
        return candidateList;
    }
    
    function getAllVotings() public view returns(Voting[] memory){
        Voting[] memory votingList = new Voting[](votingCount);
        for (uint i = 0; i < votingCount; i++) {
            votingList[i] = votings[i];
        }
        return votingList;
    }

    function getVoting(uint _votingId) public view 
    returns (
        uint id,
        string memory name,
        string memory description,
        uint startDate,
        uint endDate,
        Status status,
        uint winnerIndex
    ) {
        require(_votingId < votingCount, "Votacao nao encontrada");

        Voting storage voting = votings[_votingId];

        return (
            voting.id,
            voting.name,
            voting.description,
            voting.startDate,
            voting.endDate,
            voting.status,
            voting.winnerIndex
        );
    }
}
