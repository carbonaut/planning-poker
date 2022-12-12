import { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Button from "../../components/Button/button";
import Estimation from "../../components/Estimation/estimation";
import styles from "../../styles/Room.module.scss";
import { useAppContext } from "../../utils/ToastContext";
import { getRoomMemberLink } from "../../utils/utils";

interface Vote {
  label: string;
  count: number;
  voted: boolean;
  order: number;
}

let socket: Socket;
const Room: NextPage = () => {
  let loaded = false;
  const duration = 8;
  const { query, isReady } = useRouter();
  const { setMessage } = useAppContext();

  const { id, host } = query;

  const [noDevs, setNoDevs] = useState(0);
  const [scrumMaster, setScrumMaster] = useState(false);
  const [copied, setCopy] = useState(false);

  // true room has started the voting session
  const [started, setStarted] = useState(false);

  // true when the user is voting,
  // false does not mean that the round has ended
  const [running, setRunning] = useState(false);

  // true when the round has ended
  const [ended, setEnded] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(8);

  const [votes, setVotes] = useState<{ [key: number]: Vote }>({
    1: { label: "1", count: 0, voted: false, order: 1 },
    2: { label: "2", count: 0, voted: false, order: 2 },
    3: { label: "3", count: 0, voted: false, order: 3 },
    5: { label: "5", count: 0, voted: false, order: 4 },
    8: { label: "8", count: 0, voted: false, order: 5 },
    13: { label: "13", count: 0, voted: false, order: 6 },
    21: { label: "21", count: 0, voted: false, order: 7 },
  });

  let timer: any;

  useEffect(() => {
    if (!isReady || loaded) {
      return;
    }

    loaded = true;

    setScrumMaster(host ? true : false);

    socketInitializer();
  }, [isReady]);

  const socketInitializer = () => {
    socket = io("https://planning-poker-server-3lup.onrender.com");

    socket.on("connect", () => {
      socket.emit("join", [id, host || scrumMaster]);
    });

    socket.on("countUpdate", (data: any) => {
      setNoDevs(data.count);
    });

    socket.on("clientError", (error: { message: string }) => {
      setMessage(error.message);
    });

    socket.on("started", () => {
      clearInterval(timer);
      setStarted(true);
      setSecondsLeft(duration);
      timer = setInterval(() => {
        tick();
      }, 1000);

      setRunning(true);
      setEnded(false);
    });

    socket.on("finished", (data: any) => {
      clearInterval(timer);
      setRunning(false);
      setResults(data.votes);
      setEnded(true);
    });

    socket.on("hostAttempt", (data: boolean) => {
      setScrumMaster(data);
    });

    socket.on("voteUpdate", (data: any) => {
      setResults(data.votes);
    });

    socket.on("roomHasClosed", () => {
      Router.push("/");
    });
  };

  const startEstimation = () => {
    socket.emit("start");
  };

  const emitVote = (value: number) => {
    socket.emit("vote", value);
    setRunning(false);
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev === 0) {
        if (scrumMaster) {
          endRound();
        }

        setRunning(false);
        setEnded(true);
        clearInterval(timer);
      }
      return prev > 0 ? prev - 1 : 0;
    });
  };

  const endRound = () => {
    socket.emit("finish");
  };

  const setResults = (results: { [key: number]: number }) => {
    if (!results) {
      return;
    }

    Object.keys(results).forEach((vote) => {
      const index = parseInt(vote);
      const voteCpy = votes[index];
      voteCpy.count = results[index];
      const updatedVotes = { ...votes, ...voteCpy };
      setVotes(updatedVotes);
    });
  };

  function closeRoom() {
    socket.emit("closeRoom", id);
  }

  function leaveRoom() {
    socket.disconnect();
    Router.push("/");
  }

  async function copyID() {
    let link = getRoomMemberLink();

    // catch for chrome
    await navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch(() => {
        // error toast
      });
  }

  return (
    <>
      <Head>
        <title>Voting Room - Planning Poker</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.icon}>
          <i className="bi bi-people-fill"></i>
          {noDevs}
        </div>
        <div className={styles.content}>
          <Estimation
            isScrumMaster={scrumMaster}
            roomId={id}
            onStart={startEstimation}
            onVote={emitVote}
            votes={votes}
            waiting={!started}
            running={running}
            secondsLeft={secondsLeft}
            duration={duration}
            ended={ended}
            noDevs={noDevs}
          ></Estimation>
        </div>

        <footer>
          <div className={styles.footer}>
            {scrumMaster && (
              <>
                {started && !running ? (
                  <Button type="secondary" onClick={startEstimation}>
                    Estimar Novamente
                  </Button>
                ) : (
                  <p className={styles.action} onClick={copyID}>
                    ID da sala: {id}{" "}
                    {!copied && (
                      <i className={`bi bi-front ${styles.copyIcon}`}></i>
                    )}
                    {copied && (
                      <i
                        className={`bi bi-check-circle-fill ${styles.copyIcon}`}
                      ></i>
                    )}
                  </p>
                )}
              </>
            )}
            <div className={styles.leave}>
              <Button
                type="secondary"
                onClick={scrumMaster ? closeRoom : leaveRoom}
                color="red"
                large={false}
              >
                {scrumMaster ? "Encerrar Sala" : "Sair"}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Room;
