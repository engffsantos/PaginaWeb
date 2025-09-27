import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow custom onClick handlers to run
    if (props.onClick) {
      props.onClick(event);
    }
    
    // Check for modifier keys to allow opening in new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    
    // Handle client-side routing for internal links
    if (href && href.startsWith('/')) {
        event.preventDefault();
        window.history.pushState({}, '', href);
        
        // Dispatch a custom event to notify the App component of the URL change
        const navEvent = new Event('pushstate');
        window.dispatchEvent(navEvent);
    }
  };

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
