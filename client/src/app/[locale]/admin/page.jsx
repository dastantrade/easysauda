'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  const statCards = [
    { label: 'Всего студентов', value: stats?.totalStudents || 0, color: 'text-accent-blue' },
    { label: 'Всего курсов', value: stats?.totalCourses || 0, color: 'text-accent-green' },
    { label: 'Записей на курсы', value: stats?.totalEnrollments || 0, color: 'text-yellow-400' },
    { label: 'Общая выручка', value: formatPrice(stats?.totalRevenue || 0), color: 'text-accent-green' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Обзор</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card key={i} className="text-center">
            <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-sm text-text-secondary mt-1">{card.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
