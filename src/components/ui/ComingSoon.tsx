import React from 'react';
import { Heading1, Paragraph } from '@/components/ui/typography';
import { Clock } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon',
  description = 'This feature is currently under development and will be available soon.'
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-6">
        <Clock className="h-10 w-10 text-primary-500 dark:text-gray-300" />
      </div>
      <Heading1 className="mb-4 text-gray-900 dark:text-white">{title}</Heading1>
      <Paragraph className="max-w-md text-gray-600 dark:text-gray-400">
        {description}
      </Paragraph>
      <div className="mt-8 p-4 bg-gray-100 dark:bg-dark-surface rounded-lg">
        <Paragraph className="text-sm text-gray-500 dark:text-gray-400">
          We're working hard to bring you this feature. Check back soon!
        </Paragraph>
      </div>
    </div>
  );
};

export default ComingSoon; 