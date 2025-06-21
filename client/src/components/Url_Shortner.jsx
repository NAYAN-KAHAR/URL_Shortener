
import { useEffect, useState } from "react";
import { HiQrCode } from "react-icons/hi2";
import axios from 'axios';
import QRCode from 'react-qr-code';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegCopy } from "react-icons/fa";
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';
import Server_Url from './Constant';

const UrlShortner = () => {
    const [modal, setModal] = useState(false);
    const [originalUrl, setOriginalUrl] = useState();
    const [allUrl, setAllUrl] = useState([]);
    const [qrcode, setQrCode] = useState();
    const [user, setUser] =   useState();

 useEffect(() => {
    let storedNanoId = Cookies.get('userId');
    if (!storedNanoId) {
        storedNanoId = nanoid(8);
        Cookies.set('userId', storedNanoId, { expires: 365, path: '' }); // Set once with expiry
    }
    setUser(storedNanoId);
}, []);

    const handleUrl = async () => {
        try{
            if(!originalUrl) return alert('please enter link first');
            const res = await axios.post(`${Server_Url}/api/short`, { originalUrl, user });
            // console.log(res.data.message);
            if(res.data.message == "Already shorten") toast.error("Already shorten");
            setOriginalUrl(' ');
            
        }catch(err){
            console.log('error from postURL', err);
            // console.log(err.response.data.error);
             toast.error(err.response.data.error);
             toast.error(err.response.data.message);
        }
    }

    const findAllUrl = async () => {
        try{
            const res = await axios.get(`${Server_Url}/api/all/${user}`);
            // console.log(res.data);
            setAllUrl(res.data.url);
        }catch(err){    
            console.log('error from findURL', err);
        }
    }

   useEffect(() => {
     if (user) {
       findAllUrl();
     }
    }, [originalUrl, user]);

    // generate Uqcode
    const handleQrCode = (url) => {
        setModal(true);
        setQrCode(url) ;
    }

    // copy url 
    const handleCopy = async (url) => {
    const newURL = `${Server_Url}/api/${url}`;
       try{
        await navigator.clipboard.writeText(newURL);
        toast.success('copied');
       }catch(err){
        console.log(err);
       }
    }

    // handle delete url
    const deleteUrl = async (originalUrl) => {
        if(!originalUrl) return
        try{
            const res = await axios.delete(`${Server_Url}/api/urldelete`, { data: { originalUrl } });
            // console.log(res.data);
            setOriginalUrl(' ');
        }catch(err){
            console.log(err)
        }
        // console.log(originalUrl);
    }

    return(
        <>
     <ToastContainer />
        <div className="w-screen h-screen  flex items-center justify-center bg-gradient-to-r from-[#111729] via-[#181a3d] to-[#1d1b48]">
      
            <div className="w-[100%] h-[100%] lg:w-[60%] md:w-[80%] sm:w-[80%] flex justify-center flex-col ">
                <div>
                    <h1 className="text-center text-3xl font-bold text-white">Best Free URL Shortener: Track & Optimize Links</h1>
                </div>

                <div className="p-2 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-4 mt-5">
                    <input type="text" className="outline-none border-none  w-full p-3 rounded-lg bg-gray-100" placeholder="Enter Link Here" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)}/>
                    <button className="w-full lg:w-50 md:w-50 sm:w-50 px-3 py-3 bg-violet-900 font-bold rounded-lg text-white cursor-pointer hover:bg-violet-700" onClick={handleUrl}>Shorten URL</button>
                </div>


               <div className=" p-2 mt-5 space-y-4 max-h-[60%] sub-div">
                       {allUrl && allUrl.map((data,i) => {
                        return (
                          
                              <div key={i}
                                className="w-full p-3 shadow-sm bg-white rounded-lg  flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between items-start md:items-center gap-4" >
                              <p className="truncate w-full lg:w-auto text-lg">{data.originalUrl}</p>
                               <div className="flex gap-4 items-center ">
                                  <a href={`${Server_Url}/api/${data.shortenUrl}`} target="_blank" rel="noopener noreferrer"
                                  className="text-sm md:text-lg sm:text-sm lg:text-lg text-violet-700 font-bold">{data.shortenUrl}</a>

                                  <HiQrCode size={20} className="cursor-pointer"
                                   onClick={() => handleQrCode(data.originalUrl)} />

                                   <p onClick={() => handleCopy(data.shortenUrl)} className="text-sm md:text-lg sm:text-sm lg:text-lg  font-bold text-violet-700 cursor-pointer">
                                    <FaRegCopy size={18}/>
                                    </p>

                                   <p onClick={() => deleteUrl(data.originalUrl)} className="text-xl font-bold text-violet-700 hover:text-red-500 cursor-pointer">X</p>
                                 </div>
                               
                             </div>
                      
                        )
                       })}
               

                </div>
               </div>


            </div>
      

        {modal && (
                <div className="fixed inset-0  flex items-center justify-center z-50 modal">
                    <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <button  className="absolute top-2 right-2 text-gray-500 text-2xl font-bold cursor-pointer"
                            onClick={() => setModal(false)}>X</button>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-4">QR Code</h2>
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-600">  <QRCode value={qrcode} size={180} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default UrlShortner;