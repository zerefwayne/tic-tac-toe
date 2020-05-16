class User {

    constructor(socket) {
        this.id = socket.id;
        this.socket =  socket;
        this.isPlaying = false;
    }

    getDetails() {
        return {
            id: this.id,
            isPlaying: this.isPlaying
        }
    }

}


module.exports = User;