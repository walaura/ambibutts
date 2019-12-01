# ambibutts

oh FUCK you are here.

this is a fun little app that makes anything you think is overengineered look simple. it fitsd as part of a larger project (pictured here in purple) for me to control my tv using an alexa skill:

![image](https://user-images.githubusercontent.com/11539094/69908094-72eaa500-13da-11ea-8cd9-3dc7c8815371.png)

## architecture overview

### alexa (to be folded into this repo)

So there's an alexa and a skill, that part is easy, it lives on AWS and basically listens for hot words and when the right one pops it pings `fish` (the express app on glitch). the alexa app is very by the numbers but ideally can be moved here in a monorepo-like fashion

### config bucket

There's a single `.config.json` with all environment variables – you can check its shape in `config.ts` and you can either generate it yourself or (this is v cool) set a `CONFIG_URL` in your `.env` to download it and keep it fresh

### fish (express app on glitch)

This app needs a stable web address for the aws lambda to ping it so that's why it's hosted elsewhere. alexa will ping it to make it send a web push notification that the clients in this repo will pick up. this is because web pushes are the most stable api i found to receive pushes from within a nat :( websockets r hard

### raspi-client

This is running on a 24/7 raspberry pi on my living room. it's local so it reaches the tv. there's two parts to this: a website that lets you post commands to `fish` and a websocket that needs to be installed that runs in the background and sends the notifications it gets to the tv api (`endpoints.tv`, in my case `https://192.168.0.21:1925`)

![image](https://user-images.githubusercontent.com/11539094/69912989-8709c300-1429-11ea-9298-155e6a095666.png)

###

# faqs

## why didnt you do [solution thats clearly easier]

i finished this at 1AM and my brain is not braining and in the course of this ive come up with even more approaches, the main issue is mapping my private internet to the outside world reliably and also using apis where i know some of the stuff going on and i can learn something new (so web push == good, trying to create my own ngrok == bad)
