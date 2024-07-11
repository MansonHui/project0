export const updatePageTitle = (location: Location, setPageTitle: (title: string) => void) => {
    setPageTitle(`My App - ${location.pathname}`)
    
    let pageTitle;
    switch (location.pathname) {
      case '/':
        pageTitle = 'Login Page';
        break;
      case '/HomePage':
        pageTitle = 'Home Page';
        break;
      case '/Message':
        pageTitle = 'Message Page';
        break;
      case '/Message':
        pageTitle = 'Message Page';
        break;
      
        
      
      default:
        pageTitle = 'My App';
    }
    document.title = pageTitle;
  };