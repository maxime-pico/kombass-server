"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
let GameController = class GameController {
    getSocketGameRoom(socket) {
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);
        //add making sure we're actually connected to a socket
        const gameRoom = socketRooms && socketRooms[0];
        return gameRoom;
    }
    updateSettings(io, socket, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Settings updated: ", settings);
            const gameRoom = this.getSocketGameRoom(socket);
            socket.to(gameRoom).emit("settings_updated", settings);
        });
    }
    playerReady(io, socket, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Player ${message.player} is ready`);
            const gameRoom = this.getSocketGameRoom(socket);
            socket.to(gameRoom).emit("player_ready", message);
        });
    }
    updateGame(io, socket, opponentsUnits) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("moves_sent");
            console.log(opponentsUnits);
            const gameRoom = this.getSocketGameRoom(socket);
            socket.to(gameRoom).emit("moves_received", opponentsUnits);
        });
    }
    nextRound(io, socket, round) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("next_round");
            console.log(round);
            const gameRoom = this.getSocketGameRoom(socket);
            socket.to(gameRoom).emit("opponent_ready", round);
        });
    }
    gameWin(io, socket, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("game win");
            const gameRoom = this.getSocketGameRoom(socket);
            socket.to(gameRoom).emit("on_game_win", message);
        });
    }
};
__decorate([
    (0, socket_controllers_1.OnMessage)("update_settings"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateSettings", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("player_ready"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "playerReady", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("moves_sent"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("next_round"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "nextRound", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("game_win"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "gameWin", null);
GameController = __decorate([
    (0, socket_controllers_1.SocketController)()
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=gameController.js.map