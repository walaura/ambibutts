# philips-alexa

oh FUCK you are here.

this is a fun little app that makes anything you think is overengineered look simple. it fitsd as part of a larger project (pictured here in purple) for me to control my tv using an alexa skill:

![image](https://user-images.githubusercontent.com/11539094/69907811-4df33380-13d4-11ea-85b5-16f9d3f42d2b.png)

## alexa

So there's an alexa and a skill, that part is easy, they live on AWS and basically listen for hot words and when the right one arises they contact the express app on glitch. the alexa app is very by the numbers and ideally can be moved here in a monorepo-like fashion

## fish (express app on glitch)

This app needs a stable web address for the aws lambda to ping it so that's why it's hosted elsewhere. alexa will ping it to make it send a web push notification that the clients in this repo will pick up. this is because web pushes are the most stable api i found to receive pushes from within a nat :( websockets r hard

## raspi-client

This is running on a 24/7 raspberry pi on my living room. there's two parts to this: a website that lets you post commands to `fish` and a websocket that needs to be installed that runs in the background and sends the notifications it gets to the tv api (`TV_REMOTE_URL`, in my case `https://192.168.0.21:1925`)
