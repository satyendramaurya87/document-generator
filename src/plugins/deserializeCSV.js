import { createPluginFactory } from '@platejs/core';
import Papa from 'papaparse';

// Create a custom plugin for deserializing CSV data
export const createDeserializeCSVPlugin = createPluginFactory({
  key: 'deserializeCSV',
  
  handlers: {
    onDOMBeforeInput: (editor, event) => {
      // Handle paste events with CSV data
      if (event.inputType === 'insertFromPaste') {
        return false;
      }
      return false;
    },
  },
  
  editor: {
    insertCSVTable() {
      const editor = this;
      
      // Get the CSV data from the clipboard
      navigator.clipboard.readText().then((text) => {
        if (!text) return;
        
        try {
          // Parse the CSV data
          const results = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
          });
          
          if (results.errors.length) {
            console.error('Error parsing CSV:', results.errors);
            return;
          }
          
          const { data, meta } = results;
          if (!data.length || !meta.fields.length) return;
          
          // Create table rows and cells
          const rows = [
            // Header row
            {
              type: 'tr',
              children: meta.fields.map(field => ({
                type: 'th',
                children: [{ text: field }],
              })),
            },
            // Data rows
            ...data.map(row => ({
              type: 'tr',
              children: meta.fields.map(field => ({
                type: 'td',
                children: [{ text: row[field] || '' }],
              })),
            })),
          ];
          
          // Insert the table at the current selection
          editor.insertNodes([
            {
              type: 'table',
              children: rows,
            },
          ]);
        } catch (error) {
          console.error('Error inserting CSV table:', error);
        }
      });
    },
  },
});