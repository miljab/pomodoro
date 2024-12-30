import styles from "../styles/Timer.module.css";
import { useEffect, useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiPlay, mdiPause, mdiSquare, mdiReplay } from "@mdi/js";
import clickSound from "../assets/click.mp3";
import notificationSound from "../assets/notification.mp3";
import useSound from "use-sound";

function Timer({ settings }) {
  const [time, setTime] = useState({
    minutes: settings.pomodoro,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [cycle, setCycle] = useState("pomodoro");

  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(time.minutes * 60 + time.seconds);

  const [playClick] = useSound(clickSound, { volume: 0.3 });
  const [playNotification] = useSound(notificationSound, { volume: 0.5 });

  const tick = () => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
    const updatedTime = remainingTimeRef.current - elapsedSeconds;

    if (updatedTime <= 0) {
      handleCycleEnd();
    } else {
      setTime({
        minutes: Math.floor(updatedTime / 60),
        seconds: updatedTime % 60,
      });
    }
  };

  const handleCycleEnd = () => {
    setIsActive(false);
    let notificationMessage;
    let nextDuration;

    if (cycle === "pomodoro") {
      if (sessionNumber % 4 === 0) {
        setCycle("longBreak");
        nextDuration = settings.longBreak * 60;
        notificationMessage = "Time for a long break!";
      } else {
        setCycle("shortBreak");
        nextDuration = settings.shortBreak * 60;
        notificationMessage = "Time for a short break!";
      }
    } else {
      setCycle("pomodoro");
      nextDuration = settings.pomodoro * 60;
      setSessionNumber(sessionNumber + 1);
      notificationMessage = "Time for a pomodoro session!";
    }

    setTime({
      minutes: Math.floor(nextDuration / 60),
      seconds: nextDuration % 60,
    });
    remainingTimeRef.current = nextDuration;

    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        const notification = new Notification("Pomodoro", {
          body: notificationMessage,
        });

        notification.onclick = () => {
          window.focus(); // Focus the tab if already open
        };
      }
    });

    playNotification();

    startTimeRef.current = Date.now();
  };

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      startTimeRef.current = Date.now();
      remainingTimeRef.current = time.minutes * 60 + time.seconds;
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    const duration = settings[cycle] * 60;
    setTime({
      minutes: Math.floor(duration / 60),
      seconds: duration % 60,
    });
    remainingTimeRef.current = duration;
  };

  const resetPomodoro = () => {
    setIsActive(false);
    setCycle("pomodoro");
    setSessionNumber(1);
    setTime({
      minutes: settings.pomodoro,
      seconds: 0,
    });
    remainingTimeRef.current = settings.pomodoro * 60;
  };

  useEffect(() => {
    document.title = `${time.minutes.toString().padStart(2, "0")}:${time.seconds
      .toString()
      .padStart(2, "0")} | Pomodoro`;
  }, [time]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        tick();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useEffect(() => {
    resetTimer();
  }, [settings]);

  return (
    <div className={`${styles.timer} ${styles[cycle]}`}>
      <div className={styles.header}>
        <div className={`${styles.labels} ${styles[cycle]}`}>
          <span
            className={
              cycle === "pomodoro" ? styles.activeLabel : styles.inactiveLabel
            }
          >
            Pomodoro
          </span>
          <span className={styles.separator}>&middot;</span>
          <span
            className={
              cycle === "shortBreak" ? styles.activeLabel : styles.inactiveLabel
            }
          >
            Short Break
          </span>
          <span className={styles.separator}>&middot;</span>
          <span
            className={
              cycle === "longBreak" ? styles.activeLabel : styles.inactiveLabel
            }
          >
            Long Break
          </span>
        </div>
        <div className={styles.session}>
          <span>Session #{sessionNumber}</span>
        </div>
      </div>
      <div className={styles.time}>
        {time.minutes.toString().padStart(2, "0")}:
        {time.seconds.toString().padStart(2, "0")}
      </div>
      <div className={styles.controls}>
        <button
          onClick={() => {
            playClick();
            toggleTimer();
          }}
          className={`${styles.controlButton} ${styles[cycle]}`}
        >
          <Icon
            className={styles.icon}
            path={isActive ? mdiPause : mdiPlay}
            size={3}
          />
        </button>
        <button
          onClick={() => {
            playClick();
            resetTimer();
          }}
          className={`${styles.controlButton} ${styles[cycle]}`}
        >
          <Icon
            className={`${styles.icon} ${styles.square}`}
            path={mdiSquare}
            size={2}
          />
        </button>
        <button
          onClick={() => {
            playClick();
            resetPomodoro();
          }}
          className={`${styles.controlButton} ${styles[cycle]}`}
        >
          <Icon className={styles.icon} path={mdiReplay} size={2} />
        </button>
      </div>
    </div>
  );
}

export default Timer;
