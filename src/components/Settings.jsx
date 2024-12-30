import styles from "../styles/Settings.module.css";

function Settings({ settings, setSettings, setOpenSettings }) {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <div className={styles.header}>
          <h2>Settings</h2>
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="pomodoro">Pomodoro</label>
            <div className={styles.slider}>
              <input
                type="range"
                id="pomodoro"
                value={settings.pomodoro}
                onChange={(e) => {
                  localStorage.setItem("pomodoro", e.target.value);
                  setSettings({ ...settings, pomodoro: e.target.value });
                }}
                min="1"
                max="60"
              />
              <span className={styles.sliderValue}>{settings.pomodoro}</span>
            </div>
          </div>
          <div className={styles.input}>
            <label htmlFor="shortBreak">Short Break</label>
            <div className={styles.slider}>
              <input
                type="range"
                id="shortBreak"
                value={settings.shortBreak}
                onChange={(e) => {
                  localStorage.setItem("shortBreak", e.target.value);
                  setSettings({ ...settings, shortBreak: e.target.value });
                }}
                min="1"
                max="60"
              />
              <span className={styles.sliderValue}>{settings.shortBreak}</span>
            </div>
          </div>
          <div className={styles.input}>
            <label htmlFor="longBreak">Long Break</label>
            <div className={styles.slider}>
              <input
                type="range"
                id="longBreak"
                value={settings.longBreak}
                onChange={(e) => {
                  localStorage.setItem("longBreak", e.target.value);
                  setSettings({ ...settings, longBreak: e.target.value });
                }}
                min="1"
                max="60"
              />
              <span className={styles.sliderValue}>{settings.longBreak}</span>
            </div>
          </div>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => setOpenSettings(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Settings;
