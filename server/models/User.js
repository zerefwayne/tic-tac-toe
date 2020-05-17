class User {
  constructor(socket, name) {
    this.id = socket.id;
    this.socket = socket;
    this.name = name;
    this.isPlaying = false;
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      isPlaying: this.isPlaying,
    };
  }
}

module.exports = User;
