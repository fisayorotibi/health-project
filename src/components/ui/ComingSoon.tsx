import React from 'react';
import { Heading1, Paragraph, SmallParagraph } from '@/components/ui/typography';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title?: string;
  description?: string;
  featureList?: string[];
  ctaLink?: string;
  ctaText?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon',
  description = 'This feature is currently under development and will be available soon.',
  featureList = [],
  ctaLink = '/dashboard',
  ctaText = 'Return to Dashboard'
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-6">
        <Clock className="h-10 w-10 text-primary-500 dark:text-gray-300" />
      </div>
      <Heading1 className="mb-4 text-gray-900 dark:text-white">{title}</Heading1>
      <Paragraph className="max-w-md text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </Paragraph>
      
      {featureList.length > 0 && (
        <div className="w-full max-w-md mb-8">
          <SmallParagraph className="text-left font-medium text-gray-700 dark:text-gray-300 mb-3">
            What to expect:
          </SmallParagraph>
          <ul className="space-y-2 text-left">
            {featureList.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></span>
                </div>
                <SmallParagraph className="text-gray-600 dark:text-gray-400">{feature}</SmallParagraph>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 p-5 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg border border-gray-100 dark:border-dark-border w-full max-w-md">
        <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          We're working diligently to deliver this feature with the quality and security you expect from Lavender Health Records.
        </Paragraph>
        <Link 
          href={ctaLink}
          className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 group"
        >
          <span>{ctaText}</span>
          <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon; 