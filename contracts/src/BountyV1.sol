// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BountyV1 {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    enum BountyStatus {
        OPEN,
        CLOSED,
        CANCELLED,
        IN_PROGRESS
    }
    enum Category {
        Development, // Coding or software tasks
        Design, // UI/UX, graphics
        Writing, // Articles, documentation
        Marketing, // Social media, promotions
        Research // Research tasks, analysis
    }
    event BountyCreated(
        uint256 indexed bountyId,
        address indexed creator,
        string title,
        uint256 bountyAmount,
        uint256 deadline
    );
    mapping(uint256 => Bounty) public bounties;
    mapping(Category => Bounty[]) bountiesByCategory;
    uint256 public nextBountyId = 1;

    struct Bounty {
        address creator;
        uint256 deadline;
        uint256 bountyAmount;
        uint256 bountyId;
        string description;
        string expectation;
        string title;
        Category category;
        BountyStatus status;
        uint256 participation;
    }

    function createBounty(
        string memory _title,
        string memory _description,
        string memory _expectation,
        Category _category,
        uint256 _deadline,
        uint256 _bountyAmount
    ) public payable {
        require(msg.value > 0, "Bounty amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        uint256 bountyId = nextBountyId;
        nextBountyId++;

        Bounty memory newBounty = Bounty({
            creator: msg.sender,
            deadline: _deadline,
            bountyAmount: _bountyAmount,
            bountyId: bountyId,
            description: _description,
            expectation: _expectation,
            title: _title,
            category: _category,
            status: BountyStatus.OPEN,
            participation: 0
        });

        bounties[bountyId] = newBounty;
        bountiesByCategory[_category].push(newBounty);

        emit BountyCreated(bountyId, msg.sender, _title, msg.value, _deadline);
    }

    function closeBounty(uint256 _bountyId) public {
        require(
            bounties[_bountyId].status == BountyStatus.OPEN,
            "Bounty is not open"
        );
        bounties[_bountyId].status = BountyStatus.CLOSED;
    }

    function intToCategory(uint8 _index) internal pure returns (Category) {
        require(_index <= uint8(Category.Research), "Invalid category index");
        return Category(_index);
    }

    function loadBountieByCategory(
        uint8 _category
    ) public view returns (Bounty[] memory) {
        Category output = intToCategory(_category);
        return bountiesByCategory[output];
    }
}
