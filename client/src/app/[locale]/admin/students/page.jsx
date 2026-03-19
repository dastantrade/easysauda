'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import api from '@/lib/api';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/students')
      .then(res => setStudents(res.data))
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

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Студенты</h2>

      {/* Table */}
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Имя</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Email</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Курсов</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                <td className="py-3 px-4 text-text-primary">{student.name}</td>
                <td className="py-3 px-4 text-text-secondary">{student.email}</td>
                <td className="py-3 px-4 text-text-primary">{student._count?.enrollments || 0}</td>
                <td className="py-3 px-4 text-text-muted">
                  {new Date(student.createdAt).toLocaleDateString('ru-RU')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <div className="text-center py-8 text-text-secondary">Студентов пока нет</div>
        )}
      </Card>
    </div>
  );
}
