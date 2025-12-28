# Neighbour Aid - Community Support Platform

A React-based web application that connects neighbors who need help with those who can provide it, fostering stronger community bonds through mutual support.

## 🌟 Features

### Core Functionality
- **User Authentication**: Register, login, and profile management
- **Help Requests**: Create, browse, and manage help requests
- **Help Offers**: Create and browse available helpers in the community
- **Secure Messaging**: Built-in messaging system for safe communication
- **Safety Guidelines**: Comprehensive safety features and guidelines

### Key Pages
- **Home**: Welcome page with community stats and recent activity
- **About**: Detailed information about the platform and mission
- **Browse Requests**: Filter and search help requests
- **Browse Offers**: Find available helpers by skills and location
- **Create Request/Offer**: Easy-to-use forms for posting help needs or offers
- **Profile**: User dashboard with activity tracking
- **Messages**: Secure messaging between community members
- **Safety**: Comprehensive safety guidelines and reporting system

### Design Features
- **Professional Theme**: Deep blue color scheme with modern, clean design
- **Accessibility**: WCAG compliant design suitable for all ages
- **Mobile Responsive**: Fully responsive design for all devices
- **Trust-Focused**: Verification badges, ratings, and safety features

## 🎨 Design System

### Colors
- **Primary**: #1F4E79 (Deep Professional Blue)
- **Secondary**: #1ABC9C (Teal)
- **Background**: #F7F7F7 (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Accent**: #DCE6F2 (Light Blue)

### Typography
- **Headings**: Montserrat
- **Body**: Open Sans

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neighbour-aid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Header.css
│   ├── Footer.js       # Site footer
│   └── Footer.css
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── DataContext.js  # Application data management
├── pages/              # Main application pages
│   ├── Home.js         # Landing page
│   ├── About.js        # About page
│   ├── BrowseRequests.js
│   ├── BrowseOffers.js
│   ├── CreateRequest.js
│   ├── CreateOffer.js
│   ├── Profile.js      # User profile
│   ├── Login.js        # Authentication
│   ├── Register.js
│   ├── Safety.js       # Safety guidelines
│   ├── Messages.js     # Messaging system
│   ├── RequestDetail.js
│   ├── OfferDetail.js
│   └── [corresponding CSS files]
├── App.js              # Main app component with routing
├── index.js            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🔧 Technical Details

### Built With
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Styling with CSS Grid and Flexbox
- **Local Storage** - Data persistence (demo purposes)

### State Management
The application uses React Context API for state management:
- **AuthContext**: Manages user authentication and profile data
- **DataContext**: Manages requests, offers, and messages

### Data Storage
Currently uses browser localStorage for demo purposes. In a production environment, this would be replaced with:
- Backend API integration
- Database storage
- Real authentication system
- File upload capabilities

## 🛡️ Safety Features

### Privacy Protection
- General location areas only (no exact addresses)
- Secure messaging system
- Email verification required
- Optional phone verification

### Trust & Safety
- User verification badges
- Rating and review system
- Report and block functionality
- Content moderation guidelines
- Comprehensive safety guidelines

### Communication Safety
- Built-in messaging platform
- No personal information sharing in public posts
- Meeting guidelines for safe interactions

## 🎯 Future Enhancements

### Planned Features
- **Map Integration**: Visual location-based browsing
- **Real-time Notifications**: Push notifications for messages and updates
- **Advanced Matching**: AI-powered helper-request matching
- **Mobile App**: Native iOS and Android applications
- **Payment Integration**: Secure payment processing for paid services
- **Background Checks**: Integration with verification services
- **Multi-language Support**: Internationalization
- **Emergency System**: Quick emergency help requests

### Technical Improvements
- Backend API development
- Database integration
- Real-time messaging with WebSockets
- Image upload and storage
- Advanced search and filtering
- Performance optimizations
- Automated testing suite

## 🤝 Contributing

This is a demo project built according to specific requirements. For production use, consider:

1. **Backend Development**: Implement proper API and database
2. **Security Enhancements**: Add proper authentication and data validation
3. **Testing**: Implement comprehensive test coverage
4. **Performance**: Optimize for production deployment
5. **Accessibility**: Conduct thorough accessibility testing

## 📄 License

This project is created as a demonstration of a community support platform. Please ensure proper licensing and legal compliance for any production use.

## 🆘 Support

For questions about this demo project, please refer to the code comments and documentation within the source files.

---

**Built with ❤️ for stronger communities**