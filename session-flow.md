req.session!.userId = user.id
// storing data in session in Redis
{userId: 1} => send that to Redis
Redis stores data in a key: value store
1
key = sess: qweqweqw 
this will map to our object {userId: 1}
2
the express-session will set a cookie on the user browser "asdasdqweqw"
3
when user makes a request "asdasdqweqw" -> sent to the server
4
server will decripts the cookie via the secred to get the key for redis to access data
asdasdqweqw -> sess: qweqweqw 
5
make request to redis
sess: qweqweqw  => {userId: 1}

req.session = {userId: 1}