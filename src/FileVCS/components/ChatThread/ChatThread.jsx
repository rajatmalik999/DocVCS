import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ChatThread.module.css';
import supabase from '../../../config/supabase';

// Debug the supabase client
console.log('Supabase client:', {
  realtime: supabase.realtime?.opts,
  channels: supabase.realtime?.channels,
  connectionState: supabase.realtime?.connectionState
});

const ChatThread = ({ userData, selectedFile }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const channelRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Debug logging for props and realtime state
  useEffect(() => {
    console.log('ChatThread mount/update:', {
      'selectedFile._id': selectedFile?._id,
      'userData.id': userData?.id,
      'realtime state': supabase.realtime?.connectionState,
      'channel count': supabase.realtime?.channels?.length || 0
    });
  }, [selectedFile?._id, userData?.id]);

  const fetchMessages = useCallback(async () => {
    if (!selectedFile?._id) return;

    try {
      console.log('Fetching messages for document:', selectedFile._id);
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .eq('document_id', selectedFile._id)
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error fetching messages:', fetchError);
        setError('Failed to load messages');
        return;
      }

      console.log('Messages fetched successfully:', {
        count: data?.length || 0,
        firstMessage: data?.[0],
        lastMessage: data?.[data.length - 1]
      });
      
      setMessages(data || []);
      setError(null);
    } catch (err) {
      console.error('Error in fetchMessages:', err);
      setError('Failed to load messages');
    }
  }, [selectedFile?._id]);

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedFile?._id) {
      console.log('No file selected, skipping subscription');
      return;
    }

    const setupSubscription = async () => {
      try {
        // Clean up existing subscription
        if (channelRef.current) {
          console.log('Removing existing channel');
          await supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }

        console.log('Setting up new subscription...');

        // Create a basic channel first
        const channel = supabase.channel('any');

        // Add the subscription
        channel
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'messages'
            },
            (payload) => {
              console.log('Real-time event received:', {
                eventType: payload.eventType,
                payload,
                currentDocId: selectedFile._id,
                payloadDocId: payload.new?.document_id,
                matches: payload.new?.document_id === selectedFile._id
              });

              // Handle the event if it's for our document
              if (payload.new?.document_id === selectedFile._id) {
                if (payload.eventType === 'INSERT') {
                  console.log('Adding new message to state');
                  setMessages(prevMessages => {
                    // Check if message already exists
                    if (prevMessages.some(msg => msg.id === payload.new.id)) {
                      console.log('Message already exists, skipping');
                      return prevMessages;
                    }
                    return [...prevMessages, payload.new];
                  });
                }
              } else {
                console.log('Message is for different document, ignoring');
              }
            }
          );

        // Subscribe and handle status
        const { error } = await channel.subscribe((status) => {
          console.log('Subscription status:', status);
          
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to messages');
            setIsConnected(true);
            setError(null);
            fetchMessages();
          } else if (status === 'CHANNEL_ERROR') {
            console.error('Subscription error occurred');
            setIsConnected(false);
            setError('Connection lost. Please refresh the page.');
          }
        });

        if (error) {
          console.error('Error subscribing to channel:', error);
          setError('Failed to connect to chat');
          setIsConnected(false);
          return;
        }

        // Store the channel reference
        channelRef.current = channel;

        // Log channel state
        console.log('Channel state:', {
          status: channel.state,
          presenceState: channel.presenceState,
          topic: channel.topic
        });

      } catch (err) {
        console.error('Error setting up subscription:', err);
        setError('Failed to set up real-time updates');
        setIsConnected(false);
      }
    };

    setupSubscription();

    return () => {
      console.log('Cleaning up subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [selectedFile?._id, fetchMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedFile?._id || !userData?.id) {
      console.log('Send validation failed:', {
        hasInput: !!input.trim(),
        hasFileId: !!selectedFile?._id,
        hasUserId: !!userData?.id
      });
      return;
    }

    try {
      const senderUUID = convertToUUID(userData.id);
      
      if (!senderUUID) {
        console.error('Failed to generate valid UUID for sender');
        setError('Invalid sender ID');
        return;
      }

      const messageText = input.trim();
      setInput('');

      const newMessage = {
        document_id: selectedFile._id,
        sender_id: senderUUID,
        message: messageText,
        created_at: new Date().toISOString()
      };

      console.log('Sending message:', newMessage);

      const { data, error: sendError } = await supabase
        .from('messages')
        .insert([newMessage])
        .select()
        .single();

      if (sendError) {
        console.error('Error sending message:', sendError);
        setError('Failed to send message');
        return;
      }

      console.log('Message sent successfully:', data);
      
      // Optimistically add message to state
      setMessages(prevMessages => [...prevMessages, data]);
      setError(null);

      // Log channel state after sending
      if (channelRef.current) {
        console.log('Channel state after send:', {
          status: channelRef.current.state,
          topic: channelRef.current.topic
        });
      }

    } catch (err) {
      console.error('Error in handleSend:', err);
      setError('Failed to send message');
    }
  };

  // Helper function to convert MongoDB ID to UUID
  const convertToUUID = (id) => {
    if (!id || typeof id !== 'string') return null;
    
    // If it's already a valid UUID, return it
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) return id;

    // For MongoDB 24-character IDs
    if (id.length === 24) {
      // Add missing characters to make it a valid UUID (32 chars + 4 hyphens)
      const paddedId = id + '0'.repeat(32 - id.length);
      return `${paddedId.slice(0, 8)}-${paddedId.slice(8, 12)}-${paddedId.slice(12, 16)}-${paddedId.slice(16, 20)}-${paddedId.slice(20, 32)}`;
    }

    return id;
  };

  return (
    <div className={styles.chatThread}>
      <div className={styles.messages}>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        {!isConnected && (
          <div className={styles.connectionStatus}>
            Connecting to chat...
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={styles.message}>
            <span className={styles.author}>
              {msg.sender_id === convertToUUID(userData?.id) ? 'You' : 'Other'}:
            </span>
            <span className={styles.text}>{msg.message}</span>
            <span className={styles.timestamp}>
              {new Date(msg.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.inputRow} onSubmit={handleSend}>
        <input
          className={styles.input}
          type="text"
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!isConnected}
        />
        <button 
          className={styles.sendBtn} 
          type="submit"
          disabled={!isConnected || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatThread;
