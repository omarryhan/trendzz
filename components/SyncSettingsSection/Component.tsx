/* eslint-disable import/order */
import React from 'react';
import styles from './styles.css';
import { getAllRepos, setAllRepos } from '../../actions/repo';

const Component: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [exportData, setExportData] = React.useState<any>([]);

  React.useEffect(() => {
    const fn = async () => {
      const allRepos = await getAllRepos();
      setExportData(allRepos);
    };
    fn();
  }, []);

  const exportDataString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData))}`;

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.settingsTitle}>
        Backup and restore
      </h2>
      <p className={styles.settingsDescription}>
        Backup and restore your reading history (stored in local storage)
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <a
          className={`${styles.export} ${styles.anchorNoStyle}`}
          href={exportDataString}
          download="trendzz-backup.json"
        >
          Export
        </a>

        <form>
          <label htmlFor="fileUpload" className={`${styles.export}`}>
            Import
            <input
              id="fileUpload"
              className={styles.fileInput}
              type="file"
              name="fileUpload"
              onChange={(e) => {
                const { files } = e.target;
                if (!files || files === null || files.length <= 0) {
                  return;
                }
                const fileReader = new FileReader();
                fileReader.readAsText((files as FileList)[0], 'UTF-8');
                fileReader.onload = async (evt) => {
                  const storage = JSON.parse(decodeURIComponent(evt.target?.result as string));
                  await setAllRepos(storage);
                  alert('Done!');
                };
                fileReader.onerror = (evt) => {
                  console.error(evt.target?.error);
                  alert('Oops something went wrong. Please report this problem.');
                };
              }}
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default Component;
