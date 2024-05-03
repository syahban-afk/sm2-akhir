const jwt = require('jsonwebtoken')
const secretkey = 'ayambuluneireng365'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEyMzQsIlVzZXJOYW1lIjoiS2F6ZW8iLCJLZWxhcyI6IlhJIiwiaWF0IjoxNzE0NjMzMzkzfQ.wrdtkZMeOsz0LJGrmYfTLJz9PQlJ0ME_dT3PcA5W1EA'
jwt.verify(token, secretkey, (err, decode) => {
    if (err)
        console.log(err);
    else
        console.log('Token is valid');
        delete decode.iat;
        console.log(decode)
}) 