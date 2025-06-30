import { useEffect } from 'react'
import { Animated404Error } from './AnimatedChat'
import toast from 'react-hot-toast'
const notfound = () => {
  useEffect(()=>{
    toast.error("404: Page not found!")
  }, [])
  return (
    <div className='h-[calc(100dvh-84px)] border border-current/20 rounded-2xl shadow-2xl overflow-hidden flex justify-center items-center'>
        <Animated404Error />
    </div>
  )
}
export default notfound