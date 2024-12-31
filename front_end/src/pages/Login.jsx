import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useLoginUserMutation,
  useRegisterUserMutation
} from '@/features/api/authApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [signUpInput, setSignUpInput] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  })

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess
    }
  ] = useRegisterUserMutation()
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess
    }
  ] = useLoginUserMutation()

  const changeHandler = (e, type) => {
    const { name, value } = e.target
    if (type === 'signup') {
      setSignUpInput({ ...signUpInput, [name]: value })
    } else {
      setLoginInput({ ...loginInput, [name]: value })
    }
  }

  const handleRegister = async type => {
    const inputData = type === 'signup' ? signUpInput : loginInput
    const action = type === 'signup' ? registerUser : loginUser
    await action(inputData)
  }

  const navigate=useNavigate();
  useEffect(() => {

    if(registerSuccess && registerData){
      toast.success(registerData.message || "SignUp SuccessFul")
    }
    if(loginSuccess && loginData){
      toast.success(loginData.message || "Login SuccessFul")
      navigate("/")

    }
    if(registerError){
      toast.error(registerError.data.message || "Signup Failed")
    }
    if(loginError){
      toast.error(loginError.data.message || "Login Failed")
    }

  }, [
    loginLoading,
    registerLoading,
    loginData,
    registerData,
    loginError,
    registerError
  ])
  return (
    <div className='flex items-center justify-center w-full mt-20'>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='signup'>SignUp</TabsTrigger>
          <TabsTrigger value='login'>Login</TabsTrigger>
        </TabsList>
        <TabsContent value='signup'>
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                create a new account and signup whenever you are ready
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  value={signUpInput.name}
                  onChange={e => changeHandler(e, 'signup')}
                  placeholder='jainish parmar'
                  required={true}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  value={signUpInput.email}
                  onChange={e => changeHandler(e, 'signup')}
                  placeholder='enter email here'
                  required={true}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  value={signUpInput.password}
                  onChange={e => changeHandler(e, 'signup')}
                  placeholder='enter password here '
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerLoading}
                onClick={() => handleRegister('signup')}
              >
                {registerLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please
                    wait
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='login'>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login here.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  type='email'
                  name='email'
                  value={loginInput.email}
                  onChange={e => changeHandler(e, 'login')}
                  placeholder='enter email here'
                  required={true}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  value={loginInput.password}
                  onChange={e => changeHandler(e, 'login')}
                  placeholder='enter password here '
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginLoading}
                onClick={() => handleRegister('login')}
              >
                {loginLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please
                    wait
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login
