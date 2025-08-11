# 🗳️ VotEasy - Sistema de Votação Online com Blockchain

O **VotEasy** é uma aplicação web que permite criar, gerenciar e participar de votações online de forma prática, garantindo transparência, imutabilidade e confiabilidade com o uso da blockchain, utilizando **smart contracts em Ethereum**. 

## 🚀 Funcionalidades

- API que interage com o smart contract usando uma carteira única do sistema. Assim, os usuários conseguem votar sem precisar pagar taxas de transação ou conectar suas próprias carteiras, todo o custo fica centralizado nesse endereço.
- Cadastro e autenticação de usuários (votantes e organizadores) com confirmação via e-mail ou conta Google, utilizando JWT;
- Dashboard para organizadores criarem e gerenciarem suas votações;
- Registro na blockchain de todas as votações e votos, garantindo integridade, transparência e imutabilidade;
- Votações públicas acessíveis a todos os votantes autenticados;
- Resultado automático, calculado e armazenado na blockchain.

## ⚙️ Arquitetura do Sistema

### ***Arquitetura híbrida Web3***

![Image](https://github.com/user-attachments/assets/f835d52d-a9c2-4d70-b196-fb27f9c5a74b)

## 🛠️ Tecnologias Utilizadas

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Zod + React Hook Form
  
### Backend
- Node.js
- Express.js
- MongoDB
- Autenticação com JWT e OAuth (Google)

### Smart Contract
- Solidity
- Hardhat
- Deploy na testnet Sepolia via [Infura](https://infura.io/)

## ⬇️ Como rodar o projeto localmente

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
### 2. Criar arquivo `.env` na raiz da pasta backend

```bash
# Configurações para a blockchain Ethereum
INFURA_PROJECT_ID=       # Utilizado como gateway RPC para a rede Ethereum
ETHEREUM_NETWORK=        # Nome da rede Ethereum (sepolia)
SIGNER_PRIVATE_KEY=      # Chave privada da conta que assina transações no contrato inteligente (Metamask)

# Configurações do banco de dados (mongoDB)
DB_USER=
DB_PASS=
DATABASE_URL=

# Configurações para envio de email
EMAIL_PASSWORD=
EMAIL=

# Configurações de autenticação com o Google (login OAuth)
SECRET=
GOOGLE_CLIENT_ID=     
GOOGLE_CLIENT_SECRET=
```

### 3. Configurar endereço do contrato no backend

Copie o endereço do contrato que foi exibido no terminal após o deploy e cole em: `backend/config/contract/config.js`
```js
const CONTRACT_ADDRESS = "endereço_do_contrato"
const CONTRACT_ABI = [ /* ABI do contrato atualizado */ ];
```
> Sempre que alterar o contrato, atualize o `CONTRACT_ABI`.

### 4. Executar backend
```bash
npm run dev
```

## 📁 Configurar o frontend

### 1. Navegar para a pasta backend e instalar dependências

```bash
cd frontend
npm install

npm run dev # Executar frontend
```
### 2. Criar arquivo `.env` na raiz da pasta frontend

```bash
# Para verificar a autenticidade do token JWT (executado no lado do servidor)
SECRET= # Mesmo secret do backend
```

