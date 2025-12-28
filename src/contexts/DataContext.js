import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock help requests
    const mockRequests = [
      {
        id: '1',
        title: 'Grocery Shopping Help',
        description: 'Need someone to help with weekly grocery shopping. I have mobility issues and would appreciate assistance.',
        category: 'Shopping',
        urgency: 'Medium',
        location: 'Downtown Area',
        status: 'Open',
        createdBy: 'elderly-neighbor',
        createdAt: '2024-12-18',
        estimatedTime: '2-3 hours',
        preferredTime: 'Weekday mornings'
      },
      {
        id: '2',
        title: 'Dog Walking Service',
        description: 'Looking for someone to walk my golden retriever twice a week. He\'s friendly and well-behaved.',
        category: 'Pet Care',
        urgency: 'Low',
        location: 'Riverside District',
        status: 'In Progress',
        createdBy: 'busy-parent',
        createdAt: '2024-12-17',
        estimatedTime: '1 hour per walk',
        preferredTime: 'Evenings'
      },
      {
        id: '3',
        title: 'Computer Setup Help',
        description: 'Need help setting up a new computer and installing basic software. Not very tech-savvy.',
        category: 'Technology',
        urgency: 'High',
        location: 'Oak Street',
        status: 'Open',
        createdBy: 'senior-citizen',
        createdAt: '2024-12-19',
        estimatedTime: '2-4 hours',
        preferredTime: 'Flexible'
      }
    ];

    // Mock help offers
    const mockOffers = [
      {
        id: '1',
        title: 'Handyman Services',
        description: 'Experienced in basic home repairs, plumbing, and electrical work. Happy to help neighbors with small projects.',
        category: 'Home Repair',
        skills: ['Plumbing', 'Electrical', 'Carpentry'],
        availability: 'Weekends',
        location: 'Downtown Area',
        radius: '5 miles',
        createdBy: 'handy-helper',
        createdAt: '2024-12-15',
        rating: 4.9,
        completedJobs: 15
      },
      {
        id: '2',
        title: 'Tutoring Services',
        description: 'Math and science tutor available for middle and high school students. Patient and experienced.',
        category: 'Education',
        skills: ['Mathematics', 'Physics', 'Chemistry'],
        availability: 'Weekday evenings',
        location: 'University District',
        radius: '3 miles',
        createdBy: 'student-tutor',
        createdAt: '2024-12-16',
        rating: 4.7,
        completedJobs: 8
      }
    ];

    setRequests(mockRequests);
    setOffers(mockOffers);
  };

  const addRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(),
      ...requestData,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'current-user'
    };
    setRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const addOffer = (offerData) => {
    const newOffer = {
      id: Date.now().toString(),
      ...offerData,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'current-user',
      rating: 0,
      completedJobs: 0
    };
    setOffers(prev => [newOffer, ...prev]);
    return newOffer;
  };

  const updateRequestStatus = (requestId, status) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  const sendMessage = (recipientId, content, requestId = null) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      recipientId,
      content,
      requestId,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    return newMessage;
  };

  const markMessageAsRead = (messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const value = {
    requests,
    offers,
    messages,
    addRequest,
    addOffer,
    updateRequestStatus,
    sendMessage,
    markMessageAsRead
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};