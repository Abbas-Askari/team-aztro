import { useEffect, useState } from "react"
import { BiChat } from "react-icons/bi";

const Message = ({message}) => {

  return (
    <div className={`w-full flex ${message.isNative ? "justify-end" : "justify-start"}`}>
      <p onClick={e => {e.preventDefault(); e.stopPropagation();}} className={`text-white whitespace-normal truncate max-w-[80%] rounded-lg text-sm sm:text-xl font-mono p-1 px-2 sm:p-2 sm:px-4 ${message.isNative ? "bg-neutral-800" : "bg-neutral-900"}`}>{message.text}</p>
    </div>
  )
}

export const Chat = ({socket, collapsed, setCollapsed, messages, setMessages}) => {

  const [message, setMessage] = useState("")
  const [messageCount, setMessageCount] = useState(0)

  const newMessage = (text, isNative) => {
    setMessages(m => [{text, isNative}, ...m])
  }

  useEffect(() => {
    if (messages.length === 0) return;
    if (collapsed) setMessageCount(c => c+1)
  }, [messages])

  useEffect(() => {
    if (!socket) return;
    const addNewMessage = (message) => {
      newMessage(message, false)
    }
    socket.on("message", addNewMessage)

    return () => socket.off("message", addNewMessage)
  }, [socket])

  const sendMessage = () => {
    if (message.length === 0) return;
    if (!socket) return;
    socket.emit("message", message, () => {
      newMessage(message, true)
    })
    setMessage("")
  }

  return (
    <>
    {!collapsed && <div className="fixed right-0 bottom-0 flex items-center h-2/3 w-1/4 flex-col gap-2 p-2" onClick={() => setCollapsed(true)}>
      <div className="relative flex flex-col h-full gap-4 w-full bg-black/90 rounded-lg p-4">
        <h1 className="text-white text-center text-4xl">Chat</h1>
        <div className="flex-1 flex flex-col-reverse gap-1 overflow-y-scroll">
          {messages.map(m => <Message message={m} />)}
        </div>
        <div onClick={e => {e.preventDefault(); e.stopPropagation();}} className="flex gap-2">
          <input 
          autoFocus
          onKeyDown={(e) => {if (e.key === "Enter") sendMessage()}} 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          type="text" 
          className="flex-1 rounded-xl p-2 focus:outline-none text-black" 
          placeholder="Message..."/>
          <button className="p-1 px-2 sm:px-4 sm:p-2 text-white font-semibold font-mono tracking-wider rounded-lg bg-red-700" onClick={sendMessage}>Send</button>
        </div>        
      </div>  
    </div>}
    {collapsed &&
    <div className="fixed right-0 bottom-0 p-2">
      <button className={`relative text-white h-16 aspect-square border-black bg-neutral-800 p-4 rounded-full border-2 border-r-0`} onClick={() => {setCollapsed(false); setMessageCount(0)}}>
        <BiChat className="w-full h-full"/>
        {messageCount > 0 && <p className="absolute flex items-center justify-center top-0 left-0 rounded-full aspect-square -translate-x-1/2 -translate-y-1/2 w-6 text-xs bg-red-700">{messageCount >= 9 ? "9+" : messageCount}</p>}
      </button>
    </div>}
    </>
  )
}