import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import CheckBox from './CheckBox';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import useResourceByName, { RESOURCE_TYPES } from "../../hook/useResourceByName";
// import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import axios from "axios";

const WalletPopover = ({ show, onClose, isMobile }) => {
  const RAINBOW = useResourceByName('rainbow.svg', RESOURCE_TYPES.IMAGE);
  const COINBASE = useResourceByName('coinbase_wallet.svg', RESOURCE_TYPES.IMAGE);
  const METAMASK = useResourceByName('meta_mask.svg', RESOURCE_TYPES.IMAGE);
  const WALLET_CONNECT = useResourceByName('wallet_connect.svg', RESOURCE_TYPES.IMAGE);
  const [check, setCheck] = useState(false);
  const [active, setActive] = useState('');
  
  const domain = window.location.host;
  const uri = window.location.origin;
  const statement = 'Hello, 7007'
  const nonce = 'HELLOWORLD'
  const version = '1'
  const chain_id = 1

  const links = [
    { url: '#', content: 'rainbow', logo: RAINBOW },
    { url: '#', content: 'coinbase wallet', logo: COINBASE },
    { url: '#', content: 'metamask', logo: METAMASK },
    { url: '#', content: 'wallet connect', logo: WALLET_CONNECT },
  ];
  
  const [bindingText, setBindingText] = useState('binding my account to discord')
  const [discordUser, setDiscordUser] = useState(null)
  useEffect(() => {
    if (show) {
      sessionStorage.setItem('walletPopover', 'true');
      // get user discord info
      const urlParams = new URLSearchParams(window.location.search);
      const user_id = urlParams.get('user_id');
      const username = urlParams.get('username');
      const token = urlParams.get('token');
      const error = urlParams.get('error');
      if (user_id && username && token) {
        setCheck(true)
        setDiscordUser({
          user_id: Number(user_id),
          token,
          username
        })
        setBindingText("you've bound discord already")
      } else if (error) {
        setBindingText("try again after join the role")
      }
      
    } else {
      sessionStorage.removeItem('walletPopover');
    }
  }, [show]);

  const handleCheckboxChange = () => {
    if (loading) return;
    if (!check) {
      window.location = `https://discord.com/oauth2/authorize?client_id=1295299417452056658&response_type=code&redirect_uri=https%3A%2F%2Fnewwaitlist-gray.vercel.app%2Fcallback&scope=identify+guilds+guilds.members.read`
    } else {
      // setCheck(false)
    }
  };

  const handleClick = (content) => {
    setActive(content);
  };

  const handleClose = () => {
    setActive('');
    setCheck(false);
    onClose();
  };

  const createSiweMessage = async (address) => {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri,
      version,
      chain_id,
      nonce,  
    });
    return message.prepareMessage();
  };
  const [loading, setLoading] = useState(false)
  const handleBind = (address, issued_at, signature) => {
    const params = {
      guild_member_req: discordUser,
      siwe_message_req: {
        domain,
        address,
        statement,
        uri,
        version,
        chain_id,
        nonce,
        issued_at,
        signature
      }
    }
    axios.post('/bind', params).then(() => {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }


  const handleNext = async () => {
    if (window.ethereum) {
      // setLoading(true)
      // const newProvider = new BrowserProvider(window.ethereum);
      // const signer = await newProvider.getSigner();
      // const address = await signer.getAddress();
      // const message = await createSiweMessage(address);
      // const signature = await signer.signMessage(message);
      // const issue_at = new Date().toISOString()
      // handleBind(address, issue_at, signature)
    } else {
      console.error('Ethereum provider not found.');
    }
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
                <div className="uppercase underline select-none">{bindingText}</div>
              </div>
              <Button kls="w-full text-sm max-h-12" loading={loading} isMobile={isMobile} noShadow={true} disabled={!check || !active} onClick={handleNext}>next</Button>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
}

export default WalletPopover;
