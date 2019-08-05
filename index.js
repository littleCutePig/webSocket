const ws = require('ws');
const webSocketServer = new ws.Server({port: 3000});
const state = []

function tellOther(data,type,ignore){
    state.forEach(item=>{
        if(item !== ignore){
            item.send(JSON.stringify({data,type}))
        }
    })
}
webSocketServer.on('connection',(socket)=>{
    console.log('链接上了')
    // socket.send('链接上了')
    tellOther('有一个人加入了','msg');
    state.push(socket)
    tellOther(state.length,'num')
    socket.on('message',data=>{
        tellOther(data,'chat',socket);
    })

    socket.on('close', ()=>{
        let index = state.findIndex(item => item === socket);
        if(index > 0){
            state.splice(index,1)
        }
        tellOther('有一个人退出了','msg');
    })
})