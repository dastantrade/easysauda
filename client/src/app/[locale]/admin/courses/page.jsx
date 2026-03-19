'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';

const emptyForm = {
  slug: '', titleRu: '', titleKz: '', descriptionRu: '', descriptionKz: '',
  shortDescriptionRu: '', shortDescriptionKz: '', price: '', originalPrice: '',
  level: 'BEGINNER', isPublished: false,
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCourses = () => {
    api.get('/admin/courses')
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      };

      if (editId) {
        await api.put(`/admin/courses/${editId}`, payload);
      } else {
        await api.post('/admin/courses', payload);
      }

      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      fetchCourses();
    } catch {
      // error handling
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setForm({
      slug: course.slug,
      titleRu: course.titleRu,
      titleKz: course.titleKz,
      descriptionRu: course.descriptionRu,
      descriptionKz: course.descriptionKz,
      shortDescriptionRu: course.shortDescriptionRu || '',
      shortDescriptionKz: course.shortDescriptionKz || '',
      price: String(course.price),
      originalPrice: course.originalPrice ? String(course.originalPrice) : '',
      level: course.level,
      isPublished: course.isPublished,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить курс?')) return;
    try {
      await api.delete(`/admin/courses/${id}`);
      fetchCourses();
    } catch {
      // error
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">Управление курсами</h2>
        <Button
          size="sm"
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm(emptyForm);
          }}
        >
          {showForm ? 'Отмена' : '+ Добавить курс'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Slug (URL)" value={form.slug} onChange={e => handleChange('slug', e.target.value)} required />
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Уровень</label>
                <select
                  value={form.level}
                  onChange={e => handleChange('level', e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green/50"
                >
                  <option value="BEGINNER">Начинающий</option>
                  <option value="INTERMEDIATE">Средний</option>
                  <option value="ADVANCED">Продвинутый</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Название (RU)" value={form.titleRu} onChange={e => handleChange('titleRu', e.target.value)} required />
              <Input label="Название (KZ)" value={form.titleKz} onChange={e => handleChange('titleKz', e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Описание (RU)</label>
                <textarea
                  value={form.descriptionRu}
                  onChange={e => handleChange('descriptionRu', e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green/50 h-24 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Описание (KZ)</label>
                <textarea
                  value={form.descriptionKz}
                  onChange={e => handleChange('descriptionKz', e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green/50 h-24 resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Краткое описание (RU)" value={form.shortDescriptionRu} onChange={e => handleChange('shortDescriptionRu', e.target.value)} />
              <Input label="Краткое описание (KZ)" value={form.shortDescriptionKz} onChange={e => handleChange('shortDescriptionKz', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Цена (₸)" type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} required />
              <Input label="Старая цена (₸)" type="number" value={form.originalPrice} onChange={e => handleChange('originalPrice', e.target.value)} />
              <div className="flex items-end gap-3 pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={e => handleChange('isPublished', e.target.checked)}
                    className="w-4 h-4 accent-accent-green"
                  />
                  <span className="text-sm text-text-secondary">Опубликован</span>
                </label>
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? '...' : editId ? 'Сохранить' : 'Создать'}
            </Button>
          </form>
        </Card>
      )}

      {/* Courses List */}
      <div className="space-y-3">
        {courses.map(course => (
          <Card key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-text-primary">{course.titleRu}</h3>
                <Badge variant={course.isPublished ? 'green' : 'gray'}>
                  {course.isPublished ? 'Опубликован' : 'Черновик'}
                </Badge>
              </div>
              <div className="text-sm text-text-secondary">
                {formatPrice(course.price)} · {course._count?.lessons || 0} уроков · {course._count?.enrollments || 0} студентов
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => handleEdit(course)}>
                Редактировать
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>
                Удалить
              </Button>
            </div>
          </Card>
        ))}

        {courses.length === 0 && (
          <Card className="text-center py-8">
            <p className="text-text-secondary">Курсов пока нет</p>
          </Card>
        )}
      </div>
    </div>
  );
}
