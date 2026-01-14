import { FC, ReactElement, useState } from 'react'
import '../styles/screens.css'

interface SettingsForm {
  email: string
  fullName: string
  emailNotifications: boolean
  newsletter: boolean
  address: string
  city: string
}

const Settings: FC = (): ReactElement => {
  const [settings, setSettings] = useState<SettingsForm>({
    email: '',
    fullName: '',
    emailNotifications: false,
    newsletter: false,
    address: '',
    city: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = (): void => {
    console.log('Settings saved:', settings)
  }

  return (
    <div className="screen settings-screen">
      <div className="screen-content">
        <h1>Settings</h1>
        <div className="settings-container">
          <div className="settings-section">
            <h2>Account Settings</h2>
            <div className="setting-item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={settings.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Your Name"
                value={settings.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Preferences</h2>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                />
                Email Notifications
              </label>
            </div>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={settings.newsletter}
                  onChange={handleInputChange}
                />
                Newsletter Subscription
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Shipping Address</h2>
            <div className="setting-item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Street Address"
                value={settings.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="City"
                value={settings.city}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button className="btn btn-success" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
