import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <Component />
    </ThirdwebProvider>
  );
}

function Component() {
  const { contract, isLoading } = useContract(
    "0x3D01d7C35143f47bdDDaC0324a38A532e88E1B6a"
  );

  const { data: determineResult, isLoading: resultLoading } = useContractRead(
    contract,
    "determineResult",
    [/* Pass your arguments here */]
  );

  const { data: player, isLoading: playerLoading } = useContractRead(
    contract,
    "player",
    [/* Pass your arguments here */]
  );

  const { mutateAsync: play, isLoading: playLoading } = useContractWrite(
    contract,
    "play"
  );

  const { mutateAsync: resetGame, isLoading: resetLoading } = useContractWrite(
    contract,
    "resetGame"
  );

  const handlePlay = async (move) => {
    try {
      const data = await play({ args: [move] });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleResetGame = async () => {
    try {
      const data = await resetGame({ args: [/* Pass your arguments here */] });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div>
      <>
        <h1>Rock Paper Scissors Game</h1>
      </>
    </div>
  );
}

export default App;
