'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';

const statusBadge = {
  PENDING: { label: 'Ожидание', variant: 'gray' },
  COMPLETED: { label: 'Оплачено', variant: 'green' },
  REFUNDED: { label: 'Возврат', variant: 'red' },
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/payments')
      .then(res => setPayments(res.data))
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
      <h2 className="text-xl font-bold text-text-primary mb-6">Оплаты</h2>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Студент</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Курс</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Сумма</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Метод</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Статус</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Дата</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => {
              const status = statusBadge[payment.paymentStatus] || statusBadge.PENDING;
              return (
                <tr key={payment.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                  <td className="py-3 px-4">
                    <div className="text-text-primary">{payment.user?.name}</div>
                    <div className="text-text-muted text-xs">{payment.user?.email}</div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{payment.course?.titleRu}</td>
                  <td className="py-3 px-4 text-text-primary font-medium">{formatPrice(payment.amountPaid)}</td>
                  <td className="py-3 px-4 text-text-secondary">{payment.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="py-3 px-4 text-text-muted">
                    {new Date(payment.enrolledAt).toLocaleDateString('ru-RU')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="text-center py-8 text-text-secondary">Оплат пока нет</div>
        )}
      </Card>
    </div>
  );
}
