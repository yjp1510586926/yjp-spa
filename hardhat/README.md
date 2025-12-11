# Hardhat 3.x 智能合约开发项目

## 🎉 项目状态

✅ **Hardhat 3.1.0 已成功安装并配置**  
✅ **合约编译成功**  
✅ **Node.js 22.17.1 (LTS) 已配置**  
✅ **两个示例合约已创建并编译**  

---

## 📦 已安装的依赖

### Hardhat 核心
- `hardhat@3.1.0` - 最新的 Hardhat 3.x 版本
- `@nomicfoundation/hardhat-toolbox@6.1.0` - 工具箱（当前已禁用）
- `dotenv@17.2.3` - 环境变量管理

### 开发依赖
- `@nomicfoundation/hardhat-ethers@4.0.3`
- `@nomicfoundation/hardhat-chai-matchers@2.1.0`
- `ethers@6.14.0`
- `typescript@5.9.3`
- `ts-node@10.9.2`
- 以及其他测试和开发工具

---

## 📝 项目文件结构

```
hardhat/
├── contracts/
│   ├── Lock.sol              ✅ 已编译
│   └── SimpleStorage.sol     ✅ 已编译
├── scripts/
│   └── deploy.js             📝 部署脚本
├── test/
│   └── Lock.js               📝 测试文件
├── artifacts/                ✅ 编译输出
├── cache/                    ✅ 编译缓存
├── hardhat.config.ts         ✅ Hardhat 3.x 配置
├── tsconfig.json             ✅ TypeScript 配置
├── .nvmrc                    ✅ Node.js 版本锁定
├── .env.example              📝 环境变量模板
├── .gitignore                📝 Git 忽略规则
├── package.json              📝 项目配置
└── README.md                 📚 本文档
```

---

## ⚙️ Hardhat 3.x 配置说明

### 关键配置变更

Hardhat 3.x 引入了一些重要变更：

1. **网络配置需要 `type` 字段**
   ```typescript
   networks: {
     hardhat: {
       type: "edr-simulated" as const,  // 新增
       chainId: 1337,
     },
     sepolia: {
       type: "http" as const,            // 新增
       url: "https://sepolia.infura.io/v3/...",
     }
   }
   ```

2. **ES 模块支持**
   - 配置文件使用 `.ts` 扩展名
   - `package.json` 中 `"type": "module"`
   - 使用 `import` 而不是 `require`

3. **TypeScript 优先**
   - 内置 TypeScript 支持
   - 使用 `tsx` 运行 TypeScript 文件

---

## ⚠️ 已知问题和解决方案

### 1. Toolbox 兼容性问题

**问题**：`@nomicfoundation/hardhat-toolbox@6.1.0` 的某些依赖（如 `hardhat-chai-matchers`）尝试访问 Hardhat 3.x 中不再导出的内部模块路径（`hardhat/common/bigInt`）。

**当前解决方案**：在 `hardhat.config.ts` 中注释掉了 toolbox 导入：
```typescript
// import "@nomicfoundation/hardhat-toolbox";
```

**影响**：
- ✅ 合约编译正常工作
- ❌ 测试功能受限（需要手动导入测试工具）
- ❌ 部分插件功能不可用

**未来解决方案**：
- 等待 `@nomicfoundation/hardhat-toolbox` 更新以完全支持 Hardhat 3.x
- 或者手动导入需要的插件，跳过 toolbox

### 2. Node.js 版本要求

**要求**：Node.js 22.x LTS（当前使用 22.17.1 ✅）

**如何切换版本**：
```bash
# 在项目目录下
source ~/.nvm/nvm.sh
nvm use  # 会自动读取 .nvmrc 文件
```

**永久设置**：
```bash
nvm alias default 22
```

**或者添加到 shell 配置**：
在 `~/.zshrc` 中添加：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

---

## 🚀 快速开始

### 1. 确保使用正确的 Node.js 版本
```bash
cd /Users/yangjinpeng/Documents/web3/yjp-spa/hardhat
source ~/.nvm/nvm.sh
nvm use
node --version  # 应显示 v22.17.1
```

### 2. 编译合约
```bash
npx hardhat compile
# 或
yarn compile
```

### 3. 查看编译结果
```bash
ls artifacts/contracts/
# 应该看到 Lock.sol/ 和 SimpleStorage.sol/
```

### 4. 启动本地节点
```bash
npx hardhat node
# 或
yarn node
# 节点将在 http://127.0.0.1:8545 运行
```

### 5. 部署合约（在新终端）
```bash
source ~/.nvm/nvm.sh && nvm use
npx hardhat run scripts/deploy.js --network localhost
# 或
yarn deploy:localhost
```

---

## 🔧 常用命令

### 编译合约
```bash
yarn compile
# 或
npx hardhat compile
```

### 运行测试
```bash
# 运行所有测试
yarn test

# 运行特定测试文件
npx hardhat test test/Lock.js

# 显示 gas 报告
REPORT_GAS=true yarn test
```

### 部署合约
```bash
# 部署到本地网络（需要先启动 yarn node）
yarn deploy:localhost

# 部署到 Hardhat 网络
yarn deploy

# 部署到 Sepolia 测试网
npx hardhat run scripts/deploy.js --network sepolia

# 部署到主网
npx hardhat run scripts/deploy.js --network mainnet
```

### 清理
```bash
yarn clean
# 清理 cache 和 artifacts 目录
```

### Hardhat Console
```bash
# 在本地网络打开控制台
npx hardhat console --network localhost

# 在 Hardhat 网络打开控制台
npx hardhat console
```

### 其他常用任务
```bash
# 查看所有可用任务
npx hardhat

# 查看账户
npx hardhat accounts
```

---

## 🔐 环境变量配置

1. 复制环境变量模板：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的配置：
```bash
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **重要**：永远不要提交 `.env` 文件到 Git！

---

## 📝 编写合约

### 基本合约结构
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyContract {
    // 状态变量
    uint256 public myNumber;
    
    // 事件
    event NumberChanged(uint256 newNumber);
    
    // 构造函数
    constructor(uint256 _initialNumber) {
        myNumber = _initialNumber;
    }
    
    // 函数
    function setNumber(uint256 _number) public {
        myNumber = _number;
        emit NumberChanged(_number);
    }
}
```

---

## 🧪 编写测试

### 基本测试结构
```javascript
import { expect } from "chai";
import hre from "hardhat";

describe("MyContract", function () {
  it("Should set the right number", async function () {
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy(42);
    
    expect(await myContract.myNumber()).to.equal(42);
  });
});
```

---

## 🚀 部署脚本

### 基本部署脚本
```javascript
import hre from "hardhat";

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy(42);
  
  await myContract.waitForDeployment();
  
  console.log(`MyContract deployed to ${myContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 🌐 网络配置

### 本地网络
```typescript
// hardhat.config.ts
networks: {
  hardhat: {
    type: "edr-simulated" as const,
    chainId: 1337
  },
  localhost: {
    type: "http" as const,
    url: "http://127.0.0.1:8545",
    chainId: 1337
  }
}
```

### 测试网
```typescript
sepolia: {
  type: "http" as const,
  url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
  accounts: [PRIVATE_KEY],
  chainId: 11155111
}
```

---

## 📊 Gas 报告

启用 gas 报告：
```bash
REPORT_GAS=true yarn test
```

在 `hardhat.config.ts` 中配置：
```typescript
gasReporter: {
  enabled: process.env.REPORT_GAS === "true",
  currency: "USD",
  coinmarketcap: process.env.COINMARKETCAP_API_KEY
}
```

---

## 🔍 验证合约

在 Etherscan 上验证合约：
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```

---

## 🐛 调试技巧

### 使用 console.log
```solidity
import "hardhat/console.sol";

contract MyContract {
    function myFunction() public {
        console.log("Debug message:", someValue);
    }
}
```

### 查看交易详情
```javascript
const tx = await contract.myFunction();
const receipt = await tx.wait();
console.log(receipt);
```

### 使用 Hardhat Network Helpers
```javascript
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

// 增加时间
await time.increase(3600); // 增加 1 小时

// 设置时间
await time.increaseTo(timestamp);

// 获取最新区块时间
const latestTime = await time.latest();
```

---

## 📖 示例合约说明

### Lock.sol
时间锁定合约，演示：
- 构造函数参数
- 时间检查
- 所有者权限
- ETH 转账
- 事件发出

### SimpleStorage.sol  
简单存储合约，演示：
- 状态变量
- 映射（mapping）
- 事件（events）
- 修饰器（modifiers）
- 访问控制
- 多种函数类型（view、pure、状态修改）

---

## 🎯 下一步建议

### 立即可做的事情：
1. ✅ 编译合约 - `npx hardhat compile`
2. ✅ 启动本地节点 - `npx hardhat node`
3. ✅ 部署合约到本地网络
4. ✅ 创建自己的合约

### 需要等待的功能：
1. ⏳ 完整的测试功能（等待 toolbox 更新）
2. ⏳ Gas 报告（需要 toolbox）
3. ⏳ 合约验证插件（需要 toolbox）

### 临时解决方案：
如果需要完整的测试功能，可以：
- 手动导入测试库（不使用 toolbox）
- 或者暂时降级到 Hardhat 2.x

---

## 📚 学习资源

- [Hardhat 3.x 文档](https://hardhat.org/hardhat-runner/docs/getting-started)
- [Hardhat 3.x 迁移指南](https://hardhat.org/hardhat-runner/docs/advanced/migrating-from-hardhat-2)
- [Solidity 文档](https://docs.soliditylang.org/)
- [Ethers.js v6 文档](https://docs.ethers.org/v6/)
- [OpenZeppelin 合约库](https://docs.openzeppelin.com/contracts/)
- [Hardhat 教程](https://hardhat.org/tutorial)

---

## ✨ 总结

Hardhat 3.x 项目已经成功初始化！虽然由于 toolbox 的兼容性问题，某些高级功能暂时不可用，但核心功能（合约编译、部署、本地网络）都可以正常使用。

**当前可用功能**：
- ✅ 合约编写和编译
- ✅ 本地网络运行
- ✅ 合约部署
- ✅ TypeScript 支持
- ✅ 多网络配置

**等待更新的功能**：
- ⏳ 完整测试套件
- ⏳ Gas 报告
- ⏳ 合约验证

祝您开发愉快！🚀
