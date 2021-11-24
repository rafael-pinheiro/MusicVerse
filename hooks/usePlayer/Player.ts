import EventEmitter from "events";

export default interface Player extends EventEmitter {
  disconnect(): void;
  activate(): void;
}