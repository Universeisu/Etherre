import React from "react";
import sushiTokenList from "@sushiswap/default-token-list";
import KovanTokenList from "../../constants/tokenLists/kovanTokenList.json";
import Token from "../../components/Token";
import FindPair from "../../components/FindPair";
import MigrateLiquidity from "../../components/MigrateLiquidity";

export default function Pool() {
  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <h3 className="font-semibold text-purple-800 mb-2 rounded text-center bg-purple-100">
        Migrate your liquidity from Uniswap to Sushiswap to earn sushi in
        addition to LP fees
      </h3>
      <div className="grid gap-x-4 gap-y-4 md:grid-cols-3  bg-gray-100 px-2 py-2 rounded">
        <div className="  shadow-md border-gray-100 rounded border-1 bg-white">
          <div className="p-2 font-bold">
            CLICK THE COPY ICON TO COPY ADDRESS
          </div>
          {KovanTokenList.tokens.map((token, index) => (
            <Token token={token} key={index + token.symbol} />
          ))}
        </div>
        <div className=" flex flex-col shadow-md border-gray-100 rounded border-1 bg-white">
          <div className="p-2 font-bold">FIND YOUR LP TOKEN</div>
          <FindPair />
        </div>
        <div className=" shadow-md border-gray-100 rounded border-1 bg-white">
          <div className="p-2 font-bold">
            MIGRATE YOUR LIQUIDITY TO SUSHISWAP
            <MigrateLiquidity />
          </div>
        </div>
      </div>
    </div>
  );
}
