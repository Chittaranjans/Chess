import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
import mode2Img from "../../../assets/img/select_game_friend.png";
import mode3Img from "../../../assets/img/select_game_computer.png";
import song from "../../../assets/audio/gameselect.mp3";
import useSound from "use-sound";
import { connectWallet } from "../../../utils/interact";
import truncateEthAddress from 'truncate-eth-address'
import store from "../../../store/store";

export const GameSelect = () => {
  const [playSong] = useSound(song);
  const navigate = useNavigate();

  const walletAddress = store((state) => state.walletAddress);
  const setWalletAddress = store((state) => state.setWalletAddress);
  const isWalletConnected = store((state) => state.isWalletConnected);
  const setIsWalletConnected = store((state) => state.setIsWalletConnected);

  const handleConnectWallet = async () => {
    const walletResponse = await connectWallet();
    
    // Update the store with wallet address and status
    setWalletAddress(walletResponse.address);
    setIsWalletConnected(true);
  };

  const matchPlayAction = () => {
    navigate("/matchPlay");
    playSong();
  };

  const friendPlayAction = () => {
    navigate("/friendPlay");
    playSong();
  };

  const machinePlayAction = () => {
    navigate("/machinePlay");
    playSong();
  };

  return (
    <div className="GameSelect">
      <button className="account-button" onClick={handleConnectWallet}>{isWalletConnected ? truncateEthAddress(walletAddress): "Connect Wallet"}</button>
      <div className="u-container">
        <div className="u-ribbon">Select game</div>
        <div className="u-content">
          <div className="u-item" onClick={matchPlayAction}>
            <Image className="u-item-image" src={mode1Img}></Image>
            <div className="u-item-text">Match with Random User</div>
          </div>
          <div className="u-item" onClick={friendPlayAction}>
            <Image className="u-item-image" src={mode2Img}></Image>
            <div className="u-item-text">Match with Friend</div>
          </div>
          <div className="u-item" onClick={machinePlayAction}>
            <Image className="u-item-image" src={mode3Img}></Image>
            <div className="u-item-text">Match with Computer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelect;
