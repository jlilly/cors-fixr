# cors-fixr
A proxy that changes the CORS headers on an HTTP/S stream to be permissive. This is particularily handy when developing front ends.

## How to use
`node . -p <port> --api <backend-api-host>`

Handy help built-in: `node . -h`

## TODO:
- [x] HTTP proxy
- [?] HTTPS proxy (untested)
- [x] Insert correct CORS headers and values
- [ ] Tests?!
- [ ] Containerize

Parameterize:
- [x] API value
- [x] Port value
- [ ] Allowed HTTP methods
- [ ] Dis/allow credentials (eg cookies)

Environment variables for:
- [ ] API value
- [ ] Port value
- [ ] Allowed HTTP methods
- [ ] Dis/allow credentials (eg cookies)

Config file for:
- [ ] API value
- [ ] Port value
- [ ] Allowed HTTP methods
- [ ] Dis/allow credentials (eg cookies)

Publishing:
- [x] GitHub
- [ ] npm
- [ ] DockerHub


(c) 2019 Joe Lilly, Easy as Pie Ltd

