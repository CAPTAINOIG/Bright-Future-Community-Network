export const exportCsv = (filename, data) => {
  try {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return false;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that contain commas by wrapping in quotes
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
};

export const inputClass = (field) =>
    `w-full py-3 px-4 border ${errors[field] ? 'border-red-500' : 'border-gray-200'
    } rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;
