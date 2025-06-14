import React from 'react';
import { useEventPlateId, usePlateEditorState } from '@platejs/react';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Title,
  FormatQuote,
  Code,
  Image,
  Link,
  TableChart,
  Undo,
  Redo
} from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Tooltip } from '@mui/material';

export const Toolbar = () => {
  const editor = usePlateEditorState(useEventPlateId());
  
  const toggleMark = (format) => {
    editor.toggleMark(format);
  };

  const toggleBlock = (format) => {
    editor.toggleBlock(format);
  };

  const isMarkActive = (format) => {
    return editor.isMarkActive(format);
  };

  const isBlockActive = (format) => {
    return editor.isBlockActive(format);
  };

  const insertTable = () => {
    editor.insertTable({
      rows: 3,
      columns: 3,
    });
  };

  const insertImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.insertImage({ url });
    }
  };

  const insertLink = () => {
    const url = window.prompt('Enter link URL:');
    if (url) {
      editor.insertLink({ url });
    }
  };

  return (
    <Box className="toolbar" sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
      <Tooltip title="Undo">
        <IconButton onClick={() => editor.undo()}>
          <Undo />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Redo">
        <IconButton onClick={() => editor.redo()}>
          <Redo />
        </IconButton>
      </Tooltip>
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      <Tooltip title="Bold">
        <IconButton 
          onClick={() => toggleMark('bold')} 
          color={isMarkActive('bold') ? 'primary' : 'default'}
        >
          <FormatBold />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Italic">
        <IconButton 
          onClick={() => toggleMark('italic')} 
          color={isMarkActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalic />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Underline">
        <IconButton 
          onClick={() => toggleMark('underline')} 
          color={isMarkActive('underline') ? 'primary' : 'default'}
        >
          <FormatUnderlined />
        </IconButton>
      </Tooltip>
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      <Tooltip title="Heading">
        <IconButton 
          onClick={() => toggleBlock('h1')} 
          color={isBlockActive('h1') ? 'primary' : 'default'}
        >
          <Title />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Quote">
        <IconButton 
          onClick={() => toggleBlock('blockquote')} 
          color={isBlockActive('blockquote') ? 'primary' : 'default'}
        >
          <FormatQuote />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Code Block">
        <IconButton 
          onClick={() => toggleBlock('code_block')} 
          color={isBlockActive('code_block') ? 'primary' : 'default'}
        >
          <Code />
        </IconButton>
      </Tooltip>
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      <Tooltip title="Bulleted List">
        <IconButton 
          onClick={() => toggleBlock('ul')} 
          color={isBlockActive('ul') ? 'primary' : 'default'}
        >
          <FormatListBulleted />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Numbered List">
        <IconButton 
          onClick={() => toggleBlock('ol')} 
          color={isBlockActive('ol') ? 'primary' : 'default'}
        >
          <FormatListNumbered />
        </IconButton>
      </Tooltip>
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      <Tooltip title="Align Left">
        <IconButton onClick={() => editor.align('left')}>
          <FormatAlignLeft />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Align Center">
        <IconButton onClick={() => editor.align('center')}>
          <FormatAlignCenter />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Align Right">
        <IconButton onClick={() => editor.align('right')}>
          <FormatAlignRight />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Justify">
        <IconButton onClick={() => editor.align('justify')}>
          <FormatAlignJustify />
        </IconButton>
      </Tooltip>
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      
      <Tooltip title="Insert Table">
        <IconButton onClick={insertTable}>
          <TableChart />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Insert Image">
        <IconButton onClick={insertImage}>
          <Image />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Insert Link">
        <IconButton onClick={insertLink}>
          <Link />
        </IconButton>
      </Tooltip>
    </Box>
  );
};