'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';

export default function SettingsPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/dashboard/profile', { name, phone });
      setUser(data.user);
      setMessage(locale === 'kz' ? 'Сақталды!' : 'Сохранено!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage(locale === 'kz' ? 'Қате' : 'Ошибка');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/dashboard/password', { currentPassword, newPassword });
      setPasswordMessage(data.message);
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setPasswordMessage(''), 3000);
    } catch (err) {
      setPasswordMessage(err.response?.data?.error || 'Ошибка');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-bold text-text-primary mb-4">
          {locale === 'kz' ? 'Профиль' : 'Профиль'}
        </h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <Input label={locale === 'kz' ? 'Аты' : 'Имя'} value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" value={user?.email || ''} disabled />
          <Input label={locale === 'kz' ? 'Телефон' : 'Телефон'} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (700) 000-00-00" />

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? '...' : (locale === 'kz' ? 'Сақтау' : 'Сохранить')}
            </Button>
            {message && <span className="text-accent-green text-sm">{message}</span>}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-text-primary mb-4">
          {locale === 'kz' ? 'Құпия сөзді өзгерту' : 'Сменить пароль'}
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label={locale === 'kz' ? 'Ағымдағы құпия сөз' : 'Текущий пароль'}
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <Input
            label={locale === 'kz' ? 'Жаңа құпия сөз' : 'Новый пароль'}
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <Button type="submit" variant="secondary">
              {locale === 'kz' ? 'Өзгерту' : 'Изменить'}
            </Button>
            {passwordMessage && <span className="text-accent-green text-sm">{passwordMessage}</span>}
          </div>
        </form>
      </Card>
    </div>
  );
}
