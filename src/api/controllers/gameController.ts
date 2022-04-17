import {
  SocketController,
  OnMessage,
  SocketIO,
  ConnectedSocket,
  MessageBody,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class GameController {
  private getSocketGameRoom(socket: Socket): string {
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    //add making sure we're actually connected to a socket
    const gameRoom = socketRooms && socketRooms[0];

    return gameRoom;
  }

  @OnMessage("update_settings")
  public async updateSettings(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() settings: any
  ) {
    console.log("Settings updated: ", settings);
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("settings_updated", settings);
  }

  @OnMessage("player_ready")
  public async playerReady(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log(`Player ${message.player} is ready`);
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("player_ready", message);
  }

  @OnMessage("moves_sent")
  public async updateGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() update: any
  ) {
    console.log("moves_sent");
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("moves_received", update);
  }

  @OnMessage("next_round")
  public async nextRound(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() round: any
  ) {
    console.log("next_round");
    console.log(round);
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("opponent_ready", round);
  }

  @OnMessage("game_win")
  public async gameWin(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("game win");
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_win", message);
  }
}
