// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voteasy {
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
        uint winnerIndex;
        bool isCanceled;
        bytes32 creatorId;
    }

    uint public votingCount;
    
    mapping(uint => Voting) public votings;
    mapping(uint => Candidate[]) public candidates;
    mapping(uint => mapping(bytes32 => bool)) public hasVotedByUser;

    event VotingCreated(uint indexed id, string name, uint startDate, uint endDate);
    event CandidateAdded(uint indexed votingId, uint indexed candidateId, string name);
    event Voted(uint votingId, uint candidateId);
    event VotingCanceled(uint indexed votingId);
    event VotingFinalized(uint indexed votingId, uint winnerIndex);

    modifier validDates(uint _startDate, uint _endDate) {
        require(_startDate > block.timestamp, "A data de inicio deve ser no futuro");
        require(_endDate > _startDate, "A data de fim deve ser posterior a de inicio");
        _;
    }

    modifier votingIsActive(uint _votingId) {
        Voting storage v = votings[_votingId];
        require(!v.isCanceled, "Votacao cancelada");
        require(block.timestamp >= v.startDate && block.timestamp <= v.endDate, "Fora do periodo de votacao");
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
        bytes32 _creatorId
    ) public validDates(_startDate, _endDate) {
        require(_candidateNames.length > 1, "A votacao deve ter pelo menos dois candidatos");

        uint votingId = votingCount++;

        votings[votingId] = Voting({
            id: votingId,
            name: _name,
            description: _description,
            startDate: _startDate,
            endDate: _endDate,
            winnerIndex: type(uint).max,
            isCanceled: false,
            creatorId: _creatorId
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

        emit VotingCreated(votingId, _name, _startDate, _endDate);
    }

    function cancelVoting(uint _votingId, bytes32 userIdHash) public {
        Voting storage v = votings[_votingId];
        require(!v.isCanceled, "Votacao ja cancelada");
        require(v.creatorId == userIdHash, "Apenas o criador pode cancelar");

        v.isCanceled = true;

        emit VotingCanceled(_votingId);
    }

    function vote(uint _votingId, uint _candidateId, bytes32 userIdHash) public votingIsActive(_votingId) {
        require(!hasVotedByUser[_votingId][userIdHash], "Voce ja votou nesta votacao!");
        require(_candidateId < candidates[_votingId].length, "Candidato invalido");

        Candidate storage c = candidates[_votingId][_candidateId];
        c.votes++;
        hasVotedByUser[_votingId][userIdHash] = true;

        emit Voted(_votingId, _candidateId);
    }

    //TODO: Alterar e corrigir para calcular o vencedor corretamente
    function finalizeVoting(uint _votingId) public {
        Voting storage v = votings[_votingId];
        require(!v.isCanceled, "Votacao cancelada");
        require(block.timestamp > v.endDate, "Votacao ainda em andamento");
        require(v.winnerIndex == type(uint).max, "Votacao ja finalizada");

        v.winnerIndex = _calculateWinner(_votingId);
        emit VotingFinalized(_votingId, v.winnerIndex);
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

    function getWinner(uint _votingId) public view returns (
        uint id, string memory name, uint number, string memory party, uint votes
    ) {
        Voting storage v = votings[_votingId];
        require(!v.isCanceled, "Votacao cancelada");
        require(v.winnerIndex != type(uint).max, "Votacao nao finalizada");

        Candidate memory winner = candidates[_votingId][v.winnerIndex];
        return (winner.id, winner.name, winner.number, winner.party, winner.votes);
    }

    function getCandidate(uint _candidateId, uint _votingId) public view returns (
        uint id, string memory name, uint number, string memory party, uint votes
    ) {
        Candidate memory c = candidates[_votingId][_candidateId];
        return (c.id, c.name, c.number, c.party, c.votes);
    }

    function getCandidatesByVoting(uint _votingId) public view returns (Candidate[] memory) {
        return candidates[_votingId];
    }

    function getAllVotings() public view returns (Voting[] memory) {
        Voting[] memory list = new Voting[](votingCount);
        for (uint i = 0; i < votingCount; i++) {
            list[i] = votings[i];
        }
        return list;
    }

    function getVoting(uint _votingId) public view returns (
        uint id, string memory name, string memory description,
        uint startDate, uint endDate, uint winnerIndex, bool isCanceled
    ) {
        Voting storage v = votings[_votingId];
        return (
            v.id, v.name, v.description,
            v.startDate, v.endDate, v.winnerIndex, v.isCanceled
        );
    }
}
