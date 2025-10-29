import { ReactNode } from 'react';


interface PreviewWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function PreviewWrapper({
  children,
  title,
  description,
}: PreviewWrapperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div className="w-full flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        {children}
      </div>
    </div>
  );
}
