import React from "react";
import UserDashboard from "./Dashboard/UserDashboard";
import TokenData from "./TokenData";

export default function IPFS() {
  
  return (
      <div className="flex">
        <UserDashboard />
          <p>IPFS</p>
          <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">test</button>
      </div>
  );
}
