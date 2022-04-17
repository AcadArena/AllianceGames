import { Server, Socket } from "socket.io"
import { Room, SocketEvent } from "interface"
import { joinRoom } from "utils/api"
import { runAsync } from "utils/hooks"

interface JoinRoomProps {
  username: string
  password: string
}
export const roomEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.JoinRoom, async (props: JoinRoomProps) => {
    console.log(socket.handshake.auth)
    // console.log("joining room")
    // const promise = joinRoom(props)
    // const [room, error] = await runAsync(promise)
    // if (error || !room) {
    //   console.log(error.response.data)
    //   const message =
    //     error.response?.data?.message || "Unable to join the room."
    //   return socket.emit(SocketEvent.Error, { title: "Oops!", message })
    // }
    // console.log("succcessfully joined")
    // socket.join(room.name)
  })
}