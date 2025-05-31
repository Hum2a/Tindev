import React, { useState, ChangeEvent } from 'react';
import styles from './DevForm.module.css';
import { useAuth } from '@/lib/hooks/useAuth';
import { TIMEZONES } from './constants/timezones';
import { COUNTRY_CODES } from './constants/countryCodes';
import { CURRENCIES } from './constants/currencies';
import { SALARY_PERIODS } from './constants/salaryPeriods';
import { EMPLOYMENT_TYPES } from './constants/employmentTypes';
import { AVAILABILITIES } from './constants/availabilities';

const DevForm: React.FC = () => {
  const { profile } = useAuth();

  // Collapsible section state
  const [showBasic, setShowBasic] = useState(true);
  const [showProfessional, setShowProfessional] = useState(false);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [firstName, setFirstName] = useState('');
  const [middleNames, setMiddleNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [useProfileDisplayName, setUseProfileDisplayName] = useState(false);
  const [email, setEmail] = useState('');
  const [useProfileEmail, setUseProfileEmail] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [useProfilePhoto, setUseProfilePhoto] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [phoneCode, setPhoneCode] = useState('+44');
  const [phone, setPhone] = useState('');

  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentEmployer, setCurrentEmployer] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [availability, setAvailability] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('USD');
  const [salaryPeriod, setSalaryPeriod] = useState('Annually');
  const [salaryAmount, setSalaryAmount] = useState('');

  const basicExpanded = showBasic ? 'true' : 'false';
  const professionalExpanded = showProfessional ? 'true' : 'false';

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSkill(e);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleUseProfileDisplayName = () => {
    if (!useProfileDisplayName && profile?.displayName) {
      setDisplayName(profile.displayName);
    }
    setUseProfileDisplayName(!useProfileDisplayName);
  };

  const handleUseProfileEmail = () => {
    if (!useProfileEmail && profile?.email) {
      setEmail(profile.email);
    }
    setUseProfileEmail(!useProfileEmail);
  };

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUseProfilePhoto = () => {
    if (!useProfilePhoto && profile?.photoURL) {
      setProfilePhoto(profile.photoURL);
    }
    setUseProfilePhoto(!useProfilePhoto);
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Developer Profile</h2>
      <form>
        {/* Collapsible Basic Information Section */}
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setShowBasic((prev) => !prev)}
          aria-expanded={basicExpanded}
        >
          <span>Basic Information</span>
          <span className={styles.sectionChevron + (showBasic ? ' ' + styles.sectionChevronOpen : '')}>
            ▼
          </span>
        </button>
        <div
          className={styles.sectionContent}
          style={{ maxHeight: showBasic ? 2000 : 0, opacity: showBasic ? 1 : 0, pointerEvents: showBasic ? 'auto' : 'none' }}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <div className={styles.nameRow}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Middle Names"
                value={middleNames}
                onChange={e => setMiddleNames(e.target.value)}
                autoComplete="additional-name"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Display Name / Username
              {profile?.displayName && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfileDisplayName}
                >
                  {useProfileDisplayName ? 'Undo' : 'Use my account display name'}
                </button>
              )}
            </label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Display name or username"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Email
              {profile?.email && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfileEmail}
                >
                  {useProfileEmail ? 'Undo' : 'Use my account email'}
                </button>
              )}
            </label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Profile Photo
              {profile?.photoURL && (
                <button
                  type="button"
                  className={styles.useProfileButton}
                  onClick={handleUseProfilePhoto}
                >
                  {useProfilePhoto ? 'Undo' : 'Use my account photo'}
                </button>
              )}
            </label>
            <div className={styles.photoUploadRow}>
              <input
                type="file"
                accept="image/*"
                id="profilePhotoUpload"
                style={{ display: 'none' }}
                onChange={handleProfilePhotoChange}
              />
              <label htmlFor="profilePhotoUpload" className={styles.uploadButton}>
                Upload Photo
              </label>
              {(profilePhotoPreview || profilePhoto) && (
                <img
                  src={profilePhotoPreview || profilePhoto}
                  alt="Profile preview"
                  className={styles.profilePreview}
                />
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location</label>
            <div className={styles.locationRow}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                autoComplete="address-level2"
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                autoComplete="country"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              className={styles.formInput}
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              <option value="">Select your timezone</option>
              {TIMEZONES.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <div className={styles.phoneRow}>
              <select
                className={styles.phoneCodeSelect}
                value={phoneCode}
                onChange={e => setPhoneCode(e.target.value)}
                aria-label="Country code"
              >
                {COUNTRY_CODES.map(opt => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code} ({opt.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={styles.formInput}
                placeholder="e.g. 1234 567890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
          </div>
        </div>
        {/* Collapsible Professional Details Section */}
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setShowProfessional((prev) => !prev)}
          aria-expanded={professionalExpanded}
        >
          <span>Professional Details</span>
          <span className={styles.sectionChevron + (showProfessional ? ' ' + styles.sectionChevronOpen : '')}>
            ▼
          </span>
        </button>
        <div
          className={styles.sectionContent}
          style={{ maxHeight: showProfessional ? 2000 : 0, opacity: showProfessional ? 1 : 0, pointerEvents: showProfessional ? 'auto' : 'none' }}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Job Title</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Senior Software Engineer"
              value={currentJobTitle}
              onChange={e => setCurrentJobTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Employer / Company</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Google, Freelance, etc."
              value={currentEmployer}
              onChange={e => setCurrentEmployer(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Years of Experience</label>
            <input
              type="number"
              min="0"
              className={styles.formInput}
              placeholder="e.g. 5"
              value={yearsExperience}
              onChange={e => setYearsExperience(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Employment Type</label>
            <select
              className={styles.formInput}
              value={employmentType}
              onChange={e => setEmploymentType(e.target.value)}
              title="Employment Type"
            >
              <option value="">Select type</option>
              {EMPLOYMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Availability</label>
            <select
              className={styles.formInput}
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              title="Availability"
            >
              <option value="">Select availability</option>
              {AVAILABILITIES.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Expected Salary / Hourly Rate</label>
            <div className={styles.salaryRow}>
              <select
                className={styles.salaryCurrencySelect}
                value={salaryCurrency}
                onChange={e => setSalaryCurrency(e.target.value)}
                title="Currency"
              >
                {CURRENCIES.map(opt => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code} ({opt.symbol})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                className={styles.formInput}
                placeholder="Amount"
                value={salaryAmount}
                onChange={e => setSalaryAmount(e.target.value)}
                style={{ maxWidth: 120 }}
              />
              <select
                className={styles.salaryPeriodSelect}
                value={salaryPeriod}
                onChange={e => setSalaryPeriod(e.target.value)}
                title="Period"
              >
                {SALARY_PERIODS.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="skills" className={styles.formLabel}>Skills</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g. React, Node.js, TypeScript"
              className={styles.formInput}
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillKeyDown}
              autoComplete="off"
            />
            <button
              type="button"
              className={styles.addSkillButton}
              onClick={handleAddSkill}
              disabled={!skillInput.trim()}
            >
              Add
            </button>
          </div>
          {skills.length > 0 && (
            <div className={styles.skillsBubbleContainer}>
              {skills.map(skill => (
                <span
                  key={skill}
                  className={styles.skillBubble}
                  onClick={() => handleRemoveSkill(skill)}
                  tabIndex={0}
                  title="Remove skill"
                >
                  {skill} <span className={styles.removeSkill}>&times;</span>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="experience" className={styles.formLabel}>Years of Experience</label>
          <input id="experience" name="experience" type="number" min="0" placeholder="e.g. 3" className={styles.formInput} />
        </div>

        <button type="submit" className={styles.formButton}>Save</button>
      </form>
    </div>
  );
};

export default DevForm; 