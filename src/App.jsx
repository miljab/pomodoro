import styles from "./styles/App.module.css";
import Icon from "@mdi/react";
import { mdiCogOutline } from "@mdi/js";
import { useState } from "react";
import Timer from "./components/Timer";
import Settings from "./components/Settings";

function App() {
  const [settings, setSettings] = useState({
    pomodoro: localStorage.getItem("pomodoro") || 25,
    shortBreak: localStorage.getItem("shortBreak") || 5,
    longBreak: localStorage.getItem("longBreak") || 15,
  });
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Pomodoro{" "}
          <button
            className={styles.settings}
            onClick={() => setOpenSettings(true)}
          >
            <Icon className={styles.icon} path={mdiCogOutline} size={1.8} />
          </button>
        </h1>
        <Timer settings={settings} />
      </div>
      {openSettings && (
        <Settings
          settings={settings}
          setSettings={setSettings}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      )}
    </>
  );
}

export default App;
