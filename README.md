This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Planning Poker

Collaborative Planning Poker tool for agile teams used internally at [Carbonaut](https://carbonaut.io) on our task estimations!

![image](https://user-images.githubusercontent.com/66211955/179299318-f71a85f2-5191-4cfe-b8b1-b4bb5e071024.png)

You can join a room with other team members and estimate tasks using the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number). The creator of the room is the one who decides when to begin an estimation or close a room.

An estimation is chosen if:

- Everyone votes on the same number;
- Everyone votes on only two numbers and is subsequent to each other. In this case, the highest number wins. For example, only the 5 and 8 estimations got votes on. Estimation 8 wins.

![image](https://user-images.githubusercontent.com/66211955/179301008-7b28abb1-6638-4da5-b4fe-8f92991ef501.png)

## Access the Project

You can try the project [here](https://poker.carbonaut.io).

## Run locally

First, run the development server:

```bash
npm install

npm run dev
# or
yarn install

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to test it?

- When entering on home screen, select `create room` and then click on the copy icon and open the url copied on another tab;
- You now have a live room with two users logged in. You can start the estimation on the tab you used to open the room, and the estimation options will show up;
- You can vote on any number on the list while the timer is still running;
- When the timer runs out, the session is closed and the result is shown to everyone, those who were late wait for another session to begin!
- The host can set another voting round and close the room at any moment;

## CarboLab

This project was created in our CarboLab, an initiative we use to experiment with tools and stacks that we are not familiar with.

In this CarboLab, we chose [Next.js](https://nextjs.org/) because of its popularity and to experiment with React, as we use Angular as our main frontend framework. Next.js also provides a good setup and rendering experience, that we were curious to work with.

The backend was built by front-end developers and uses `node.js` and `express` to create the peer-to-peer connection between participants, which are connected through `socket.io rooms`. The room code is generated on the front end, and anyone with the same code can join the same room.

## Wanna work with us?

We are Carbonaut, a brazillian P&D studio in Curitiba/PR. We have a small, dedicated team that seeks quality in any aspect, in our code and our lifes :smile:
We are always searching for new faces to join us to keep this growth journey with us! Visit our [page](https://carbonaut.io/contact) to check the openings
