import React from 'react';
import styles from './DevForm.module.css';

const ClientForm: React.FC = () => {
  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Client Profile</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.formLabel}>Company Name</label>
          <input id="company" name="company" type="text" placeholder="e.g. Acme Corp" className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="project" className={styles.formLabel}>Project Description</label>
          <textarea id="project" name="project" placeholder="Describe your project needs..." className={styles.formTextarea} />
        </div>
        <button type="submit" className={styles.formButton}>Save</button>
      </form>
    </div>
  );
};

export default ClientForm; 