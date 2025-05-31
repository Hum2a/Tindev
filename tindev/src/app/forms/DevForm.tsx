import React, { useState, ChangeEvent } from 'react';
import styles from './DevForm.module.css';
import { useAuth } from '@/lib/hooks/useAuth';

const TIMEZONES = [
  'UTC', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow', 'Europe/Istanbul',
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Toronto',
  'America/Vancouver', 'America/Sao_Paulo', 'America/Buenos_Aires', 'America/Mexico_City',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Singapore', 'Asia/Hong_Kong',
  'Asia/Bangkok', 'Asia/Seoul', 'Asia/Jakarta', 'Asia/Manila', 'Asia/Kuala_Lumpur',
  'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth',
  'Africa/Johannesburg', 'Africa/Cairo', 'Africa/Lagos', 'Africa/Nairobi',
  'Pacific/Auckland', 'Pacific/Honolulu', 'Pacific/Fiji', 'Pacific/Guam',
  'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam', 'Europe/Zurich', 'Europe/Stockholm',
  'America/Phoenix', 'America/Anchorage', 'America/Halifax', 'America/Winnipeg',
  'America/Caracas', 'America/Lima', 'America/Bogota', 'America/Santiago',
  'Asia/Dhaka', 'Asia/Karachi', 'Asia/Taipei', 'Asia/Riyadh', 'Asia/Tehran',
  'Asia/Jerusalem', 'Asia/Kathmandu', 'Asia/Yangon', 'Asia/Colombo', 'Asia/Tashkent',
  'Asia/Almaty', 'Asia/Baku', 'Asia/Yekaterinburg', 'Asia/Vladivostok',
  'Australia/Adelaide', 'Australia/Darwin', 'Australia/Hobart',
  'Pacific/Port_Moresby', 'Pacific/Tongatapu', 'Pacific/Samoa',
  'Etc/GMT+12', 'Etc/GMT+11', 'Etc/GMT+10', 'Etc/GMT+9', 'Etc/GMT+8', 'Etc/GMT+7',
  'Etc/GMT+6', 'Etc/GMT+5', 'Etc/GMT+4', 'Etc/GMT+3', 'Etc/GMT+2', 'Etc/GMT+1',
  'Etc/GMT-1', 'Etc/GMT-2', 'Etc/GMT-3', 'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6',
  'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9', 'Etc/GMT-10', 'Etc/GMT-11', 'Etc/GMT-12',
];

const COUNTRY_CODES = [
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+91', country: 'India' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+34', country: 'Spain' },
  { code: '+39', country: 'Italy' },
  { code: '+86', country: 'China' },
  { code: '+7', country: 'Russia' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+234', country: 'Nigeria' },
  { code: '+20', country: 'Egypt' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+60', country: 'Malaysia' },
  { code: '+65', country: 'Singapore' },
  { code: '+64', country: 'New Zealand' },
  { code: '+353', country: 'Ireland' },
  { code: '+358', country: 'Finland' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+351', country: 'Portugal' },
  { code: '+90', country: 'Turkey' },
  { code: '+52', country: 'Mexico' },
  { code: '+1-876', country: 'Jamaica' },
  // ...add more as needed
];

const DevForm: React.FC = () => {
  const { profile } = useAuth();

  // Collapsible section state
  const [showBasic, setShowBasic] = useState(true);

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
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [useProfilePhoto, setUseProfilePhoto] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [phoneCode, setPhoneCode] = useState('+44');
  const [phone, setPhone] = useState('');

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
      setProfilePhotoFile(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
      setProfilePhoto(''); // Clear URL if uploading new file
    }
  };

  const handleUseProfilePhoto = () => {
    if (!useProfilePhoto && profile?.photoURL) {
      setProfilePhoto(profile.photoURL);
      setProfilePhotoFile(null);
      setProfilePhotoPreview('');
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
          aria-expanded={showBasic}
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