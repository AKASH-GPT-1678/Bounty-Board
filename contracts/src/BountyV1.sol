// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./BountyToken.sol";

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
        Development,
        Design,
        Writing, 
        Marketing,
        Research 
    }
    enum ApplicationStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
    event BountyCreated(
        uint256 indexed bountyId,
        address indexed creator,
        string title,
        uint256 bountyAmount,
        uint256 deadline
    );
    struct Bounty {
        address creator;
        uint256 deadline;
        uint256 bountyAmount;
        uint256 bountyId;
        string imageUrl;
        string description;
        string expectation;
        string title;
        Category category;
        BountyStatus status;
        uint256 participation;
    }
    struct Application {
        address applicant;
        uint256 bountyId;
        string coverLetter;
        string proposal;
        string workUrl;
        ApplicationStatus status;
    }

    mapping(uint256 => Bounty) public bounties;
    mapping(Category => Bounty[]) bountiesByCategory;
    mapping(uint256 => Application[]) applications;
    uint256 public nextBountyId = 1;

    function createBounty(
        string memory _title,
        string memory _description,
        string memory _expectation,
        string memory imageUrl,
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
            imageUrl: imageUrl,
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

    function deleteBounty(uint256 _bountyId) public {
        require(
            bounties[_bountyId].status == BountyStatus.OPEN,
            "Bounty is not open"
        );
        delete bounties[_bountyId];
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

    function submitApplication(
        address applicant,
        uint256 bountyId,
        string memory coverLetter,
        string memory proposal,
        string memory workUrl
    ) public {
        // Make sure bounty exists
        require(bountyId < nextBountyId, "Invalid bounty ID");

        // Only applicant can submit their own application
        require(msg.sender == applicant, "Not your address");

        // Create a new Application struct
        Application memory newApp = Application({
            applicant: applicant,
            bountyId: bountyId,
            coverLetter: coverLetter,
            proposal: proposal,
            workUrl: workUrl,
            status: ApplicationStatus.PENDING
        });

        // Store it under that bountyId
        applications[bountyId].push(newApp);
    }
}
