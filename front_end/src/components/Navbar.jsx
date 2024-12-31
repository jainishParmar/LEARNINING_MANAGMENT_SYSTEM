import { Menu,Link, School } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    
  } from "@/components/ui/sheet"
  import { Separator } from "@radix-ui/react-dropdown-menu";

  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DarkMode from '@/DarkMode'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const user = false
  return (
    <div className='h-16 bg-white border-b  border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      <div className='md:flex max-w-7xl mx-auto hidden justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
          <School size={'30'} />
          <h1 className='hidden md:block font-extrabold text-2xl'>
            E-Learning
          </h1>
        </div>
        <div className='flex items-center gap-8'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>DashBoard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-2'>
              {' '}
              <Button variant='outline'>Login</Button>
              <Button variant='outline'> SignUp</Button>
            </div>
          )}
          <DarkMode/>
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-full ">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar user={user}/>
      </div>


    </div>
  )
}

export default Navbar

const MobileNavbar = ({user}) => {
    const navigate = useNavigate();
    
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full hover:bg-gray-200"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle> <Link to="/">E-Learning</Link></SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <Link to="/my-learning">My Learning</Link>
            <Link to="/profile">Edit Profile</Link>
            <p>Log out</p>
          </nav>
          {user?.role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    );
  };
