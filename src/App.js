import React, { useState, useMemo } from 'react';
import { createPlateUI, createPlugins, Plate, PlateContent } from '@platejs/react';
import { createReactPlugin } from '@platejs/react';
import { createHistoryPlugin } from '@platejs/slate-react';
import { createParagraphPlugin } from '@platejs/slate-react';
import { createBoldPlugin } from '@platejs/slate-react';
import { createItalicPlugin } from '@platejs/slate-react';
import { createUnderlinePlugin } from '@platejs/slate-react';
import { createHeadingPlugin } from '@platejs/slate-react';
import { createBlockquotePlugin } from '@platejs/slate-react';
import { createCodeBlockPlugin } from '@platejs/slate-react';
import { createTablePlugin } from '@platejs/slate-react';
import { createImagePlugin } from '@platejs/slate-react';
import { createLinkPlugin } from '@platejs/slate-react';
import { createListPlugin } from '@platejs/slate-react';
import { createAlignPlugin } from '@platejs/slate-react';
import { createIndentPlugin } from '@platejs/slate-react';
import { createDeserializeCSVPlugin } from './plugins/deserializeCSV';
import { Toolbar } from './components/Toolbar';
import { CSVImporter } from './components/CSVImporter';
import { Container, Typography, Box, Paper } from '@mui/material';
import './App.css';

const App = () => {
  const [csvData, setCsvData] = useState(null);
  
  // Create plugins array
  const plugins = useMemo(
    () =>
      createPlugins([
        createReactPlugin(),
        createHistoryPlugin(),
        createParagraphPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createHeadingPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createTablePlugin(),
        createImagePlugin(),
        createLinkPlugin(),
        createListPlugin(),
        createAlignPlugin(),
        createIndentPlugin(),
        createDeserializeCSVPlugin(),
      ]),
    []
  );

  // Create plate UI components
  const components = useMemo(() => createPlateUI(), []);

  // Initial editor value
  const initialValue = [
    {
      type: 'p',
      children: [{ text: 'Start typing your document here...' }],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Document Generator
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <CSVImporter setCsvData={setCsvData} />
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Plate
            plugins={plugins}
            components={components}
            initialValue={initialValue}
          >
            <Toolbar />
            <PlateContent className="editor-container" />
          </Plate>
        </Paper>

        {csvData && (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Imported CSV Data
            </Typography>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {csvData.meta.fields.map((field, index) => (
                      <th key={index}>{field}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {csvData.meta.fields.map((field, colIndex) => (
                        <td key={colIndex}>{row[field]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default App;