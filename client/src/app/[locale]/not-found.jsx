import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Страница не найдена</h1>
        <p className="text-text-secondary mb-8">
          Возможно, эта страница была удалена или вы перешли по неверной ссылке.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-green-hover text-dark font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          На главную
        </Link>
      </div>
    </div>
  );
}
