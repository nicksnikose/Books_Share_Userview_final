import React, { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,

  
} from "@material-tailwind/react";
import {
  ChevronDownIcon,

  Bars3Icon,
  XMarkIcon,

} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import Protected from '../features/auth/Protected';
import { selectProduct } from '../features/product/productSlice';
import { selectItems } from '../features/cart/cartSlice';

const navListMenuItems  = [
    {
        title: "Bookstore",
        to:"/store"
    },
    
    {
        title: "Sell Books",
        to:"/sell"
    }
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const renderItems = navListMenuItems.map(
    ({ title, to}) => (
      // eslint-disable-next-line react/jsx-key
      <div key={title}>
            <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-green-700 ">
            <Typography variant="h6" color="blue-gray"  className=" lg:text-center p-2 hover:text-white">
            <Link to={to} >
             {title }
             </Link>
            </Typography>
            </MenuItem>
          </div>
    )
    );

    
 //resource dropdown menu
  return (
    <React.Fragment> 
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      offset={{ mainAxis: 20 }}
      placement="bottom"
      >
      <MenuHandler>
        <Typography as="div" variant="small" className="font-normal ">
          <ListItem
            className="flex items-center gap-2 py-2 pr-4 hover:bg-green-700 hover:text-white"
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          >
            
            BOOKS
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`hidden h-3 w-3 transition-transform lg:block ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`block h-3 w-3 transition-transform lg:hidden ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid  gap-y-2">{renderItems}</ul>
      </MenuList>
    </Menu>
    <div className="block lg:hidden">
      <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
    </div>
  </React.Fragment>
  );
}
 
function NavList() {

  const Navigate = useNavigate()
  const user = useSelector(selectLoggedInUser)
 const [data1,setData]=useState([])
  const [Quantity,setQuantity] = useState(0)
  const [Quantity1,setQuantity1] = useState(0)

    
  useEffect(()=>{
   const getcart =async () =>{
    const response = await fetch(`http://localhost:5000/cart/getcart/${user._id}`,{
      method: 'GET'
    })
    const data = await response.json()
   
    // console.log(data.length)
    setQuantity(data.length)
   }
   getcart()
  },[])


  useEffect(()=>{
  
    const getproduct =async ()=>{
      const product = await fetch(`http://localhost:5000/products/${user._id}`)
      const data = await product.json()
      console.log(data)
      setData(data)
    }
    getproduct()
    
      },[]);
      
const product = useSelector(selectItems)

 const not = data1.filter((item)=>{
       return item.bargain === 'no'
 })
 console.log(not.length)


  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 lg:pr-[40px] ">
        <Link to="/">
      <Typography as="a"  variant="small" className="font-normal">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
          HOME
        </ListItem>
      </Typography>
        </Link>
   
      <Typography as="a"  variant="small" className="font-normal">
        <Link  to="/aboutus">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
          ABOUT US
        </ListItem>
        </Link>
      </Typography>

        <Link to="/donor">
      <Typography as="a"  variant="small" className="font-normal">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
        
          DONORS
        </ListItem>
      </Typography>
          </Link>

      <Typography as="a"  variant="small" className="font-normal">
        <Link to="/blogpage">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
          BLOGS
        </ListItem>
        </Link>
      </Typography>
     
      <NavListMenu />

        <Link to="/contactus">
      <Typography as="a"  variant="small" className="font-normal">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
          CONTACT US
        </ListItem>
      </Typography>
        </Link>
        
      <Typography
        as="a"
        
        variant="small"
        className="font-normal"
      >
        <Link to="/cart">
        <ListItem className="flex items-center gap-2 py-2 pr-10 hover:bg-green-700 hover:text-white">
          <BsCart3 className="h-[18px] w-[18px]" />
          <span className="  rounded-md  -ml-3 -mt-5  bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {Quantity}
                    </span>
        </ListItem>
        </Link>
      </Typography>
      <Typography >
       
      <Menu>
      
      <MenuHandler>
    
        <ListItem>  
            { !user ?(<Avatar src="./user-profile.png" alt="avtar" className='h-[18px] w-[18px]' variant='rounded'/>
):(      <Avatar src={`./userProfile/${user?.img}`} alt="avtar" className='w-5 h-5 sm:items-center lg:-mt-2' variant='rounded'/>
)
          }   
          <span className="  rounded-md   -mt-6  bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {not.length}
                    </span>
      </ListItem >
      </MenuHandler>
      <MenuList>
        <MenuItem><b>{user?.firstName}</b></MenuItem>
        <Link to="/edit">
        <MenuItem>Edit </MenuItem>
        </Link>
        <Protected>
        <Link to ='/myproduct'>
        <MenuItem>My Books <span className="  rounded-md    bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {not.length}
                    </span> </MenuItem>
        </Link>
        </Protected>
        <MenuItem>View</MenuItem>
        <Link to ='/notification'>
        <MenuItem>Notification</MenuItem></Link>
        <MenuItem >Logout</MenuItem>
      </MenuList>
   </Menu>

      
      </Typography>
    </List>
  );
}
 
export default function Example() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  return (
    <div className="flex justify-center items-center"> <div className="2xl:container 2xl:w-full lg:w-full w-full relative ">
     <Navbar className="fixed top-0 left-0 right-0 inset-auto  z-10 block h-max w-full rounded-none border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-black shadow-lg backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
     <div className="flex items-center justify-between text-white-900 lg:pl-10">
        
        <Link to="/">

        <img src="./images/logo.jpeg" className='h-12' alt='LOGO' />
        </Link>
     
        <div className="hidden lg:block">
          <NavList />
        </div>
      

      
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        
      </Collapse>
    </Navbar>
    </div>
    </div>
  );
}