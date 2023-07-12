const setup = require('../config');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

module.exports.respond = function (io, socket) {

    socket.on('registAdmin', data => {
        if (data.token) {
            jwt.verify(data.token, setup.JWT_SECURITY_KEY, (e, jwtdata) => {
                if (!jwtdata || jwtdata.level < setup.SUPPORT_LEVEL) return;
                socket.isAdmin = true;
                socket.join('ADMIN_GROUP');
            });
        }
    })

    socket.on('registClient', data => {
        if (!data.client) return;
        socket.join(data.client);
    })

    socket.on('clientSend', async data => {
        if (!data.sender.client) return;
        if (data.sender.token) {
            jwt.verify(data.sender.token, setup.JWT_SECURITY_KEY, (e, jwtdata) => {
                if (!jwtdata) return;
                data.sender.client = jwtdata.id;
                data.sender.fullname = jwtdata.fullname;
                data.sender.email = jwtdata.email;
            });
        }
        socket.join(data.sender.client);

        const msg = { sender: 'request', content: data.message, time: Date.now() }
        const room = await Message.findOne({ client: data.sender.client }).exec();
        if (!room) {
            const newRoom = {
                userId: data.sender.email ? data.sender.client : undefined,
                client: data.sender.client,
                last: Date.now(),
                messages: [msg]
            }
            const createRoom = new Message(newRoom);
            await createRoom.save();
        } else {
            room.last = Date.now();
            room.messages = [...room.messages, msg];
            await room.save();
        }

        io.to('ADMIN_GROUP').emit('sendToAdmin', {
            sender: {
                client: data.sender.client,
                fullname: data.sender.fullname ?? undefined
            },
            message: msg
        });
    });

    socket.on('adminSend', async data => {
        if (!socket.isAdmin) return;
        const msg = {
            sender: 'admin',
            content: data.message,
            time: Date.now()
        }
        const room = await Message.findOne({ client: data.sendTo }).exec();
        room.last = Date.now();
        room.messages = [...room.messages, msg];
        await room.save();
        io.to(data.sendTo).emit('sendToClient', msg);
    })

}


