import React from 'react';
import styles from './DevForm.module.css';

interface ClientFormProps {
  onSubmit: (data: { companyName: string; projectDescription: string }) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      companyName: formData.get('companyName') as string,
      projectDescription: formData.get('projectDescription') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <h2 className={styles.formTitle}>Client Profile</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="companyName" className={styles.formLabel}>
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="projectDescription" className={styles.formLabel}>
          Project Description
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          className={styles.formTextarea}
          rows={4}
          required
        />
      </div>

      <button type="submit" className={styles.formButton}>
        Submit
      </button>
    </form>
  );
};

export default ClientForm; 