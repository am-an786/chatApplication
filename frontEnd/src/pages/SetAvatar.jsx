import React,{useState,useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";


export default function Avatar(){

    // const api ="https://api.multiavatar.com/45678945";
    const navigate=useNavigate();
    const [avatars, setAvatars]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatars, setSelectedAvatars]= useState(undefined);

    const toastOptions= {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      };

      useEffect(()=> {
          
        if(!localStorage.getItem("chat-app-user")){
             navigate("/login");
       } 

    },[navigate]);

      const setProfilePicture =async ()=>{
           if(selectedAvatars === undefined){
             toast.error("Please select an Avatar", toastOptions);
           } else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatars],
            });
             if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage =data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
             }else{
                toast.error("Error setting avatar. Please try again", toastOptions);
             }
           }
      };

      useEffect(() => {
        const fetchAvatars = async () => {
          try {
            const data = [];
            const api = "https://api.multiavatar.com/45678945";
            
            for (let i = 0; i < 4; i++) {
              const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, {
                responseType: 'arraybuffer' // Ensure response is treated as binary data
              });
              const base64Image = Buffer.from(response.data, 'binary').toString('base64');
              data.push(base64Image);
            }
            
            setAvatars(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching avatars:', error);
          }
        };
      
        fetchAvatars();
      }, []);

    return(
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader"  className="loader"/>
                </Container> 
                    : 
                 (<Container>
                 <div className="title-container">
                   <h1>Pick an avatar as your profile picture</h1>
                 </div>
                 <div className="avatars">
                   {
                       avatars.map((avatar,index)=> {
                           return (

                               <div key={index} className={`avatar ${selectedAvatars === index ? "selected" : ""}` }>
                                   <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"  onClick={()=> setSelectedAvatars(index)}/>
                               </div>
                           )
                       })
                   }
                 </div>
                 <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
              </Container>)
            }
            <ToastContainer/>
        </>
    );
};

const Container =styled.div`
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          gap:3rem;
          background-color:#131324;
          width:100vw;
          height:100vh;

          .loader{
            max-inline-size:100%;
          }

          .title-container{
            h1{
                color:white;
            }
          }

          .avatars {
            display: flex;
            gap: 2rem;
        
            .avatar {
              border: 0.4rem solid transparent;
              padding: 0.4rem;
              border-radius: 5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: 0.5s ease-in-out;
              img {
                height: 6rem;
                transition: 0.5s ease-in-out;
              }
            }
            .selected {
              border: 0.4rem solid #4e0eff;
            }
          }
          .submit-btn{
            background-color:#997af0;
            color:white;
            padding: 1rem 2rem;
            border:none;
            font-weight:bold;
            cursor: pointer;
            border-radius: 0.4rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
             &:hover{
                background-color:#4e0eff;
             }
        }


`;