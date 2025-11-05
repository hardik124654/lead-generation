
import React from 'react';
import { Lead } from '../types';

interface LeadsTableProps {
  leads: Lead[];
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
              Company Info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/3">
              Product Information
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Contact Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map((lead, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
              <td className="px-6 py-4 align-top">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.companyName}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{lead.aboutCompany}</div>
              </td>
              <td className="px-6 py-4 align-top">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{lead.productOrService}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{lead.detailedProductInfo}</div>
              </td>
              <td className="px-6 py-4 align-top">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.city}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{lead.address}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap align-top">
                 <div className="text-sm text-gray-600 dark:text-gray-300 break-all">{lead.email}</div>
                 <div className="text-sm text-gray-600 dark:text-gray-300 break-all">{lead.secondaryEmail !== 'N/A' && lead.secondaryEmail}</div>
                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lead.mobileNumber}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
