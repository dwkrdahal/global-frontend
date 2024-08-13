import { useEffect } from 'react';

const SidebarToggle = () => {

  useEffect(() => {
    // This effect runs once when the component mounts

    const sidebarToggle = document.querySelector('#sidebarToggle');
    
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //   document.body.classList.toggle('sb-sidenav-toggled');
      // }

      const handleToggle = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      };

      sidebarToggle.addEventListener('click', handleToggle);

      // Cleanup the event listener on component unmount
      return () => {
        sidebarToggle.removeEventListener('click', handleToggle);
      };
    }
  }, []);

  return null;
};

export default SidebarToggle;
