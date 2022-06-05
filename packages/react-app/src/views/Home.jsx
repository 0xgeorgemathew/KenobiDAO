import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";

import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import { utils } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { Address, Balance, Events } from "../components";
import { SyncOutlined } from "@ant-design/icons";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts, address, mainnetProvider, localProvider, price, tx, writeContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const numAddressesWhitelisted = useContractReader(readContracts, "Hitlist", "numAddressesWhitelisted");
  const maxWhitelistedAddresses = useContractReader(readContracts, "Hitlist", "maxWhitelistedAddresses");
  return (
    <div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        This Is Your App Home. You can start editing it in{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          packages/react-app/src/views/Home.jsx
        </span>
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>✏️</span>
        Edit your smart contract{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          YourContract.sol
        </span>{" "}
        in{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          packages/hardhat/contracts
        </span>
      </div>
      {!purpose ? (
        <div style={{ margin: 32 }}>
          <span style={{ marginRight: 8 }}>👷‍♀️</span>
          You haven't deployed your contract yet, run
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            yarn chain
          </span>{" "}
          and{" "}
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            yarn deploy
          </span>{" "}
          to deploy your first contract!
        </div>
      ) : (
        <div style={{ margin: 32 }}>
          <span style={{ marginRight: 8 }}> 📝</span>
          The Number of Addressed in the Whitelist Are{" "}
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            {numAddressesWhitelisted}
          </span>
        </div>
      )}
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}> 📝</span>
        The Maximum Number Allowed Are{" "}
        <span
          className="highlight"
          style={{
            marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
            borderRadius: 4,
            fontWeight: "bolder",
          }}
        >
          {maxWhitelistedAddresses}
        </span>
      </div>
      <div style={{ margin: 8 }}>
        <Button
          onClick={() => {
            /* look how you call setPurpose on your contract: */
            tx(writeContracts.YourContract.setPurpose("🍻 Cheers"));
          }}
        >
          Set Purpose to &quot;🍻 Cheers&quot;
        </Button>
      </div>
      <div style={{ margin: 8 }}>
        <Button
          onClick={() => {
            /* look how you call setPurpose on your contract: */
            tx(writeContracts.Hitlist.addAddressToWhitelist());
          }}
        >
          Set Addr to &quot;🍻 Cheers&quot;
        </Button>
      </div>


      <Events
        contracts={readContracts}
        contractName="Hitlist"
        eventName="AddedToWhitelist"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🤖</span>
        An example prop of your balance{" "}
        <span style={{ fontWeight: "bold", color: "green" }}>({ethers.utils.formatEther(yourLocalBalance)})</span> was
        passed into the
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          Home.jsx
        </span>{" "}
        component from
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          App.jsx
        </span>
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>💭</span>
        Check out the <Link to="/hints">"Hints"</Link> tab for more tips.
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🛠</span>
        Tinker with your smart contract using the <Link to="/debug">"Debug Contract"</Link> tab.
      </div>
    </div>
  );
}

export default Home;
