// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

import 'hardhat/console.sol';

contract Marketplace is ERC721URIStorage, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0.00082 ether;

  struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated(
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  constructor() ERC721('NFT-Marketplace', 'NFT') {
    owner = payable(msg.sender);
  }

  function createToken(string memory tokenURI, uint256 price)
    public
    payable
    returns (uint256)
  {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();

    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    return newTokenId;
  } 

  function createMarketSale(uint256 tokenId) public payable {
    uint256 price = idToMarketItem[tokenId].price;
    address seller = idToMarketItem[tokenId].seller;
    require(
      msg.value == price,
      'Please submit the asking price in order to complete the purchase'
    );
    idToMarketItem[tokenId].owner = payable(msg.sender);
    idToMarketItem[tokenId].sold = true;
    idToMarketItem[tokenId].seller = payable(address(0));
    _itemsSold.increment();
    _transfer(address(this), msg.sender, tokenId);
    payable(owner).transfer(listingPrice);
    payable(seller).transfer(msg.value);
  }

  function sellNFT(uint256 tokenId, address buyer, uint256 price) public {
    require(msg.sender == ownerOf(tokenId), 'Only the owner can sell the NFT');
    require(price > 0, 'Price must be greater than 0');

    safeTransferFrom(msg.sender, buyer, tokenId);
    idToMarketItem[tokenId] = MarketItem(
      tokenId,
      payable(msg.sender),
      payable(buyer),
      price,
      true
    );
  }

}
