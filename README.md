# 🗳️ VotEasy

Sistema de votação descentralizado com contrato inteligente em Solidity, API Node.js para comunicação com a blockchain e frontend em Next.js.

## Pré-requisitos

- Node v16+
- [Infura](https://infura.io/) (para deploy em Sepolia)
- Saldo em ETH testnet na carteira (Sepolia Faucet)

## 🚀 Executar projeto localmente

### Clonar o repositório

```bash
git clone https://github.com/vitoriaalbuqrq/VotEasy.git

cd voteasy
```

## 📄 Implantar o contrato na testnet

### 1. Navegar para a pasta contracts e instalar dependências

```bash
cd contracts

npm install
```

### 2. Criar arquivo `.env` na raiz da pasta contracts

```bash
RPC_NODE=seu_project_id_do_infura
CHAIN_ID=11155111
SECRET="sua frase mnemônica da metamask"
```
### 3. Compilar e fazer deploy do contrato na rede Sepolia

Obs: com Hardhat Ignition:

```bash
npx hardhat compile

npx hardhat ignition deploy ignition/modules/Voting.ts --network sepolia
```

## 📁 Configurar backend

### 1. Navegar para a pasta backend e instalar dependências

```bash
cd backend

npm install
```

### 2. Configurar endereço do contrato no backend

Copie o endereço do contrato que foi exibido no terminal após o deploy e cole em: `backend/config/contract/config.js`
```js
const CONTRACT_ADDRESS = "endereço_do_contrato"
const CONTRACT_ABI = [ /* ABI do contrato atualizado */ ];
```
> Sempre que alterar o contrato, atualize o `CONTRACT_ABI`.

### 3. Executar backend
```bash
npm run dev
```

## 📁 Inicializar o frontend

```bash
cd frontend

npm run dev
```

