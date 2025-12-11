// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title SimpleStorage
 * @dev 一个简单的存储合约示例，演示基本的状态变量操作
 */
contract SimpleStorage {
    // 状态变量
    uint256 private storedNumber;
    string private storedText;
    address public owner;
    
    // 映射：地址到数字
    mapping(address => uint256) public userNumbers;
    
    // 事件
    event NumberUpdated(uint256 oldNumber, uint256 newNumber, address updatedBy);
    event TextUpdated(string oldText, string newText, address updatedBy);
    event UserNumberSet(address indexed user, uint256 number);
    
    // 修饰器
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev 构造函数，设置合约所有者
     */
    constructor() {
        owner = msg.sender;
        storedNumber = 0;
        storedText = "Hello, Hardhat!";
    }
    
    /**
     * @dev 存储一个数字
     * @param _number 要存储的数字
     */
    function setNumber(uint256 _number) public {
        uint256 oldNumber = storedNumber;
        storedNumber = _number;
        emit NumberUpdated(oldNumber, _number, msg.sender);
    }
    
    /**
     * @dev 获取存储的数字
     * @return 存储的数字
     */
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }
    
    /**
     * @dev 存储文本（仅所有者）
     * @param _text 要存储的文本
     */
    function setText(string memory _text) public onlyOwner {
        string memory oldText = storedText;
        storedText = _text;
        emit TextUpdated(oldText, _text, msg.sender);
    }
    
    /**
     * @dev 获取存储的文本
     * @return 存储的文本
     */
    function getText() public view returns (string memory) {
        return storedText;
    }
    
    /**
     * @dev 为调用者设置一个数字
     * @param _number 要设置的数字
     */
    function setMyNumber(uint256 _number) public {
        userNumbers[msg.sender] = _number;
        emit UserNumberSet(msg.sender, _number);
    }
    
    /**
     * @dev 获取调用者的数字
     * @return 调用者的数字
     */
    function getMyNumber() public view returns (uint256) {
        return userNumbers[msg.sender];
    }
    
    /**
     * @dev 增加存储的数字
     */
    function increment() public {
        storedNumber += 1;
        emit NumberUpdated(storedNumber - 1, storedNumber, msg.sender);
    }
    
    /**
     * @dev 减少存储的数字
     */
    function decrement() public {
        require(storedNumber > 0, "Cannot decrement below zero");
        storedNumber -= 1;
        emit NumberUpdated(storedNumber + 1, storedNumber, msg.sender);
    }
}
