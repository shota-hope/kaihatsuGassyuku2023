import type { NextPage } from "next";
import Web3 from "web3";
// import { AbiItem } from "web3-utils";
import ZCContract from "../../build/contracts/ZennCoin.json";
import { ZennCoin } from "../../types/abi/ZennCoin";
import { useState } from "react";
export type AbiType = "function" | "constructor" | "event" | "fallback";
export type StateMutabilityType = "pure" | "view" | "nonpayable" | "payable";

// AbiItemがライブラリからみつからないからベタガキ
export interface AbiItem {
  anonymous?: boolean;
  constant?: boolean;
  inputs?: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  payable?: boolean;
  stateMutability?: StateMutabilityType;
  type: AbiType;
  gas?: number;
}
export interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
  internalType?: string;
}

export interface AbiOutput {
  name: string;
  type: string;
  components?: AbiOutput[];
  internalType?: string;
}

// プロバイダの設定
const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:7545`));

// コントラクトのアドレス
const address = "0x90e67a58071710EDEc766B07eAa71fCE15EB9Ce7";

const ABI = ZCContract.abi as any as AbiItem;
// コントラクトのインスタンス
const contract = new web3.eth.Contract(ABI, address) as unknown as ZennCoin;

const walletAddressUserA = "0x8608E05FA3bF0e59674A5F258a0B09CDFbfc2484";
const walletAddressUserB = "0x563260C16a628113D9C72f68E4862c8Ed76d86e2";

const contractFromA = new web3.eth.Contract(ABI, address, {
  from: walletAddressUserA,
}) as unknown as ZennCoin;

const Home: NextPage = () => {
  const [balanceZcUserA, setBalanceZcUserA] = useState(""); // ZennCoin残高 UserA
  const [balanceEthUserA, setBalanceEthUserA] = useState(""); // ETH残高 UserA
  const [balanceZcUserB, setBalanceZcUserB] = useState(""); // ZennCoin残高 UserB
  const [balanceEthUserB, setBalanceEthUserB] = useState(""); // ETH残高 UserB
  const getBalance = async (userType: string) => {
    if (userType === "a") {
      setBalanceZcUserA(
        await contract.methods.balanceOf(walletAddressUserA).call()
      );
      setBalanceEthUserA(await web3.eth.getBalance(walletAddressUserA));
    } else if (userType === "b") {
      setBalanceZcUserB(
        await contract.methods.balanceOf(walletAddressUserB).call()
      );
      setBalanceEthUserB(await web3.eth.getBalance(walletAddressUserB));
    }
  };

  const transferZennCoin = async () => {
    await contractFromA.methods.transfer(walletAddressUserB, 1000).send();
  };

  return (
    <div className="m-5">
      <h2>UserA Info</h2>
      {balanceZcUserA ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserA}</td>
              <td className="border px-4 py-2">{balanceEthUserA}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserA 残高を取得」を押してください</div>
      )}
      <h2>UserB Info</h2>
      {balanceZcUserB ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserB}</td>
              <td className="border px-4 py-2">{balanceEthUserB}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserB 残高を取得」を押してください</div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getBalance("a")}
      >
        UserA 残高を取得
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5"
        onClick={() => getBalance("b")}
      >
        UserB 残高を取得
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-5"
        onClick={transferZennCoin}
      >
        Transfer ZennCoin From A To B
      </button>
    </div>
  );
};

export default Home;
