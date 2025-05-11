import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Avatar,
  ListItemAvatar,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Sample data: message threads with participants and messages
const initialThreads = [
  {
    id: 1,
    participants: ['Dr. Alice', 'Nurse Bob'],
    messages: [
      { id: 1, sender: 'Dr. Alice', text: 'Are the lab reports ready?', timestamp: '2025-05-06T09:15' },
      { id: 2, sender: 'Nurse Bob', text: 'Yes, I sent them to your email.', timestamp: '2025-05-06T09:18' },
    ],
  },
  {
    id: 2,
    participants: ['Reception', 'Patient John Doe'],
    messages: [
      { id: 1, sender: 'Reception', text: 'Your appointment is confirmed for tomorrow at 10 AM.', timestamp: '2025-05-05T14:00' },
      { id: 2, sender: 'John Doe', text: 'Thank you!', timestamp: '2025-05-05T14:05' },
    ],
  },
  {
    id: 3,
    participants: ['Admin', 'Finance Dept'],
    messages: [
      { id: 1, sender: 'Admin', text: 'Requesting budget approval for new equipment.', timestamp: '2025-05-04T11:30' },
      { id: 2, sender: 'Finance Dept', text: 'Approved. You will receive the funds next month.', timestamp: '2025-05-04T12:00' },
    ],
  },
];

// Utility to format timestamps
const formatTimestamp = (ts) => {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

export default function DashboardMain({ children }) {
  const theme = useTheme();



  const [threads, setThreads] = useState(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(threads[0]?.id || null);
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThread]);

  // Handle sending new message
  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedThread) return;
    const newMsg = {
      id: selectedThread.messages.length + 1,
      sender: 'You',
      text: newMessageText.trim(),
      timestamp: new Date().toISOString(),
    };
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === selectedThread.id
          ? { ...thread, messages: [...thread.messages, newMsg] }
          : thread
      )
    );
    setNewMessageText('');
  };

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, height: 'calc(100vh - 64px)', mx: 'auto', display: 'flex', flexDirection: 'column', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
        Messages
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 3 }}>
        Communicate with hospital staff, departments, and patients.
      </Typography>
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', borderRadius: 2, overflow: 'hidden' }}>
        {/* Threads List */}
        <Box sx={{ width: 320, borderRight: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
          <List dense disablePadding>
            {threads.map((thread) => (
              <React.Fragment key={thread.id}>
                <ListItemButton
                  selected={thread.id === selectedThreadId}
                  onClick={() => setSelectedThreadId(thread.id)}
                  sx={{ py: 2, px: 3 }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {thread.participants
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={thread.participants.join(', ')}
                    secondary={
                      thread.messages.length > 0 ? (
                        <>
                          <Typography variant="body2" color="textSecondary" noWrap>
                            {thread.messages[thread.messages.length - 1].text}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {formatTimestamp(thread.messages[thread.messages.length - 1].timestamp)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="textSecondary" noWrap>
                          No messages
                        </Typography>
                      )
                    }
                  />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Conversation Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" fontWeight={600}>
              {selectedThread ? selectedThread.participants.join(', ') : 'Select a conversation'}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {selectedThread && selectedThread.messages.length > 0 ? (
              selectedThread.messages.map(({ id, sender, text, timestamp }) => {
                const isOwnMessage = sender === 'You';
                return (
                  <Box
                    key={id}
                    sx={{
                      maxWidth: '75%',
                      alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
                      bgcolor: isOwnMessage ? theme.palette.primary.main : theme.palette.grey[300],
                      color: isOwnMessage ? 'white' : 'black',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.3 }}>
                      {sender}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {text}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'right', opacity: 0.7 }}>
                      {new Date(timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                );
              })
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mx: 'auto' }}>
                No messages to display.
              </Typography>
            )}
            <div ref={messagesEndRef => { if (messagesEndRef) messagesEndRef.scrollIntoView({ behavior: 'smooth' }) }} />
          </Box>
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper, display: 'flex', gap: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              fullWidth
              size="small"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              multiline
              maxRows={4}
            />
            <IconButton
              color="primary"
              disabled={!newMessageText.trim()}
              onClick={handleSendMessage}
              aria-label="send message"
              size="large"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
     </Layout>
  );


}
