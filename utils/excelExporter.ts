
import { Lead } from '../types';

// Let TypeScript know that XLSX is available on the global window object from the CDN script
declare var XLSX: any;

export const exportToExcel = (leads: Lead[], subject: string): void => {
  if (!leads || leads.length === 0) {
    console.error("No data to export.");
    return;
  }

  // Sanitize the subject to create a valid filename
  const fileName = `Leads - ${subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xlsx`;

  // Define headers
  const headers = {
    companyName: 'Company Name',
    aboutCompany: 'About Company',
    productOrService: 'Product or Service',
    detailedProductInfo: 'Detailed Product Info',
    address: 'Address',
    city: 'City',
    email: 'Email',
    secondaryEmail: 'Secondary Email',
    mobileNumber: 'Mobile Number'
  };

  // Map data to have proper headers
  const dataToExport = leads.map(lead => ({
    [headers.companyName]: lead.companyName,
    [headers.aboutCompany]: lead.aboutCompany,
    [headers.productOrService]: lead.productOrService,
    [headers.detailedProductInfo]: lead.detailedProductInfo,
    [headers.address]: lead.address,
    [headers.city]: lead.city,
    [headers.email]: lead.email,
    [headers.secondaryEmail]: lead.secondaryEmail,
    [headers.mobileNumber]: lead.mobileNumber,
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  // Auto-fit columns
  const cols = Object.keys(headers).map(key => headers[key as keyof typeof headers]);
  const colWidths = cols.map(col => {
      const maxLength = Math.max(
          col.length,
          ...dataToExport.map(row => (row[col] ? String(row[col]).length : 0))
      );
      return { wch: maxLength + 2 }; // +2 for padding
  });
  worksheet['!cols'] = colWidths;


  XLSX.writeFile(workbook, fileName);
};
