import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import CheckBox from './CheckBox';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import useResourceByName, { RESOURCE_TYPES } from "../../hook/useResourceByName";
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import axios from "axios";

const BASE_URL = 'https://7007.ai';

const WalletPopover = ({ show, onClose, isMobile }) => {
  const RAINBOW = useResourceByName('rainbow.svg', RESOURCE_TYPES.IMAGE);
  const COINBASE = useResourceByName('coinbase_wallet.svg', RESOURCE_TYPES.IMAGE);
  const METAMASK = useResourceByName('meta_mask.svg', RESOURCE_TYPES.IMAGE);
  const WALLET_CONNECT = useResourceByName('wallet_connect.svg', RESOURCE_TYPES.IMAGE);
  const [check, setCheck] = useState(false);
  const [active, setActive] = useState('');
  const [nonce, setNonce] = useState('');
  const [provider, setProvider] = useState(null); 

  const domain = window.location.host;
  const origin = window.location.origin;

  const links = [
    { url: '#', content: 'rainbow', logo: RAINBOW },
    { url: '#', content: 'coinbase wallet', logo: COINBASE },
    { url: '#', content: 'metamask', logo: METAMASK },
    { url: '#', content: 'wallet connect', logo: WALLET_CONNECT },
  ];

  useEffect(() => {
    if (show) {
      sessionStorage.setItem('walletPopover', 'true');
    } else {
      sessionStorage.removeItem('walletPopover');
    }
    if (!isMobile) {
      document.body.style.overflow = show ? 'hidden' : '';
    }

    // 检查以太坊提供程序
    if (window.ethereum) {
      const newProvider = new BrowserProvider(window.ethereum);
      setProvider(newProvider);
    } else {
      console.error('Ethereum provider not found. Please install MetaMask.');
    }
  }, [isMobile, show]);

  const handleCheckboxChange = () => {
    setCheck(!check);
    // window.location = `${BASE_URL}/auth/discord/login`
  };

  const handleClick = (content) => {
    setActive(content);
  };

  const handleClose = () => {
    setActive('');
    setCheck(false);
    onClose();
  };

  const createSiweMessage = async (address, statement) => {
    const res = await axios(`${BASE_URL}/nonce`, {
      credentials: 'include',
    });
    const _nonce = await res.text();
    setNonce(_nonce);
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: '1',
      nonce: _nonce,
    });
    return message.prepareMessage();
  };

  const signInWithEthereum = async (discordUser) => {
    try {
      if (!provider) throw new Error('Provider is not available.');

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const message = await createSiweMessage(address, 'Sign in with Ethereum to the app.');
      const signature = await signer.signMessage(message);

      const siweMessage = {
        domain,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: origin,
        version: '1',
        chain_id: 1,
        nonce,
        issued_at: new Date().toISOString(),
        signature,
      };

      const body = {
        siwe_message: siweMessage,
        discord_user: {
          user_id: discordUser.userId,
          token: discordUser.token,
        },
      };

      const response = await axios(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in with Ethereum');
      }

      const result = await response.json();
      console.log('Successfully signed in:', result);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleNext = async () => {
    const discordUser = {
      userId: 'your_discord_user_id',
      token: 'your_discord_token',
    };

    await signInWithEthereum(discordUser);
    handleClose();
  };

  return (
    <AnimatePresence>
      {
        show && (
          <motion.div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[300]"
            initial={{ display: 'none' }}
            animate={{ display: 'flex' }}
            exit={{ display: 'none' }}
          >
            <motion.div className={cn("w-[380px] h-[440px] flex flex-col justify-center items-center py-6 px-6 border-black bg-white", { "w-[330px]": isMobile })}
              initial={{ opacity: 0, x: 100, display: 'none', scale: isMobile ? 0.8 : 1 }}
              animate={{ opacity: 1, x: 0, display: 'block', scale: isMobile ? 0.8 : 1 }}
              exit={{ opacity: 0, x: 100, rotate: [0], display: 'none' }}
              transition={{
                x: { duration: 0.5 },
                opacity: { duration: 0.5 },
                rotate: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
              }}
              style={{
                borderWidth: '5px',
                boxShadow: '-8px 8px 0px #000',
                willChange: 'transform, display, rotate'
              }}
            >
              <p className="w-full flex justify-end h-10">
                <IoCloseSharp className="absolute top-4 right-4 text-2xl leading-4 text-black font-bolder" onClick={handleClose} />
              </p>
              <h2 className="uppercase px-4 w-full text-start text-2xl select-none">connect a wallet</h2>
              <div className="flex flex-1 flex-col w-full px-4 my-7">
                {links.map((link, index) => (
                  <div
                    key={link.content}
                    href={link.url}
                    className={cn('underline uppercase flex-1 w-fit-content', { 'mb-4': index < links.length - 1 }, { 'text-themeGreen': active === link.content })}
                  >
                    <div className="flex transition-all w-fit select-none" onClick={() => handleClick(link.content)} >
                      <img src={link.logo} alt={link.content} className={cn("w-6 h-6 mr-2 rounded opacity-60 m-pointer", { "opacity-100": active === link.content })} />
                      <div className="m-pointer">{link.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mb-6 2xl:mb-4">
                <div className="h-inherit flex items-center mr-4">
                  <CheckBox checked={check} onChange={handleCheckboxChange} />
                </div>
                <div className="uppercase underline select-none">binding my account to discord</div>
              </div>
              {/* <Button kls="w-full text-sm max-h-12" isMobile={isMobile} noShadow={true} disabled={!check || !active} onClick={handleNext}>coming soon</Button> */}
              <Button kls="w-full text-sm max-h-12" isMobile={isMobile} noShadow={true} disabled={true} onClick={handleNext}>coming soon</Button>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
}

export default WalletPopover;
