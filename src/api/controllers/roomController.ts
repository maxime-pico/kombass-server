import {
  SocketController,
  OnMessage,
  SocketIO,
  ConnectedSocket,
  MessageBody,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class RoomController {
  // lists rooms and how full it is, not used at the moment as I do not know
  // how to handle the automatic self room gracefully from the UX POV
  @OnMessage("list_rooms")
  public async listRooms(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const existingRooms = Array.from(io.sockets.adapter.rooms).filter(
      (r) => r[0] !== socket.id //except self
    );
    const responseArray = [];
    existingRooms.map((room) =>
      responseArray.push({ name: room[0], playersCount: room[1].size })
    );
    socket.emit("rooms_list", { rooms: responseArray });
  }

  @OnMessage("join_game")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("New user joining the room: ", message);

    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("join_room_error", {
        error: "room full",
      });
    } else {
      await socket.join(message.roomId);
      socket.emit("room_joined");

      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        socket.emit("start_game", { admin: false, player: 1 });
        socket
          .to(message.roomId)
          .emit("start_game", { admin: true, player: 0 });
      }
    }
  }
}
